import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "./usuario.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UsuarioService {
    constructor(private http: HttpClient) {}

    public obterUsuario(id: Number): Observable<Usuario> {
        return this.http.get<Usuario>(`http://localhost:8080/usuario/${id}`);
    }
}