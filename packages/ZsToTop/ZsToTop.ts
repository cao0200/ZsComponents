export interface ToTopPageProps {
    // 颜色
    backgroundColor?: string
    // 定位信息
    top?: number,
    bottom?: number,
    left?: number,
    right?: number,
    // 滚共高度到此数值才出现
    visibilityHeight?: number,
    // 置底效果(若为true,visibilityHeight的效果为超过此值后调转方向)
    isReversion?: boolean,
    // 过渡动画效果
    animationStyle?: string
}