import { EventEmitter, Injectable } from "@angular/core";
import { Autenticacao } from "./autenticacao.model";
import { Observable } from "rxjs";
import { AuthResponse } from "./authresponse.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServiceGenerico } from "../../service.generico";
import { environment } from "../../environments/environments";
import { Usuario } from "../usuarios/usuario.model";
import { routes } from "../../app.routes";
import { Route, Router } from "@angular/router";
import { JWTService } from "./jwt.service";
import { UsuarioService } from "../usuarios/usuario.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AutenticacaoService {

    usuario: Usuario | null = null;
    usuarioEvent = new EventEmitter<boolean>();
    autenticacaoCadastro: Autenticacao | null = null;

    constructor(private serviceGenerico: ServiceGenerico, private snackBar: MatSnackBar, private route : Router, private jwtService: JWTService, private usuarioService: UsuarioService) {}

    login(autenticacao: Autenticacao): Observable<AuthResponse> {
        return this.serviceGenerico.post(autenticacao, `${environment.API}`, 'login');
    }

    isUsuarioLogado(): boolean {
        this.usuario = this.getUsuarioLogado();
        if (this.usuario) {
            return true;
        }

        return false;
    }

    getUsuarioLogado() {
        const usuarioLogado = localStorage.getItem('usuarioLogado');
        this.usuario = usuarioLogado ? JSON.parse(usuarioLogado) : null;
        return this.usuario;
    }

    registrarUsuario(usuario: Usuario) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        this.usuario = usuario;
        this.usuarioEvent.emit(true);
    } 

    logout() {
        localStorage.removeItem('usuarioLogado');
        this.usuario = null;
        this.route.navigate(['/login']);
    }

    logarAposCadastro(usuario: Usuario) {
        this.autenticacaoCadastro = new Autenticacao();
        this.autenticacaoCadastro.email = usuario.email;
        this.autenticacaoCadastro.senha = usuario.senha;

        this.login(this.autenticacaoCadastro).subscribe({
            next: (authResponse: AuthResponse) => {
                const token: string = authResponse.token;

                if (token) {
                    const jwtHelper = new JwtHelperService();
                    this.jwtService.setToken(token);

                    const usuarioToken: Usuario | null = jwtHelper.decodeToken(token);

                    if (usuarioToken && usuarioToken.id) {
                        this.usuarioService.obterUsuario(usuarioToken.id).subscribe({
                            next: (usuarioCadastrado) => {
                                this.registrarUsuario(usuarioCadastrado);
                                this.route.navigate(['/home/cliente']);
                            },
                            error: (err) => {
                                var erroEndpoint = err.error || 'Erro desconhecido ao logar após o cadastro';
                                this.snackBar.open(erroEndpoint!, 'Fechar', {
                                    duration: 5000,
                                    verticalPosition: 'bottom',
                                    horizontalPosition: 'center'
                                });
                            }
                        });
                    }
                }
            },
            error: (err) => {
                var erroEndpoint = err.error || 'Erro desconhecido ao logar após o cadastro';
                this.snackBar.open(erroEndpoint!, 'Fechar', {
                    duration: 5000,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'center'
                });
            }
        });
    }

    checkTokenValidity() {
        const token = localStorage.getItem('token')
        if (this.jwtService.isTokenExpired()) {
            this.logout();
            this.snackBar.open('Sua sessão expirou. Por favor, faça login novamente.', 'Fechar', {
                    duration: 5000,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'center'
            });
        }
    }
}