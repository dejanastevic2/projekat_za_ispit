import { UserModel } from "../models/user.model"

const USERS='users'
const ACTIVE='active'
export class AuthService{
    static getUsers(): UserModel[] {
        const baseUser: UserModel = {
            email: 'user@example.com',
            firstName:'Example',
            lastName:'User',
            password: 'user123',
            phone: '064123456',
            address:'Ulica 123',
            favorites:'Muzički tamburina',
            orders: []

        }
        if (localStorage.getItem(USERS) == null) {
            localStorage.setItem(USERS, JSON.stringify([baseUser]))
        }
        return JSON.parse(localStorage.getItem(USERS)!)
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
    static updateActiveUser(newUserData:UserModel){
        const users=this.getUsers()
        for(let u of users){
            if(u.email===localStorage.getItem(ACTIVE)){
                u.firstName=newUserData.firstName
                u.lastName=newUserData.lastName
                u.address=newUserData.address
                u.phone=newUserData.phone
                u.favorites=newUserData.favorites
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }
    static logout(){
        localStorage.removeItem(ACTIVE)
    }
}