import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { COMMON_CONSTANT } from 'src/constants/common.constant';
import { Role } from 'src/constants/role.constant';
import { ROLES_KEY } from 'src/decorators/auth.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const decoded = context.switchToHttp().getRequest()[
      COMMON_CONSTANT.JWT_DECODED_REQUEST_PARAM
    ];

    return requiredRoles.includes(decoded.role);
  }
}
