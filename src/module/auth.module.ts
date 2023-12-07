// auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Module({
  providers: [AuthService],
  exports: [AuthService], // Exporta el servicio para que esté disponible en otros módulos
})
export class AuthModule {}
