const calculateFibonacci = (n: number): number => {
    if (n === 0 || n === 1) {
        return n
    }
    return calculateFibonacci(n - 1) + calculateFibonacci(n - 2)
}

export default calculateFibonacci
