import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import * as multer from 'multer';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(multer({ dest: './uploads' }).single('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
  ): Promise<string> {
    return this.filesService.uploadFile(file, description);
  }
}
