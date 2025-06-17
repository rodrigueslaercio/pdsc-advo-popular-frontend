import { Injectable } from "@angular/core";
import { ServiceGenerico } from "../service.generico";
import { environment } from "../environments/environments";

@Injectable()
export class CausaService {
    constructor(private serviceGenerico: ServiceGenerico) {}

    public obterCausas() {
        return this.serviceGenerico.get(`${environment.API}`, 'causa');
    }

    public obterByClienteId(id: Number) {
        return this.serviceGenerico.get(`${environment.API}`, `causa/cliente/${id}`);
    }
}