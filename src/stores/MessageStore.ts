import {makeObservable, observable, runInAction} from "mobx";
import request from "../utils/Requests";
import {MessageListItem, UnRead} from "./types";

export default class MessageStore{

    private page: number = 1;
    private size: number = 10;

    public messageList: MessageListItem[] = [];

    public isRefreshing: boolean = false;

    public unread: UnRead = {} as UnRead;

    constructor() {
        makeObservable(this, {
            messageList: observable,
            isRefreshing: observable,
            unread: observable,
        });
    }

    public  requestMessageList(){
        if (this.isRefreshing){
            return;
        }

        try{
            runInAction(() => {this.isRefreshing = true;});
            const params = {
                page: this.page,
                size: this.size,
            };

            request("messageList", params).then(response => {
                const { data } = response;
                if (data.length){
                    if (this.page === 1){
                        runInAction(() => {this.messageList = data;});
                    }
                    else{
                        runInAction(() => {this.messageList = [...this.messageList, ...data];});
                    }
                    this.page += 1;
                }
                else{
                    runInAction(() => {this.messageList = [];});
                }
            })
                .catch(error => console.error(error))
                .finally(() => {
                    runInAction(() => {this.isRefreshing = false;})
                });
        }
        catch (e: unknown){
            console.error(e);
        }
        return;
    }

    public requestUnRead(){
        try{
            request("unRead", {}).then(response => {
                const { data } = response;
                runInAction(() => {this.unread = data;});
                return;
            })
                .catch(error => console.error(error));
        }
        catch (e: unknown){
            console.error(e);
        }
        return;
    }
}
