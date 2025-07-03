import { Component, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { CausaService } from "./causa.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Causa } from "./causa.model";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { Usuario } from "../shared/usuarios/usuario.model";
import { UsuarioService } from "../shared/usuarios/usuario.service";
import { AutenticacaoService } from "../shared/auth/autenticacao.service";

@Component({
    selector: 'causa',
    templateUrl: 'causa.component.html',
    styleUrl: './causa.scss',
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        FormsModule
    ],
    providers: [
        CausaService
    ]
})
export class CausaComponent implements OnInit {
    causa: Causa = new Causa()
    advogadoResponsavel: Usuario = new Usuario()
    cliente: Usuario = new Usuario()

    constructor(private causaService: CausaService, private usuarioService: UsuarioService,
         private autenticacaoService: AutenticacaoService, private activatedRoute: ActivatedRoute, 
         private route: Router) {}

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get("id");
        if (id) {
            this.causaService.obterCausaPorId(+id).subscribe((causa) => {
                this.causa = causa;

                if (this.causa.idCliente) {
                    this.usuarioService.obterUsuario(this.causa.idCliente).subscribe(usuario => {
                        this.cliente = usuario;
                    })
                }

                if (this.causa.idAdvogadoResponsavel) {
                    this.usuarioService.obterUsuario(this.causa.idAdvogadoResponsavel).subscribe(usuario => {
                        this.advogadoResponsavel = usuario;
                    })
                }
            });
        }
    }

    editar() {
        this.route.navigate(['causas/editar/', this.causa.id]);
    }

    usuarioEhCliente(): boolean {
        return this.causa.idCliente === this.autenticacaoService.getUsuarioLogado()?.id;
    }

}