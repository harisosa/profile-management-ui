export class LoginModel {
    public username:string;
    public password:string;

    constructor(username:string, password:string) {
        this.username = username.trim().toLowerCase(),
        this.password = password.trim()
    }
}