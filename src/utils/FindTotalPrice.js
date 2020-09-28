export function FindTotalPrice(products) {
    return products.reduce((previous, current) => previous + current.currentPrice, 0);
}