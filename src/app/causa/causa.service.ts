import { Injectable } from "@angular/core";
import { ServiceGenerico } from "../service.generico";
import { environment } from "../environments/environments";
import { Causa } from "./causa.model";
import { Observable } from "rxjs";

@Injectable()
export class CausaService {
    constructor(private serviceGenerico: ServiceGenerico) {}

    public obterCausas() {
        return this.serviceGenerico.get(`${environment.API}`, 'causa');
    }

    public obterByClienteId(id: Number) {
        return this.serviceGenerico.get(`${environment.API}`, `causa/cliente/${id}`);
    }

    public cadastrarCausas(causa: Causa): Observable<Causa> {
        return this.serviceGenerico.post(causa, `${environment.API}/causa`, 'cadastrar');
    }

    public atualizarCausa(causa: Causa, id: number): Observable<Causa> {
        return this.serviceGenerico.put(causa, id, `${environment.API}`, `causa/editar`);
    }

    public obterCausaPorId(id: number) {
        return this.serviceGenerico.get(`${environment.API}`, `causa/${id}`);
    }
}