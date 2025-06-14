import { Component, OnInit } from "@angular/core";
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

    constructor(private usuarioService: UsuarioService, private route: Router) {
        this.usuario = new Usuario();
        this.usuario.tipoCadastro = 'cliente';
    }

    cadastrar() {
        this.usuarioService.cadastrarUsuario(this.usuario).subscribe((res => {
            if (res) {
                this.route.navigate(["/"]);
            } 
        }));
    }

    ngOnInit(): void {
    }

}