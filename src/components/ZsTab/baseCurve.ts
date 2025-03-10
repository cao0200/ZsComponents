function baseCurve(x: number): number {
    if (x < 0) return 0;
    if (x > 1) return 0;
    return Math.sin(x * Math.PI);
}

export function createCurve(totalXDis: number, topX: number, minY: number, maxY: number) {
    return function curve(x: number) {
        const beginX = topX - totalXDis / 2;
        const endX = topX + totalXDis / 2;
        if (x < beginX) return minY;
        if (x > endX) return minY;
        const yDis = maxY - minY;
        return baseCurve((x - beginX) / totalXDis) * yDis + minY;
    }
}