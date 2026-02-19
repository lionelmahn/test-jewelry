export function snapCarat(carat) {
    const steps = [0.3, 0.5, 0.7, 1, 1.5, 2]
    return steps.reverse().find(s => carat >= s) || 0.3
}

export function baseGramBySize(size) {
    if (size <= 6) return 3.5
    if (size <= 8) return 3.8
    if (size <= 10) return 4.2
    return 4.6
}