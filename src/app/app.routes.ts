import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './shared/usuarios/cadastro/cadastro.component';
import { HistoricoCausasComponent } from './causa/historico.causas.component';
import { AuthGuard } from './shared/auth/auth.guard.service';

export const routes: Routes = [
    { path: '', component: HistoricoCausasComponent, canActivate: [AuthGuard] },
    { path: 'home-cliente', component: HistoricoCausasComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
];
