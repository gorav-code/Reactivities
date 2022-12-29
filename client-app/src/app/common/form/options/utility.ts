import { format } from "date-fns";

export function convertDateToDateTimeString(date: Date | null) : String{
    if(date!=null){
        return format(date, 'dd MMM yy h:mm aa');
    }
    return "";
}

export function convertDateToOnlyDateString(date: Date | null) : String{
    if(date!=null){
        return format(date, 'dd MMM yyyy');
    }
    return "";
}