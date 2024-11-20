export interface SideBarRef{
    show: () => void;
    hide: () => void;
}

export type BarBottomItem = {
    readonly icon: string,
    readonly text: string,
};