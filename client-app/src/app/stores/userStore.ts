import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../../models/user";
import agent from "../api/agent";
import { router } from "../router/Routes";
import { store } from "./store";

export default class UserStore{
    user: User | null = null;

    constructor(){
        makeAutoObservable(this)
    }

    get isLoggedIn(){
        return !!this.user;
    }

    //performing login 
    login = async (creds: UserFormValues) => {
        try{
            const user = await agent.Account.login(creds);

            //saving user token in local store 
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user); 

            //navigate to activities
            router.navigate("/activities")
        }catch(error){
            throw error;
        }
    }

    //performing logout
    logout = () => {
        store.commonStore.setToken(null);
        localStorage.removeItem('jwt');
        this.user = null;
        router.navigate('/');
    }
}