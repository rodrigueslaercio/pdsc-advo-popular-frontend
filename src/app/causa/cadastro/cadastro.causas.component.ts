import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Causa, StatusCausa, TipoCausa } from "../causa.model";
import { ServiceGenerico } from "../../service.generico";
import { AutenticacaoService } from "../../shared/auth/autenticacao.service";
import { CausaService } from "../causa.service";
import { Router } from "@angular/router";

@Component({
    selector: 'cadastro-causas',
    templateUrl: "./cadastro.causas.component.html",
    styleUrl: "./cadastro.causas.scss",
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatSelectModule,
    ],
    providers: [CausaService]
})
export class CadastroCausasComponent implements OnInit{
    causa: Causa = new Causa();
    tiposEnum = Object.keys(TipoCausa);

    constructor(private causaService: CausaService, private autenticacaoService: AutenticacaoService, private route: Router) {}

    cadastrar() {
       this.causa.idCliente = this.autenticacaoService.getUsuarioLogado()!.id!;
       this.causa.statusCausa = StatusCausa.ABERTA;

       console.log(this.autenticacaoService.getUsuarioLogado()!.id!);

       this.causaService.cadastrarCausas(this.causa).subscribe((res => {
            if (res) {
                this.route.navigate(["/home-cliente"]);
            }
       }));
    }


    ngOnInit(): void {}

}