import { publicRequest } from "../utils/apiClient";

export const appClient_test = async (data: any) => {
    const response = await publicRequest('http://localhost:5000/api/monitor', "POST", data);
    return response.data;
}