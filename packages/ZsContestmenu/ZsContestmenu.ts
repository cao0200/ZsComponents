interface LabeledItem {
    label: string;
    [key: string]: any; // 允许包含任意其他属性
}
export interface ContextmenuPops {
    menuData: LabeledItem[],
    backgroundColor?: string,
    hoverColor?: string,
    contentColor?: string,
    transformTime?: string | number,
}
