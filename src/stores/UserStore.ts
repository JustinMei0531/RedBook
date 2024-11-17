import { flow } from "mobx";
import request from "../utils/Requests";
import { save } from "../utils/Storage";

class UserStore{

    private userInfo: any;

    public requestLogin = flow(function*(
        this: UserStore,
        phone: string,
        pwd: string,
        callback: (success: boolean) => void
    ) {
        try{
            const params = {name: phone, pwd: pwd};
            const {data} = yield request("login", params);
            if (data){
                save("userInfo", JSON.stringify(data));
                this.userInfo = data;
                callback?.(true);
            }
            else{
                this.userInfo = null;
                callback?.(false);
            }
        }
        catch (e: unknown){
            console.error(e);
            callback?.(false);
            this.userInfo = null;
        }
    });
}

export default new UserStore();