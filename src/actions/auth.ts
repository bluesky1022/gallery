import { publicRequest } from "../utils/apiClient";

export const signin = async (data: any) => {
    const response = await publicRequest('http://localhost:5000/api/auth/login', 'POST', data);
    return response.data;
}