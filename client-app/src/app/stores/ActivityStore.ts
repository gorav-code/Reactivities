import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
    //activity array now we are replacing it with Map because Map is more optimized and faster
    //activities: Activity[] = [];

    //activity map instead of array
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        //here we are sorting activities by date
        var sortedActivititesByDate = Array.from(
            this.activityRegistry.values()
        ).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        return sortedActivititesByDate;
    }

    loadActivitites = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach((activity) => {
                this.setActivity(activity);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    loadActivity = async (id: string) => {
        //this.setLoadingInitial(true);
        console.log('loading activity: ' + id);
        let activity = this.getActvity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                
                runInAction(() => {
                    this.selectedActivity = activity;
                });
                
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    };

    //this method returns activity or undefiend with given id
    private getActvity = (id: string) => {
        return this.activityRegistry.get(id);
    };

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split("T")[0];

        //using array
        //this.activities.push(activity);

        //using map
        this.activityRegistry.set(activity.id, activity);
    };

    // selectActivity = (id: String) => {
    //     //using array
    //     //this.selectedActivity = this.activities.find(i=> i.id === id);

    //     //using map
    //     this.selectedActivity = this.activityRegistry.get(id.toString());
    // };

    // cancelSelectedActivity = () => {
    //     this.selectedActivity = undefined;
    // };

    // openForm = (id?: String) => {
    //     id ? this.selectActivity(id) : this.cancelSelectedActivity();
    //     this.editMode = true;
    // };

    // closeForm = () => {
    //     this.editMode = false;
    // };

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                //using array
                //this.activities.push(activity);

                //using map
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
        }
    };

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                //creating and assigning new array
                //using array
                //this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];

                //using map
                this.activityRegistry.set(activity.id, activity);

                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            //await agent.Activities.delete(id);
            runInAction(() => {
                //using array
                //this.activities = [...this.activities.filter(a => a.id !== id)];

                //using map
                this.activityRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}
