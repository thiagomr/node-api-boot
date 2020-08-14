import { logger } from '../config/services';

export class MissingParamError extends Error {
    constructor(paramName) {
        super(`missing param: ${paramName}`);
        this.name = 'MissingParamError';
    }
}

export class InvalidParamError extends Error {
    constructor(paramName) {
        super(`invalid param: ${paramName}`);
        this.name = 'InvalidParamError';
    }
}

export const handleError = (error) => {
    if (error instanceof MissingParamError || error instanceof InvalidParamError) {
        return {
            status: 400,
            error: error.message
        };
    }

    logger.error(error);

    return {
        status: 500,
        error: 'server error'
    };
};
