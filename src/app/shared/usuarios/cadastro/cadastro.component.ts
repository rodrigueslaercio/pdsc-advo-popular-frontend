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
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { firstValueFrom, Observable } from "rxjs";
import { JWTService } from "../../auth/jwt.service";
import { AutenticacaoService } from "../../auth/autenticacao.service";

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
        MatRadioGroup,
        MatRadioButton,
        NgxMaskDirective,
    ],
    providers: [
        provideNgxMask(),
    ]
})
export class CadastroComponent implements OnInit {
    usuario: Usuario;
    erroEndpoint: string | null = null;
    tipoDocumento: string | null = null;
    estados: any[] = [];

    constructor(private usuarioService: UsuarioService, private route: Router, private snackBar: MatSnackBar, private authService: AutenticacaoService, 
            private jwtService: JWTService) {
        this.usuario = new Usuario();
        this.usuario.tipoCadastro = 'cliente';
        this.tipoDocumento = 'cpf';
    }


    ngOnInit(): void {
        this.usuarioService.buscarEstados().subscribe(res => {
            this.estados = res;
        });
    }

    async cadastrar() {
        try {
            await firstValueFrom(this.usuarioService.cadastrarUsuario(this.usuario));

            this.snackBar.open('Cadastrado com sucesso!', 'Fechar', {
                duration: 5000,
                verticalPosition: 'bottom',
                horizontalPosition: 'center'
            });

            this.authService.logarAposCadastro(this.usuario);
        } catch (err: any) {
            this.erroEndpoint = err.error || 'Erro desconhecido ao cadastrar';
            this.snackBar.open(this.erroEndpoint!, 'Fechar', {
                duration: 5000,
                verticalPosition: 'bottom',
                horizontalPosition: 'center'
            });
        }
    }

    verificaSenha(): boolean {
        return this.usuario.senha === this.usuario.confirmacaoSenha;
    }

    onChangeTipoDocumento() {
        if (this.tipoDocumento === 'cpf') {
            this.usuario.cnpj = '';
        } else if (this.tipoDocumento === 'cnpj') {
            this.usuario.cpf = '';
        }
    }

    getSiglaEstado(nome: string) {
        const estado = this.estados.find(e => e.nome === nome)
        return estado ? estado.sigla : '';
    }

    defineNumeroOab(): string {
        if (this.usuario.oab !== undefined && this.usuario.oab.length !== 9) {
            return this.usuario.oab += "/" + this.getSiglaEstado(this.usuario.estado!);
        }
        return this.usuario.oab!;
    }

    onlyNumbers(event: KeyboardEvent) {
        const charCode = event.charCode || event.keyCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    }

    onChangeTipoCadastro() {
        if (this.usuario.tipoCadastro === 'advogado') {
            this.usuario.cpf = '';
            this.usuario.cnpj = '';
            this.tipoDocumento = null;
        } else {
            this.usuario.oab = '';
            this.usuario.estado = '';
        }
    }
    

}