
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

export class Context {
    constructor() {
        this.disable();
    }
    enable() {
        this.state = true;
    }
    disable() {
        this.state = false;
    }
    enabled() {
        return this.state;
    }
}

export class Adaptee {
    call() {
        return -1;
    }
}