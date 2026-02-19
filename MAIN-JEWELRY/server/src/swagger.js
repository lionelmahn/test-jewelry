import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce Jubilee",
            version: "1.0.0",
            description: "Swagger for Jubilee Ecommerce API",
        },
    },
    apis: ["./src/routes/*.route.js"],
};
export const swaggerSpec = swaggerJsdoc(options);
export const swaggerUiServe = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup;