export class CustomError extends Error {
    constructor(message: string, public title: string = null) {
        super(message);
    }
}
