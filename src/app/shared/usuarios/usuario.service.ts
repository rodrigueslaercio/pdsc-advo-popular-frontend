import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "./usuario.model";
import { HttpClient } from "@angular/common/http";
import { ServiceGenerico } from "../../service.generico";
import { environment } from "../../environments/environments";

@Injectable()
export class UsuarioService {
    constructor(private serviceGenerico: ServiceGenerico) {}

    public obterUsuario(id: Number): Observable<Usuario> {
        return this.serviceGenerico.get(`${environment.API}/usuario`, `${id}`);
    }
}