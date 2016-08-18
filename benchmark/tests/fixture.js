
export function createRectangle(x = 10, y = 20) {
    return {
        x,
        y,
        area() {
            return this.x * this.y;
        },
        aspectRatio() {
            return this.x / this.y;
        }
    }
    ;
}
