import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AutenticacaoService } from "./autenticacao.service";
import { catchError, map, of } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private autenticacao: AutenticacaoService, private router: Router, private snackBar: MatSnackBar) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if (!this.autenticacao.isUsuarioLogado()) {
            this.router.navigate(['/login']);
            return false;
        }

        // CAUSA
        const idCausa = route.params['id'];
        if (idCausa) {
            this.autenticacao.usuarioAcesso('causa', idCausa).pipe(
                catchError(err => {
                    if (err.status === 403) {
                        this.router.navigate(['home/cliente']);
                        this.snackBar.open('Você não tem permissão para acessar essa página', 'Fechar', {
                                    duration: 5000,
                                    verticalPosition: 'bottom',
                                    horizontalPosition: 'center'
                        });
                    }
                    return of(false);
                })
            ).subscribe()
        }
        return true;
    }
}