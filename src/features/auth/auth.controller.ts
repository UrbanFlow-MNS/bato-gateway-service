import { Body, Controller, Post } from "@nestjs/common";
import { UserRegisterDto } from "src/domain/dtos/auth/user-register.dto";
import { AuthService } from "./auth.service";
import { UserSignInCredentials } from "src/domain/dtos/auth/user-signin-credentials.dto";
import { RefreshTokenDto } from "src/domain/dtos/auth/refresh-token.dto";

@Controller('auth/')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body: UserRegisterDto) {
        return await this.authService.register(body)
    }

    @Post('login')
    async login(@Body() body: UserSignInCredentials) {
        return await this.authService.login(body)
    }

    @Post('refresh-token')
    async refreshToken(@Body() body: RefreshTokenDto) {
        return await this.authService.refreshToken(body)
    }

}