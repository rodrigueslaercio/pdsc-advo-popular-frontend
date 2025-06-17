import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AutenticacaoService } from "../shared/auth/autenticacao.service";
import { Autenticacao } from "../shared/auth/autenticacao.model";
import { AuthResponse } from "../shared/auth/authresponse.model";
import { JwtHelperService } from '@auth0/angular-jwt';
import { JWTService } from "../shared/auth/jwt.service";
import { Usuario } from "../shared/usuarios/usuario.model";
import { UsuarioService } from "../shared/usuarios/usuario.service";
import { Router, RouterModule } from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        RouterModule
    ],
    providers: [AutenticacaoService]
})
export class LoginComponent implements OnInit {
    autenticacao: Autenticacao;

    constructor(private authService: AutenticacaoService, 
        private jwtService: JWTService,
         private usuarioService: UsuarioService, 
        private route: Router) {
        this.autenticacao = new Autenticacao();
    }

    login() {
        this.authService.login(this.autenticacao).subscribe((authResponse: AuthResponse) => {
            const token: string = authResponse.token;

            if (token) {
                const jwtHelper: JwtHelperService = new JwtHelperService();
                this.jwtService.setToken(token);
                const usuario: Usuario | null = jwtHelper.decodeToken(token);
                if (usuario && usuario.id !== undefined) {
                    this.usuarioService.obterUsuario(usuario.id).subscribe(usuarioLogado => {
                        this.authService.registrarUsuario(usuarioLogado);
                        this.route.navigate(['/home-cliente']);
                    });
                } else {
                    console.error('Ocorreu um erro ao logar.');
                }
            }
        })
    }

    redirecionarPaginaCadastro() {
        this.route.navigate(["/cadastro"]);
    }

    ngOnInit(): void { }

}