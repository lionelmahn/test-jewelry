import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import userController from "./controller/user.controller.js";
import authUser from "./auth/checkAuth.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import categoryRoute from "./routes/category.route.js"
import subcategoryRoute from "./routes/subcategory.route.js"
import brandRoute from "./routes/brand.route.js"
import reviewRoute from "./routes/review.route.js"
import productRoute from "./routes/product.route.js"
import cartRoute from "./routes/cart.route.js"
import chatRoute from "./routes/conversation.route.js"
import compareRoute from "./routes/compare.route.js"
import materialRoute from "./routes/material.route.js"
import gemstoneRoute from "./routes/gemstone.route.js"
import itemRoute from "./routes/item.route.js"
import couponRoute from "./routes/coupon.route.js"
import orderRoute from "./routes/order.route.js"
import paymentRoute from "./routes/payment.route.js"
import provincesRoute from "./routes/provinces.route.js"
import wishRoute from "./routes/wish.route.js"
import customRoute from "./routes/custom.route.js"
import fileRoute from "./routes/file.route.js"
import helmet from "helmet";
import chatBotRoute from "./routes/chatBox.route.js"
import paymentController from "./controller/payment.controller.js"
import { authApiLimiter, globalLimiter } from "./libs/rateLimit.js";
import conversationModel from "./models/conversation.model.js";
const app = express()
const port = 3000
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
// chạy ratelimit riêng mới đến ratelimit chạy chung
// app.use('/api/docs', swaggerUiServe, swaggerUiSetup(swaggerSpec))
app.use("/api", globalLimiter);
app.use("/api", authRoute);
app.use("/api/chat", authUser, chatRoute)
app.use("/api/users", authApiLimiter, authUser, userRoute)
app.post("/logout", authApiLimiter, authUser, userController.logout);
app.use("/api/category", authApiLimiter, authUser, categoryRoute)
app.use("/api/subcategory", authApiLimiter, authUser, subcategoryRoute)
app.use("/api/brand", authApiLimiter, authUser, brandRoute)
app.use("/api/review", authUser, reviewRoute)
app.use("/api/product", authUser, productRoute)
app.use('/api/chat-bot', authUser, chatBotRoute)
app.use('/api/cart', authUser, cartRoute)
app.use("/api/compare", authUser, compareRoute)
app.use("/api/material", authUser, materialRoute)
app.use("/api/gemstone", authUser, gemstoneRoute)
app.use("/api/items", authUser, itemRoute)
app.use("/api/coupon", authUser, couponRoute)
app.use("/api/order", authUser, orderRoute)
app.use("/api/payment", authUser, paymentRoute)
app.use("/api/wish", authUser, wishRoute)
app.use("/api/custom", authUser, customRoute)
app.post("/api/payment/success", paymentController.paymentCallback)
app.post("/api/payment/webhook", paymentController.webhook)
app.use("/api/provinces", provincesRoute)
app.use("/api/file", fileRoute)
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
})
let customer = {}
io.on("connection", (socket) => {
  socket.on("customer_open_chat", (userId) => {
    console.log(userId, "bkfkbgbk")
    const roomId = userId;
    socket.join(roomId);
  });
  socket.on("join_admin", () => {
    socket.join("admins");
    console.log("ADMIN JOIN:", socket.id);
  });
  socket.on("admin_join_room", async (roomId) => {
    console.log(roomId, ",nmnnhmn")
    socket.join(roomId);
    await conversationModel.updateOne(
      { roomId },
      {
        $set: { "messages.$[m].isReadByAdmin": true }
      },
      {
        arrayFilters: [{ "m.from": "customer", "m.isReadByAdmin": false }]
      }
    );
  });
  socket.on("customer_message", async ({ userId, roomId, message }) => {
    await conversationModel.findOneAndUpdate(
      { roomId },
      {
        $set: { userId },
        $push: {
          messages: { from: "customer", message, isReadByAdmin: false }
        }
      },
      { upsert: true }
    );

    io.to(roomId).emit("message", {
      roomId,
      from: "customer",
      message
    });
    io.to("admins").emit("admin_message_notify", {
      roomId,
      type: "new_message"
    });
  });
  socket.on("admin_message", async ({ roomId, message }) => {
    console.log(roomId, message, "fmkmfkmfb")
    await conversationModel.findOneAndUpdate(
      { roomId },
      {
        $push: {
          messages: { from: "admin", message, isReadByAdmin: true }
        }
      }
    );
    io.to(roomId).emit("message", {
      roomId,
      from: "admin",
      message
    });
  });
  socket.on("disconnect", () => {
    Object.keys(customer).forEach(roomId => {
      if (customer[roomId].socketId === socket.id) {
        delete customer[roomId];
      }
    });
    io.emit("customers_list", Object.values(customer));
  })
})
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
