export type Category = {
    name: string;
    default: boolean;
    isAdd: boolean;
};

export type homeCategoryProps = {
    categoryList: Category[];
    onCategoryChange:(category: Category) => void;
};
