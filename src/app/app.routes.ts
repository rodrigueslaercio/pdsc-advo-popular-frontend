import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './shared/usuarios/cadastro/cadastro.component';
import { HistoricoCausasComponent } from './causa/historico.causas.component';
import { AuthGuard } from './shared/auth/auth.guard.service';

export const routes: Routes = [
    { path: '', component: HistoricoCausasComponent, canActivate: [AuthGuard], title: 'Home' },
    { path: 'home-cliente', component: HistoricoCausasComponent, canActivate: [AuthGuard], title: 'Home' },
    { path: 'login', component: LoginComponent, title: 'Advogado Popular' },
    { path: 'cadastro', component: CadastroComponent, title: 'Cadastre-se' },
];
