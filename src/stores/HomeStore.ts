import { makeAutoObservable, runInAction } from "mobx";
import { ArticleSimple } from "./types";
import {Category} from "../components/home_category_list/types";
import request from "../utils/Requests";
import {load} from "../utils/Storage";

const DEFAULT_CATEGORY_LIST: Category[] = [
  // 默认添加频道
  { name: "recommend", default: true, isAdd: true },
  { name: "video", default: true, isAdd: true },
  { name: "livestream", default: true, isAdd: true },
  { name: "photograph", default: false, isAdd: true },

  { name: "outfit", default: false, isAdd: true },
  { name: "read", default: false, isAdd: true },
  { name: "video", default: false, isAdd: true },
  { name: "technology", default: false, isAdd: true },

  { name: "fitness", default: false, isAdd: true },
  { name: 'science', default: false, isAdd: true },
  { name: "food", default: false, isAdd: true },
  { name: "emotion", default: false, isAdd: true },

  { name: "dance", default: false, isAdd: true },
  { name: "learn", default: false, isAdd: true },
  { name: "man", default: false, isAdd: true },
  { name: "joke", default: false, isAdd: true },

  { name: "car", default: false, isAdd: true },
  { name: "career", default: false, isAdd: true },
  { name: "sport", default: false, isAdd: true },
  { name: "trip", default: false, isAdd: true },

  { name: "music", default: false, isAdd: true },
  { name: "skin", default: false, isAdd: true },
  { name: "anime", default: false, isAdd: true },
  { name: "game", default: false, isAdd: true },

  { name: "decoration", default: false, isAdd: false },
  { name: "mood", default: false, isAdd: false },
  { name: "outdoors", default: false, isAdd: false },
  { name: "handmade", default: false, isAdd: false },

  { name: "slim", default: false, isAdd: false },
  { name: 'campus', default: false, isAdd: false },
  { name: "society", default: false, isAdd: false },
  { name: "camping", default: false, isAdd: false },

  { name: "culture", default: false, isAdd: false },
  { name: "motorcycle", default: false, isAdd: false },
  { name: "art", default: false, isAdd: false },
  { name: "marriage", default: false, isAdd: false },

  { name: "Home", default: false, isAdd: false },
  { name: "baby", default: false, isAdd: false },
  { name: 'paintings', default: false, isAdd: false },
  { name: "wallpaper", default: false, isAdd: false },

  { name: "avatar", default: false, isAdd: false },
];

export default class HomeStore {
  private page: number = 1;
  private size: number = 10;

  public homeList: ArticleSimple[] = [];
  public isRefreshing: boolean = false;
  public hasMoreData: boolean = true;
  public categoryList: Category[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public resetPage() {
    runInAction(() => {
      this.page = 1;
      this.hasMoreData = true;
    });
  }

  public async requestHomeList() {
    if (this.isRefreshing || !this.hasMoreData) {
      return;
    }

    try {
      runInAction(() => {
        this.isRefreshing = true;
      });
      const params = {
        page: this.page,
        size: this.size,
      };

      const { data } = await request("homeList", params);

      runInAction(() => {
        if (data?.length) {
          if (this.page === 1) {
            this.homeList = data;
          } else {
            this.homeList = this.homeList.concat(data);
          }
          this.page = this.page + 1;
        } else {
          if (this.page === 1) {
            this.homeList = [];
          }
          this.hasMoreData = false; // No more data to load
        }
      });
    } catch (e: any) {
      console.log(e);
    } finally {
      runInAction(() => {
        this.isRefreshing = false;
      });
    }
  }

  public get refresh() {
    return this.isRefreshing;
  }

  public getCategoryList(){
    load("categoryList").then(data => {
      if (data){
        const cacheList = JSON.parse(data);
        if (cacheList ?.length){
          runInAction(() => {
            this.categoryList = cacheList;
          });
        }

        else{
          runInAction(() => {
            this.categoryList = DEFAULT_CATEGORY_LIST;
          });
        }
      }
      else{
        runInAction(() => {
          this.categoryList = DEFAULT_CATEGORY_LIST;
        });
      }
    });
  }
}
