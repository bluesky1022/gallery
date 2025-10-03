import  Axios  from "./../utils/request";
import { GET_GROUPS_URL, GET_SCREENS_URL, GET_USERS_URL, GET_GROUP_LOGO_URL } from "../utils/constants";

export const getGroups = async () => {
    const response = await Axios.get(GET_GROUPS_URL);
    return response;
}

export const getGroupLogoUrl = (group: any) => {
    return GET_GROUP_LOGO_URL + group.brand; 
}

export const getUsers = async () => {
    const response = await Axios.get(GET_USERS_URL);
    return response;
}

export const getScreens = async (date : any) => {
    const response = await Axios.post(GET_SCREENS_URL, date);
    return response;
}