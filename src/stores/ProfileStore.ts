import { makeObservable, observable, runInAction } from "mobx";
import request from "../utils/Requests";
import { ArticleSimple } from "./types";


export default class ProfileStore{

    private isRefreshing: boolean = false;

    public info: any = {};
    public noteList: ArticleSimple[] = [];
    public collectionList: ArticleSimple[] = [];
    public favoriteList: ArticleSimple[] = [];

    constructor(){
        makeObservable({
            info: observable,
            noteList: observable,
            collectionList: observable,
            favoriteList: observable
        });
    }

    public requestProfileInfo(){
        Promise.all([
            this.requestNoteList(),
            this.requestCollectionList(),
            this.requestFavoriteList(),
            this.requestProfile()
        ]);

        return;
    }

    public requestProfile(){
        try{
            request("accountInfo", {}).then(response => {
                const { data } = response;
                runInAction(() => {
                    this.info = data;
                });
                return;
            })
            .catch(error => {
                console.error(error);
                return;
            });
        }
        catch (e: unknown){
            console.error(e);
        }
        return;

    }

    public requestNoteList(){
        try{
            request("noteList", {}).then(response => {
                const { data } = response;
                runInAction(() => {
                    this.noteList = data;
                });
                return;
            })
            .catch(error => {
                console.error(error);
                return;
            });
        }
        catch (e: unknown){
            console.error(e);
        }
        return;
    }

    public requestCollectionList(){
        try{
            request("collectionList", {}).then(response => {
                const { data } = response;
                runInAction(() => {
                    this.collectionList = data;
                });
                return;
            })
            .catch(error => {
                console.error(error);
                return;
            });
        }
        catch (e: unknown){
            console.error(e);
        }
        return;
    }

    public requestFavoriteList(){
        try{
            request("favoriteList", {}).then(response => {
                const { data } = response;
                runInAction(() => {
                    this.favoriteList = data;
                });
                return;
            })
            .catch(error => {
                console.error(error);
                return;
            });
        }
        catch (e: unknown){
            console.error(e);
        }
        return;
    }

}