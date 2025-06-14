import { Injectable } from "@angular/core";
import { Autenticacao } from "./autenticacao.model";
import { Observable } from "rxjs";
import { AuthResponse } from "./authresponse.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServiceGenerico } from "../../service.generico";
import { environment } from "../../environments/environments";

@Injectable()
export class AutenticacaoService {

    constructor(private serviceGenerico: ServiceGenerico) {}

    login(autenticacao: Autenticacao): Observable<AuthResponse> {
        return this.serviceGenerico.post(autenticacao, `${environment.API}`, 'login');
    }
}