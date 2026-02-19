const arr = [
    ['name', 'kiem manh'],
    ['age', 21]
]
const j = arr.reduce((item, ele) => {
    item[ele[0]] = ele[1]
    return item
}, {})
// hoac
const k = Object.fromEntries(arr);
console.log(Object.fromEntries((Object.entries(k))))
console.log(k)
console.log(j)
let p = {};
