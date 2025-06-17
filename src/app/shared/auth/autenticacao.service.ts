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

@Injectable()
export class AutenticacaoService {

    usuario: Usuario | null = null;
    usuarioEvent = new EventEmitter<boolean>();

    constructor(private serviceGenerico: ServiceGenerico, private route : Router) {}

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
}