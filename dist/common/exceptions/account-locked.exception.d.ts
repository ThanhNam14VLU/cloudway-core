import { HttpException } from '@nestjs/common';
export declare class AccountLockedException extends HttpException {
    constructor(message?: string);
}
