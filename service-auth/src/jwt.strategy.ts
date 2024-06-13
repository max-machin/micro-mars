/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey', // Utilisation de la clé secrète de l'environnement
    });
  }

  async validate(payload: any) {
    // Adapter les informations de validation en fonction de vos données
    return {
      userId: payload.sub,
      email: payload.email,
      firstname: payload.firstname,
      lastname: payload.lastname,
    };
  }
}
