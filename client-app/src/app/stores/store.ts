import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store{
    activityStore: ActivityStore,
    commonStore: CommonStore,
    userStore: UserStore
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}


//We are registering this StoreContext in Index.tsx file to become available to our entire app globally
export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}