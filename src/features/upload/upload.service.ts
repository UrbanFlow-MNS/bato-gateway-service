import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { firstValueFrom } from "rxjs"

@Injectable()
export class UploadService {

    constructor(
        @Inject('UPLOAD_SERVICE') private uploadClient: ClientProxy
    ) { }

    async upload(file: Express.Multer.File) {
        try {
            const response = await firstValueFrom(
                this.uploadClient.send('uploadImage', file)
            )
            return { imageId: response }
        } catch (error) {
            throw error
        }
    }

    async getFile(filename: string): Promise<Buffer<ArrayBufferLike>> {
        try {
            const response: Buffer<ArrayBufferLike> = await firstValueFrom<Buffer>(
                this.uploadClient.send('getFile', filename)
            )
            return response
        } catch (error) {
            throw error
        }
    }
}