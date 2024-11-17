import request from "../utils/Requests";
import {load} from "../utils/Storage";
import {makeAutoObservable, makeObservable, runInAction} from "mobx";
import {Article} from "./types";


export default class ArticleDetailStore{
    public detail: Article | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    public requestArticleDetail = (id: number) => {
        try {
            const params = { id };

            request("articleDetail", params).then(data => {
                if (data){
                    runInAction(() => {this.detail = data["data"]});
                }


            }).catch(error => console.error(error));
        } catch (error) {
            console.error("Failed to fetch article detail:", error);
        }
    };
}
