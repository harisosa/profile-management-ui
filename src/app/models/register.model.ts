export class UserModel{
    public id :string = '';
    public fullname:string = '';
    public email:string = '';
    public phone:string ='';
    public password:string = '';
    constructor(obj:any) {
        if(obj){
            this.id = obj.id;
            this.fullname = obj.name ? obj.name.trim() : obj.fullname.trim(),
            this.email = obj.email.trim().toLowerCase(),
            this.phone = obj.phone.trim(),
            this.password = obj.password ? obj.password : '';
        }

    }
}