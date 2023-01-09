import axios, { AxiosResponse } from "axios";
import { Activity } from "../../models/activity";
import { User, UserFormValues } from "../../models/user";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    })
  }

axios.defaults.baseURL = "https://localhost:5001/api";
//axios.defaults.baseURL = "http://localhost:5000/api";

//we are using axios.interceptors to show intercept response by waiting 1000ms and then return response.
//Definition: axios.interceptors are configuration that are added automatically to every request/response that a user receive.
axios.interceptors.response.use(async response => {
    try{
        await sleep(1000);
        return response;
    }catch(error){
        console.log(error);
        return await Promise.reject(error);
    } 
})

//getting response body
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

//creating request object and passing API url then we are passing responsBody to read response
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post:<T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.get<T>(url).then(responseBody)
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>('/activities', activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: String)=>axios.delete(`/activities/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
}

const agent = {
    Activities,
    Account
}

export default agent;