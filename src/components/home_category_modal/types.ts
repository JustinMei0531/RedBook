import {Category} from "../home_category_list/types";

export type homeCategoryModalProps = {
    categoryList: Category[];
};

export interface CategoryModalRef {
    show: () => void;
    hide: () => void;
}
