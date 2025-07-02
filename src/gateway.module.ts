import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './features/auth/auth.controller';
import { AuthService } from './features/auth/auth.service';
import { UploadController } from './features/upload/upload.controller';
import { UploadService } from './features/upload/upload.service';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ],
          queue: 'auth_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'UPLOAD_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ],
          queue: 'upload_queue',
          queueOptions: { durable: false },
        },
      }
    ]),
  ],
  controllers: [GatewayController, AuthController, UploadController],
  providers: [GatewayService, AuthService, UploadService],
})
export class GatewayModule { }
