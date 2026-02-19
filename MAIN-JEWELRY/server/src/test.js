// // // // function getPublicId(url) {
// // // //     const parts = url.split('/');
// // // //     console.log(parts)
// // // //     const uploadIndex = parts.indexOf('upload');
// // // //     console.log(uploadIndex)
// // // //     if (uploadIndex === -1) {
// // // //         throw new Error('Invalid Cloudinary URL');
// // // //     }

// // // //     const pathParts = parts.slice(uploadIndex + 1);
// // // //     console.log(pathParts)
// // // //     console.log(pathParts[0].startsWith('v'))
// // // //     const pathWithoutVersion = pathParts[0].startsWith('v') ? pathParts.slice(1) : pathParts;
// // // //     console.log(pathWithoutVersion)
// // // //     const publicIdWithExt = pathWithoutVersion.join('/');
// // // //     console.log(publicIdWithExt)
// // // //     const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
// // // //     console.log(publicId)

// // // //     return publicId;
// // // // }
// // // // getPublicId("https://res.cloudinary.com/dp2b7r6wv/image/upload/v1762074808/hcaoc4i6rrdrl7guk8if.png");
// // // // const p = [0, 1];
// // // // console.log(p.slice(1))
// // // // // const l = [
// // // // //     { url: "https://res.cloudinary.com/demo/image/upload/v1/products/a.jpg", isMain: true },
// // // // //     { url: "https://res.cloudinary.com/demo/image/upload/v1/products/b.jpg", isMain: false },
// // // // //     { url: "https://res.cloudinary.com/demo/image/upload/v1/products/c.jpg", isMain: false }
// // // // // ]
// // // // // const k = [
// // // // //     { url: "https://res.cloudinary.com/demo/image/upload/v1/products/a.jpg", isMain: true },
// // // // //     { url: "https://res.cloudinary.com/demo/image/upload/v1/products/c.jpg", isMain: false },
// // // // //     { url: "https://res.cloudinary.com/demo/image/upload/v1/products/d.jpg", isMain: false }
// // // // // ];
// // // // // const u = k.filter((item) => item.url !== "https://res.cloudinary.com/demo/image/upload/v1/products/a.jpg")
// // // // // console.log(u)
// // // // // const o = [...l, ...k];
// // // // // const j = [];
// // // // // o.forEach((item) => {
// // // // //     if (!j.some(i => i.url === item.url)) {
// // // // //         j.push(item);
// // // // //     }
// // // // // });
// // // // // console.log(j);
// // // // // console.log(o)
// // // const product = [

// // //     { url: 'https://res.cloudinary.com/dp2b7r6wv/image/upload/v1763822901/products/eao9nactmhldogmzwdox.jpg', isMain: true },

// // //     { url: 'https://res.cloudinary.com/dp2b7r6wv/image/upload/v1763822901/products/djfnxksowlo1kcyaep9s.png', isMain: false }
// // // ]
// // // const images = [

// // //     { url: 'https://res.cloudinary.com/dp2b7r6wv/image/upload/v1763822901/products/eao9nactmhldogmzwdox.jpg', isMain: false },

// // //     { url: 'https://res.cloudinary.com/dp2b7r6wv/image/upload/v1763822901/products/djfnxksowlo1kcyaep9s.png', isMain: true },
// // //     { url: 'https://res.cloudinary.com/dp2b7r6wv/image/upload/v1763822901/products/djfnxksowlo1kcyaep9s.png', isMain: true }
// // // ]
// // // const mergedImg = [...images, ...product].filter(
// // //     (v, i, arr) => arr.findIndex(t => t.url === v.url) === i
// // // );
// // // console.log(">>> mergedImg", mergedImg)
// // // console.log(typeof (1 * 9))
// // // const l = [
// // //     {
// // //         color: "k",
// // //         options: [
// // //             {
// // //                 sku: "p",
// // //                 k: 0
// // //             },
// // //             {
// // //                 sku: "o",
// // //                 k: 2
// // //             }
// // //         ]
// // //     },
// // //     {
// // //         color: "h",
// // //         options: [
// // //             {
// // //                 sku: "t",
// // //                 k: 0
// // //             },
// // //             {
// // //                 sku: "d",
// // //                 k: 2
// // //             }
// // //         ]
// // //     }
// // // ]
// // // let a = [];
// // // l.forEach((item) => {
// // //     const option = item.options.find(o => o.sku === "p");
// // //     if (option) {
// // //         a.push({
// // //             color: item.color,
// // //             options: option
// // //         });
// // //     }
// // // });
// // // console.log(a, "ppppppp")
// // // const product = l.map((item) => ({
// // //     color: item.color,
// // //     options: item.options.find((s) => s.sku === "p")
// // // }))
// // // console.log(">>> product", product)
// // const l = {}
// // const a = {
// //     roomId: "room2",
// //     from: "customer",
// //     message: "Cho mình hỏi giá sản phẩm"
// // }
// // // const y = l[a.roomId] || {
// // //     roomId: a.roomId,
// // //     messages: []
// // // }
// // const y = a["roomId"]
// // console.log(y)
// const l = [12, 345, 2, 6, 7986, 3, 45, 2345]
// let u = 0;
// for (let i = 0; i < l.length; i++) {
//     if (l[i].toString().length % 2 === 0) {
//         u++;
//     }
// }
// console.log(u)
// let h = 12;
// let e = 0
// while (h % 10 !== 0) {
//     e++;
//     h = Math.floor(h / 10);
//     console.log(h)
// }
// console.log(e)
// function removeDuplicates(nums) {
//     let a = []
//     for (let i = 0; i < nums.length; i++) {
//         if (!a.includes(nums[i])) {
//             a.push(nums[i]);
//         }
//     }
//     return a.length
// };
// console.log(removeElement([3, 2, 2, 3], 3))
function removeDuplicates(nums) {
    let count = 1;
    let b = []
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] === nums[j]) {
                count++;
            }
        }
        if (count >= 1 && count <= 3) {
            b.push(nums[i]);
        }
        count = 1;
    }
    return b.length
};
console.log(removeDuplicates())