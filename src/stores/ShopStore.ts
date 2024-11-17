import request from "../utils/Requests";
import { makeAutoObservable, runInAction } from "mobx";
import { GoodsCategory, GoodsSimple } from "./types";

export default class ShopStore{

    public goodsList: GoodsSimple[] = [];
    public categoryList: GoodsCategory[] = [];
    private isRefreshing: boolean = false;
    private page: number = 1;
    private size: number = 10;

    constructor(){
        makeAutoObservable(this);
    }

    public requestGoodsList() {
        if (this.isRefreshing){
            return;
        }
        try{
            runInAction(() => {this.isRefreshing = true;});
            const params = {page: this.page, size: this.size}

            request("goodsList", params).then(response => {
                const data = response["data"];
                if (data.length){
                    if (this.page === 1){
                        runInAction(() => {this.goodsList = data});
                    }
                    else{
                        this.goodsList = [...this.goodsList, ...data];
                    }
                }
                else{
                    if (this.page === 1){
                        runInAction(() => {this.goodsList = []});
                    }
                }
            })
            .catch(error => console.error(error))
            .finally(() => {
                runInAction(() => {this.isRefreshing = false;});
            });
        }
        catch (e: unknown){
            console.log(e);
        }

    }

    public requestTopCategory() {
        try{
        
            request("top10Category", {}).then(response => {
                const data = response["data"];
                if (data){
                    runInAction(() => {this.categoryList = data});
                }
                else{
                    runInAction(() => {this.categoryList = []});
                }
            })
            .catch(error => console.error(error))
            
        }
        catch (e: unknown){
            console.log(e);
        }
    }
}
