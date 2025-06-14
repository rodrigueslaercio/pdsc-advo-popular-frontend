import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ServiceGenerico {
    constructor(private http: HttpClient) {}

    post(data: any, api: string, path: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set("Content-Type", "application/json");
        return this.http.post(`${api}/${path}`, JSON.stringify(data), {
            headers: headers
        });
    }

    get(api: string, path: string): Observable<any> {
        return this.http.get(`${api}/${path}`);
    }


}