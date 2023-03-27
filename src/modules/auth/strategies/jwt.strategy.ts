import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { JwtPayload } from '../dto/jwt-payload.dto';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        apiConfigService: ApiConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: apiConfigService.jwtConfig().secret,
        });
    }

    async validate(payload: JwtPayload) {
        return { userId: payload.userId, role: payload.role };
    }
}