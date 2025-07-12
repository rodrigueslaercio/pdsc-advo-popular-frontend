import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Causa, StatusCausa, TipoCausa } from "../causa.model";
import { AutenticacaoService } from "../../shared/auth/autenticacao.service";
import { CausaService } from "../causa.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'cadastro-causas',
    templateUrl: "./cadastro.causas.component.html",
    styleUrl: "../causa.scss",
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatSelectModule,
        MatCheckboxModule,
        NgxMaskDirective
    ],
    providers: [CausaService, provideNgxMask()]
})
export class CadastroCausasComponent implements OnInit{
    causa: Causa = new Causa();
    tiposEnum = Object.keys(TipoCausa);
    valorNegociavel: boolean = false;

    constructor(private causaService: CausaService, private autenticacaoService: AutenticacaoService, private route: Router, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) {}

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get("id");
        if (id) {
            this.causaService.obterCausaPorId(+id).subscribe((causa) => {
                this.causa = causa;
                if (this.causa.valorCausa == null || this.causa.valorCausa == undefined) {
                    this.valorNegociavel = true;
                }
            })
        }
    }

    salvar() {
        if (this.causa.id) {
            this.causa.idCliente = this.autenticacaoService.getUsuarioLogado()?.id!;
            console.log(this.causa.idCliente);
            this.causaService.atualizarCausa(this.causa, this.causa.id).subscribe({
                next: (causaAtualizada) => {
                    this.route.navigate(["/home/cliente"]);
                    this.snackBar.open('Causa atualizada com sucesso!', 'Fechar', {
                        duration: 5000,
                        verticalPosition: 'bottom',
                        horizontalPosition: 'center'
                    });
                }, error: (err) => {
                    var erroEndpoint = err.error || 'Erro desconhecido ao atualizar';
                    this.snackBar.open(erroEndpoint, 'Fechar', {
                        duration: 5000,
                        verticalPosition: 'bottom',
                        horizontalPosition: 'center'
                    });
                }
            });
        } else {
            this.causa.idCliente = this.autenticacaoService.getUsuarioLogado()?.id!;
            this.causa.statusCausa = StatusCausa.ABERTA;
            this.causaService.cadastrarCausas(this.causa).subscribe({
                next: (causa) => {
                    this.route.navigate(["/home/cliente"]);
                    this.snackBar.open('Causa cadastrada com sucesso!', 'Fechar', {
                        duration: 5000,
                        verticalPosition: 'bottom',
                        horizontalPosition: 'center'
                    });
                }, error: (err) => {
                    var erroEndpoint = err.error || 'Erro desconhecido ao cadastrar';
                    this.snackBar.open(erroEndpoint, 'Fechar', {
                        duration: 5000,
                        verticalPosition: 'bottom',
                        horizontalPosition: 'center'
                    });
                }
            })
        }
    }

    verificaValorCausa() {
        if (this.valorNegociavel) {
            this.causa.valorCausa = null;
        }
    }

}