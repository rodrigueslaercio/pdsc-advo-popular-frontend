import { Injectable } from "@angular/core";
import { Autenticacao } from "./autenticacao.model";
import { Observable } from "rxjs";
import { AuthResponse } from "./authresponse.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AutenticacaoService {

    constructor(private http: HttpClient) {}

    login(autenticacao: Autenticacao): Observable<AuthResponse> {
        let headers = new HttpHeaders();
        headers = headers.set("Content-Type", "application/json");
        return this.http.post<AuthResponse>('http://localhost:8080/login', JSON.stringify(autenticacao), {
            headers: headers
        });
    }
}