import { Component, OnInit } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AutenticacaoService } from "../auth/autenticacao.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [
        MatToolbarModule
    ]
})
export class HeaderComponent implements OnInit {
    constructor(private autenticacaoService: AutenticacaoService) {}
    
    ngOnInit(): void {}

    logout() {
        this.autenticacaoService.logout();
    }


}