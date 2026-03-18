import { UserModel } from "../models/user.model"

const USERES='users'
const ACTIVE='active'
export class AuthService{
    static getUsers(): UserModel[] {
    
    if (localStorage.getItem(USERES) == null) {
        
        const initialUsers: UserModel[] = [{
            email: 'user@example.com',
            password: 'user123',
            favorites: 'Muzički tamburina',
            firstName: 'Example',
            lastName: 'User',
            phone: '064123456',    
            address: 'Ulica 123',
            orders: []
        }];
        // 3. Sačuvaj taj NIZ
        localStorage.setItem(USERES, JSON.stringify(initialUsers));
    }
    
    // 4. Vrati podatke (sada su sigurno niz)
    const data = localStorage.getItem(USERES);
    return data ? JSON.parse(data) : [];
}
    static login(email: string, password: string){
        const users=this.getUsers()
        for (let u of users){
            if(u.email===email && u.password===password){
                localStorage.setItem(ACTIVE,email)
                return true
            }
        } return false
    }
    static getActiveUser(): UserModel | null{
        const users=this.getUsers()
        for(let u of users){
            if(u.email===localStorage.getItem(ACTIVE)){
                return u
            }
        }
        return null
    }
    static logout(){
        localStorage.removeItem(ACTIVE)
    }
}