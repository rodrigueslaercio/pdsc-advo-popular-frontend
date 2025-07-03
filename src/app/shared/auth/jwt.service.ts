export class JWTService {
    constructor() { }

    setToken(token: string) {
        localStorage.setItem("jwt_token", token);
    }

    getToken(): any {
        return localStorage.getItem("jwt_token");
    }

    isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) return true;

        try {
            const payloadBase64 = token.split('.')[1];
            if (!payloadBase64) return true;

            const payloadJson = atob(payloadBase64);
            const payload = JSON.parse(payloadJson);
            const exp = payload.exp;
            if (!exp) return true;

            return (exp * 1000) < Date.now();
        } catch (e) {
            return true;
        }
    }
}