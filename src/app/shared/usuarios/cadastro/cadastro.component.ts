import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Usuario } from "../usuario.model";
import { UsuarioService } from "../usuario.service";
import { Router } from "@angular/router";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'cadastro',
    templateUrl: "./cadastro.component.html",
    styleUrl: "./cadastro.scss",
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatSelectModule,
    ]
})
export class CadastroComponent implements OnInit {
    usuario: Usuario;
    erroEndpoint: string | null = null;

    constructor(private usuarioService: UsuarioService, private route: Router, private snackBar: MatSnackBar) {
        this.usuario = new Usuario();
        this.usuario.tipoCadastro = 'cliente';
    }


    ngOnInit(): void {
    }

    cadastrar() {
        this.usuarioService.cadastrarUsuario(this.usuario).subscribe({
            next: (res) => {
                this.route.navigate(['/']);
            },
            error: (err) => {
                this.erroEndpoint = err.error || 'Erro desconhecido ao cadastrar';
                if (this.erroEndpoint !== null) {
                    this.snackBar.open(this.erroEndpoint, 'Fechar', {
                    duration: 5000,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'center'
                });
                }
            }
        });
    }

    verificaSenha(): boolean {
        return this.usuario.senha === this.usuario.confirmacaoSenha;
    }


}