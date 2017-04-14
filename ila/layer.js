export class Layer {
    constructor(x) {
        this.x = x;
    }

    doIt(d) {
        return d + this.x;
    }
}
