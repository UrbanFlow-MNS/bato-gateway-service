import { Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { Response } from 'express';
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('upload/')
export class UploadController {

    constructor(private readonly uploadService: UploadService) { }

    @Post('uploadImage')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        return await this.uploadService.upload(file)
    }

    @Get(':filename')
    async getFile(@Param('filename') filename: string, @Res() res: Response) {
        const buffer: Buffer<ArrayBufferLike> = await this.uploadService.getFile(filename);
        res.setHeader('Content-Type', 'image/jpeg');
        return res.send(Buffer.from(buffer));
    }
}
