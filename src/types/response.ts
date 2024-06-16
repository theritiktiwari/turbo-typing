export class Response {
    constructor(public message: string, public value?: any) { }

    error() {
        return {
            success: false,
            message: this.message
        };
    }

    success() {
        return {
            success: true,
            message: this.message
        };
    }

    data() {
        return {
            success: true,
            message: this.message,
            value: this.value
        };
    }
}