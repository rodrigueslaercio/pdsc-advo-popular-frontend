import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JWTService } from "./shared/auth/jwt.service";

@Injectable()
export class ServiceGenerico {
    constructor(private http: HttpClient, private jwtService: JWTService) { }

    post(data: any, api: string, path: string): Observable<any> {
        console.log(this.jwtService.getToken())
        let headers = new HttpHeaders();
        headers = headers.set("Content-Type", "application/json").set("Authorization", `Bearer ${this.jwtService.getToken()}`)
        return this.http.post(`${api}/${path}`, JSON.stringify(data), {
            headers: headers
        });
    }

    get(api: string, path: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${this.jwtService.getToken()}`);

        return this.http.get(`${api}/${path}`, {
            headers: headers
        });
    }

    put(data: any, id: number, api: string, path: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${this.jwtService.getToken()}`);

        return this.http.put(`${api}/${path}/${id}`, JSON.stringify(data), {
            headers: headers
        });
    }

}