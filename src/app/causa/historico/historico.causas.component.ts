import { Component, OnInit } from "@angular/core";
import { CausaService } from "../causa.service";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Causa } from "../causa.model";
import { MatCardModule } from "@angular/material/card";
import { AutenticacaoService } from "../../shared/auth/autenticacao.service";
import { Router } from "@angular/router";

@Component({
    selector: 'home-cliente',
    templateUrl: 'historico.causas.component.html',
    imports: [
        MatCardModule,
        MatTableModule
    ],
    providers: [
        CausaService
    ]
})
export class HistoricoCausasComponent implements OnInit {
    dataSource!: MatTableDataSource<Causa>;
    displayedColumns: string[] = ['titulo', 'descricao', 'statusCausa', 'tipoCausa'];

    constructor(private causaService: CausaService, private autenticacaoService: AutenticacaoService, private route : Router) {}

    ngOnInit(): void {
        this.listarCausaCliente();
    }

    listarCausaCliente() {
        var idUsuario = this.autenticacaoService.getUsuarioLogado()?.id;

        if (idUsuario !== undefined) {
            this.causaService.obterByClienteId(idUsuario).subscribe((causas: Causa[]) => {
                this.dataSource = new MatTableDataSource(causas);
            });
        }
    }

    listarCausas() {
        this.causaService.obterCausas().subscribe((causas: Causa[]) => {
            this.dataSource = new MatTableDataSource(causas);
        });
    }


    visualizarCausa(causa: Causa) {
        this.route.navigate(['/causas/', causa.id]);
    }
    
}