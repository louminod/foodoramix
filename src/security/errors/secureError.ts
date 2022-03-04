export class UnauthorizedError extends Error {}

export class UnLoggedError extends UnauthorizedError {
    constructor() {
        super('You are not logged in')
    }
}