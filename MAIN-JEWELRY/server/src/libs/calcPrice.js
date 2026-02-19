export const calcPrice = (option, discount = 0) => {
    if (discount !== 0) {
        if (option.type === "CARAT") return option.value * 2500000 - option.value * 2500000 * discount / 100;
        if (option.type === "GRAM") {
            const pricePerGram = {
                "24K": 2000000,
                "18K": 1500000,
                "14K": 1200000,
                "925": 40000
            };
            return option.value * pricePerGram[option.purity] - option.value * pricePerGram[option.purity] * discount / 100;
        }
        if (option.type === "MM") return option.value * 10000 - option.value * 10000 * discount / 100;
    } else {
        if (option.type === "CARAT") return option.value * 2500000;
        if (option.type === "GRAM") {
            const pricePerGram = {
                "24K": 2000000,
                "18K": 1500000,
                "14K": 1200000,
                "925": 40000
            };
            return option.value * pricePerGram[option.purity];
        }
        if (option.type === "MM") return option.value * 10000;
    }
    return option.price;
}