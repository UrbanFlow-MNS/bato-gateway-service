import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { RefreshTokenDto } from "src/domain/dtos/auth/refresh-token.dto";
import { UserRegisterDto } from "src/domain/dtos/auth/user-register.dto";
import { UserSignInCredentials } from "src/domain/dtos/auth/user-signin-credentials.dto";

@Injectable()
export class AuthService {

    constructor(
        @Inject('AUTH_SERVICE') private authClient: ClientProxy
    ) { }

    async register(body: UserRegisterDto) {
        try {
            const response = await firstValueFrom(
                this.authClient.send('register', body)
            )
            return response
        } catch (error) {
            throw error
        }
    }

    async login(body: UserSignInCredentials) {
        try {
            const response = await firstValueFrom(
                this.authClient.send('login', body)
            )
            return response
        } catch (error) {
            throw error
        }
    }

    async refreshToken(body: RefreshTokenDto) {
        try {
            const response = await firstValueFrom(
                this.authClient.send('refresh-token', body)
            )
            return response
        } catch (error) {
            throw error
        }
    }

}