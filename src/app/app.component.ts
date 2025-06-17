import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { AutenticacaoService } from './shared/auth/autenticacao.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pdsc-advo-popular-frontend';

  constructor(private autenticacaoService: AutenticacaoService) {}

  verificaUsuarioLogado(): boolean {
    return this.autenticacaoService.isUsuarioLogado() ? true : false;
  }
}
