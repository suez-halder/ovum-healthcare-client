import { authKey } from "@/constants/authKey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodedToken } from "@/utils/jwt";
import {
    getFromLocalStorage,
    removeFromLocalStorage,
    setToLocalStorage,
} from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
        const decodedData: any = decodedToken(authToken);
        return {
            ...decodedData,
            role: decodedData?.role?.toLowerCase(),
        };
    }
};

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
        return !!authToken; // true or false e convert kore fele
    }
};

export const removeUser = () => {
    return removeFromLocalStorage(authKey);
};

export const getNewAccessToken = async () => {
    return await axiosInstance({
        url: "http://localhost:5173/api/v1/auth/refresh-token",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
};
