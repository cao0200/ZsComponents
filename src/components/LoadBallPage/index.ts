import type { App } from 'vue'
import ZsLoadBall from "./LoadBallPage.vue"

// 使用install方法，在app.use挂载
ZsLoadBall.install = (app: App) => {
    app.component(ZsLoadBall.__name as string, ZsLoadBall) //注册组件
}

export default ZsLoadBall

