import { authKey } from "@/constants/authKey";
import setAccessToken from "@/services/actions/setAccessToken";
import { getNewAccessToken } from "@/services/auth.services";
import { TGenericErrorResponse, TResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// let isRefreshing = false;
// let refreshSubscribers: any = [];

// const onRefreshed = (accessToken: string) => {
//     refreshSubscribers.map((callback: any) => callback(accessToken));
// };

// const addRefreshSubscriber = (callback: any) => {
//     refreshSubscribers.push(callback);
// };

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const accessToken = getFromLocalStorage(authKey);

        if (accessToken) {
            config.headers.Authorization = accessToken;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    // @ts-ignore
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        const responseObj: TResponseSuccessType = {
            data: response?.data?.data,
            meta: response?.data?.meta,
        };

        return responseObj;
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        // console.log(error);
        const config = error.config;
        // console.log(config);

        if (error?.response?.status === 500 && !config.sent) {
            config.sent = true; // to stop request again and again
            const response = await getNewAccessToken();
            const accessToken = response?.data?.accessToken;
            config.headers["Authorization"] = accessToken;
            setToLocalStorage(authKey, accessToken);
            setAccessToken(accessToken);
            return instance(config);
        } else {
            const responseObj: TGenericErrorResponse = {
                statusCode: error?.response?.data?.statusCode || 500,
                message:
                    error?.response?.data?.message || "Something went wrong!",
                errorMessages: error?.response?.data?.message,
            };

            // return Promise.reject(error);
            return responseObj;
        }
    }

    // async function (error) {
    //     const config = error.config;

    //     if (error?.response?.status === 500 && !config.sent) {
    //         if (!isRefreshing) {
    //             isRefreshing = true;
    //             try {
    //                 config.sent = true;
    //                 const response = await getNewAccessToken();
    //                 const accessToken = response?.data?.accessToken;
    //                 setToLocalStorage(authKey, accessToken);
    //                 config.headers["Authorization"] = accessToken;
    //                 setAccessToken(accessToken);
    //                 onRefreshed(accessToken);
    //             } catch (e) {
    //                 return Promise.reject(e);
    //             } finally {
    //                 isRefreshing = false;
    //                 refreshSubscribers = [];
    //             }
    //         }

    //         const retryOrigReq = new Promise((resolve) => {
    //             addRefreshSubscriber((accessToken: string) => {
    //                 config.headers["Authorization"] = accessToken;
    //                 config.__isRetryRequest = true;
    //                 resolve(axios(config));
    //             });
    //         });
    //         return retryOrigReq;
    //     }

    //     const responseObj: TGenericErrorResponse = {
    //         statusCode: error?.response?.data?.statusCode || 500,
    //         message: error?.response?.data?.message || "Something went wrong!",
    //         errorMessages: error?.response?.data?.message,
    //     };

    //     return Promise.reject(responseObj);
    // }
);

export { instance };
