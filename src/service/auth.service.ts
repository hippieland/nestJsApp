// auth.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateGoogleUser(profile: any): Promise<any> {
    // Aquí deberías implementar la lógica para validar y crear usuarios según tu modelo de datos
    // Por ejemplo, verifica si el usuario ya existe en tu base de datos y créalo si no.
    return {
      email: profile.emails[0].value,
      name: profile.displayName,
      // Otros campos según tu modelo de usuario
    };
  }
}
