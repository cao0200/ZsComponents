import type { MouseClassPosition } from "@/components/MouseAnimationPage/MouseAnimationPage";
export default class ArrowPointer {
    root
    cursor: HTMLDivElement
    position
    previousPointerX
    previousPointerY
    angle
    previousAngle
    angleDisplace
    degrees
    cursorSize
    cursorStyle
    distance: number | undefined
    isRotation: boolean
    rotationAngle: number

    constructor(flag = false, cursorSize: string, cursorBox: HTMLDivElement, isRotation: boolean, rotationAngle: number) {
        // 修改根元素
        this.root = document.body
        // 鼠标DOM
        this.cursor = cursorBox
        this.isRotation = isRotation
        this.rotationAngle = rotationAngle
        this.position = {
            distanceX: 0,
            distanceY: 0,
            distance: 0,
            pointerX: 0,
            pointerY: 0,
        }

        this.previousPointerX = 0
        this.previousPointerY = 0
        this.angle = 0
        // 上一个角度
        this.previousAngle = 0
        // 偏移的角度
        this.angleDisplace = 0
        // 角度
        this.degrees = 57.296
        // 鼠标大小
        this.cursorSize = cursorSize
        // 鼠标样式
        if (flag) {
            this.cursorStyle = {
                boxSizing: 'border-box',
                position: 'fixed',
                transform: 'translate(-50%, -50%)',
                zIndex: '2147483647',
                width: this.cursorSize,
                height: this.cursorSize,
                userSelect: 'none',
                pointerEvents: 'none',
                transition: '250ms, transform 100ms',
            }
        } else {
            this.cursorStyle = {
                boxSizing: 'border-box',
                position: 'fixed',
                transform: 'translate(-50%, -50%)',
                zIndex: '2147483647',
                width: this.cursorSize,
                height: this.cursorSize,
                userSelect: 'none',
                pointerEvents: 'none',
            }
        }
        // 把  鼠标DOM元素、鼠标样式  传到函数中
        this.init(this.cursor, this.cursorStyle)
    }

    init(el: HTMLDivElement, style: object) {
        // Object.assign 合并对象
        Object.assign(el.style, style)
        // 5毫秒后移出hidden(即移出隐藏)
        setTimeout(() => {
            this.cursor.removeAttribute("hidden")
        }, 500)
        // 显示鼠标
        this.cursor.style.opacity = '1'
    }

    move(event: MouseEvent):void {
        // 获取鼠标位置信息
        this.previousPointerX = this.position.pointerX
        this.previousPointerY = this.position.pointerY
        this.position.pointerX = event.pageX - this.root.getBoundingClientRect().x
        this.position.pointerY = event.pageY
        this.position.distanceX = this.previousPointerX - this.position.pointerX
        this.position.distanceY = this.previousPointerY - this.position.pointerY
        // 获取角度
        this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2)
        // this.position.pointerX 水平方向   this.position.pointerY 垂直方向
        this.cursor.style.transform = `translate( ${this.position.pointerX}px, ${this.position.pointerY}px) rotate(${this.rotationAngle}deg)`

        if (this.distance > 1) {
            this.rotate(this.position)
        } else {
            if (this.isRotation) {
                this.cursor.style.transform += ` rotate(${this.angleDisplace}deg)`
            }
        }
    }

    rotate(position: MouseClassPosition) {
        const unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees
        const style = this.cursor.style
        this.previousAngle = this.angle

        if (position.distanceX <= 0 && position.distanceY >= 0) {
            this.angle = 90 - unsortedAngle
        } else if (position.distanceX < 0 && position.distanceY < 0) {
            this.angle = unsortedAngle + 90
        } else if (position.distanceX >= 0 && position.distanceY <= 0) {
            this.angle = 90 - unsortedAngle + 180
        } else if (position.distanceX > 0 && position.distanceY > 0) {
            this.angle = unsortedAngle + 270
        }

        if (isNaN(this.angle)) {
            this.angle = this.previousAngle
        } else {
            if (this.angle - this.previousAngle <= -270) {
                this.angleDisplace += 360 + this.angle - this.previousAngle
            } else if (this.angle - this.previousAngle >= 270) {
                this.angleDisplace += this.angle - this.previousAngle - 360
            } else {
                this.angleDisplace += this.angle - this.previousAngle
            }
        }
        style.left = `${-this.cursorSize / 2}px`
        style.top = `${0}px`
        if (this.isRotation) {
            style.transform += ` rotate(${this.angleDisplace}deg)`
        }
    }

    hidden() {
        this.cursor.style.opacity = '0'
        setTimeout(() => {
            this.cursor.setAttribute("hidden", "hidden")
        }, 500)
    }
}
