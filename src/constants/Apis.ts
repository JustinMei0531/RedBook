// Define your Apis object
const Apis: ApiEndpoints = {
  login: {
    url: "/user/login",
    method: "GET",
  },
  homeList: {
    url: "/home/homeList",
    method: "GET"
  },
  articleDetail: {
    url: "/article/articleDetail",
    method: "GET"
  },
  goodsList: {
    url: "/goods/goodsList",
    method: "GET"
  },
  top10Category: {
    url: "/goods/top10Category",
    method: "GET"
  },
  messageList: {
    url: "/message/messageList",
    method: "GET"
  },
  unRead: {
    url: "/message/unread",
    method: "GET"
  },
  accountInfo: {
    url: "/mine/accountInfo",
    method: "GET"
  },
  noteList: {
    url: "/mine/noteList",
    method: "GET"
  },
  collectionList: {
    url: "/mine/collectionList",
    method: "GET"

  },
  favoriteList: {
    url: "/mine/favorateList",
    method: "GET"
  },
};

export default Apis;
