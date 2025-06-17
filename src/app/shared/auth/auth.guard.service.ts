import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AutenticacaoService } from "./autenticacao.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private autenticacao: AutenticacaoService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if (this.autenticacao.isUsuarioLogado()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}