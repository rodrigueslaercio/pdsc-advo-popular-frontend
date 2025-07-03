import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './shared/usuarios/cadastro/cadastro.component';
import { HistoricoCausasComponent } from './causa/historico/historico.causas.component';
import { AuthGuard } from './shared/auth/auth.guard.service';
import { CadastroCausasComponent } from './causa/cadastro/cadastro.causas.component';
import { CausaComponent } from './causa/causa.component';

export const routes: Routes = [
    { path: '', component: HistoricoCausasComponent, canActivate: [AuthGuard], title: 'Home' },
    { path: 'home/cliente', component: HistoricoCausasComponent, canActivate: [AuthGuard], title: 'Home' },
    { path: 'login', component: LoginComponent, title: 'Advogado Popular' },
    { path: 'cadastro', component: CadastroComponent, title: 'Cadastre-se' },
    { path: 'causas/cadastrar', component: CadastroCausasComponent, title: 'Registre a causa' },
    { path: 'causas/editar/:id', component: CadastroCausasComponent},
    { path: 'causas/:id', component: CausaComponent },
];
