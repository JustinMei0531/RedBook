import axios from "axios";
import {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse
}
from "axios";
import Apis from "../constants/Apis";


class Request{

    private instance: AxiosInstance;

    constructor(){
        this.instance = axios.create({
            baseURL: "http://192.168.0.14:7001"
        });
    }

    public get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>{
        return this.instance.get<T>(url, {params, ...config});
    }

    public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.post<T>(url, data, config);
      }
    
      public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.put<T>(url, data, config);
      }
    
      public delete<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.delete<T>(url, { params, ...config });
      }
}

const request = (name: string, params: any) => {
    const rsObj = new Request();
    const api = Apis[name];

    const { url, method} = api;

    // const fullURL = "http://192.168.0.14:7001" + url;

    
    // Send network requests
    switch (method.toLocaleLowerCase()){
        case "get":
            return rsObj.get(url, params);
        case "post":
            return rsObj.post(url, params);
        case "put":
            return rsObj.put(url, params);
        case "delete":
            return rsObj.delete(url, params);
        default:
            throw new Error("Unsupported request method!");
    }
};

export default request;