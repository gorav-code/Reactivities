import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";

interface Store{
    activityStore: ActivityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}


//We are registering this StoreContext in Index.tsx file to become available to our entire app globally
export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}