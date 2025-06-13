import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AutenticacaoService } from './shared/auth/autenticacao.service';
import { JWTService } from './shared/auth/jwt.service';
import { UsuarioService } from './shared/usuarios/usuario.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(), 
    AutenticacaoService,
    JWTService,
    UsuarioService]
};
