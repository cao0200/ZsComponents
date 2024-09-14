export interface mouseAnimationProps {
    // 鼠标的大小(Large '25px',Small '15px',默认 '20px')
    mouseSize?: string,
    // 是否有动画过渡效果
    isTran?: boolean,
    // 选择鼠标样式  三角:triangle(默认)  飞机:plane  使用插槽:none
    mouseStyle?: string,
    // 鼠标是否转动
    isRotation?: boolean,
    // 旋转角度
    rotationAngle?: number,
    // 鼠标点击样式
    isClickStyle?: boolean,
    // 鼠标样式颜色
    clickColor?: string
}

export interface MouseClassPosition {
    distanceX: number,
    distanceY: number,
    distance: number,
    pointerX: number,
    pointerY: number,
}