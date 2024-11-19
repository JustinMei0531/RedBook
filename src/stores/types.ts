export type ArticleComment = {
    userName: string,
    avatarUrl: string,
    message: string,
    dateTime: string,
    location: string,
    favoriteCount: number,
    isFavorite: number,
    children? : ArticleComment[]
};

export type Article = {
    id: number,
    title: string,
    desc: string,
    tag: string[],
    dateTime: string,
    location: string,
    userId: string,
    userName: string,
    isFollow: boolean,
    avatatUrl: string,
    images: string[],
    favoriteCount: number,
    collectionCount: number,
    isFavorite: boolean,
    isCollection: boolean,
    comments?: ArticleComment[];
};

export type ArticleSimple = {
    id: number,
    title: string,
    userName: string,
    avatarUrl: string,
    favoriteCount: number,
    isFavorite: boolean,
    image: string
};

export type GoodsSimple = {
    id: number;
    title: string;
    image: string;
    price: number;
    originPrice: number | undefined;
    promotion: string | undefined;
};

export type GoodsCategory = {
    id: number;
    name: string;
    image: string
};

export type MessageListItem = {
    id: number;
    avatarUrl: string;
    lastMessage?: string;
    lastMessageTime?: string;
    name: string;
}

export type UnRead = {
    unreadFavorate: number,
    newFollow: number,
    comment: number,
};
