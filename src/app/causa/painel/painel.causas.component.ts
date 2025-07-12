import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { CausaService } from "../causa.service";
import { AutenticacaoService } from "../../shared/auth/autenticacao.service";
import { Router } from "@angular/router";
import { Causa } from "../causa.model";

@Component({
    selector: 'home-advogado',
    templateUrl: 'painel.causas.component.html',
    imports: [
        MatCardModule,
        MatTableModule,
        CommonModule
    ],
    providers: [
        CausaService
    ]
})
export class PainelCausasComponent implements OnInit {
    dataSource!: MatTableDataSource<Causa>;
    displayedColumns: string[] = ['titulo', 'descricao', 'statusCausa', 'tipoCausa'];

    constructor(private causaService: CausaService, public autenticacaoService: AutenticacaoService, private route : Router) {}

    ngOnInit(): void {
        this.listarCausas();
    }

    listarCausas() {
        this.causaService.obterCausas().subscribe((causas: Causa[]) => {
            this.dataSource = new MatTableDataSource(causas);
        });
    }
}