export class JWTService {
    constructor() {}

    setToken(token: string) {
        localStorage.setItem("jwt_token", token);
    }

    getToken(): any {
        return localStorage.getItem("jwt_token");
    }
}