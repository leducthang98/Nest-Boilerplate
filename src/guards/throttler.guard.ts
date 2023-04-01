import { ThrottlerGuard } from '@nestjs/throttler';
import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { BaseException } from 'src/filters/exception.filter';
import { ERROR } from 'src/constants/exception.constant';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {

    protected getTracker(req: Record<string, any>): string {
        return req.ips.length ? req.ips[0] : req.ip;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const canActivate = await super.canActivate(context)
            return canActivate
        } catch (error) {
            throw new BaseException(ERROR.TOO_MANY_REQUESTS, HttpStatus.TOO_MANY_REQUESTS)
        }
    }
}