export function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurrency; //each file only can have one default export