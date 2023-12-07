// google.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../service/auth.service'; 

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '706810380094-1n86dn97naijhcth2k9u40qkqcj65t6a.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback', // Ajusta la URL según tus necesidades
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = await this.authService.validateGoogleUser(profile);
    done(null, user);
  }
}
