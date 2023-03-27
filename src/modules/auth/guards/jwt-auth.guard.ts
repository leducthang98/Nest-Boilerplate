import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const superResult = await super.canActivate(context);

        if (!superResult) {
          return false;
        }

        return true
      }
}
