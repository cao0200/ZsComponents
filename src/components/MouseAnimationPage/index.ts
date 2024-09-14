import type { App } from 'vue'
import ZsMouseAnimation from "./MouseAnimationPage.vue"

// 使用install方法，在app.use挂载
ZsMouseAnimation.install = (app: App) => {
    app.component(ZsMouseAnimation.__name as string, ZsMouseAnimation) //注册组件
}

export default ZsMouseAnimation

