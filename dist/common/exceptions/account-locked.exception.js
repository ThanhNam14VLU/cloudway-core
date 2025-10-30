"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountLockedException = void 0;
const common_1 = require("@nestjs/common");
class AccountLockedException extends common_1.HttpException {
    constructor(message = 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.') {
        super({
            statusCode: common_1.HttpStatus.FORBIDDEN,
            message,
            errorCode: 'ACCOUNT_LOCKED',
        }, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.AccountLockedException = AccountLockedException;
//# sourceMappingURL=account-locked.exception.js.map