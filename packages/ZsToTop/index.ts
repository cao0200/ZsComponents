import type { App } from 'vue'
import ZsToTop from "./ZsToTop.vue"

// 使用install方法，在app.use挂载
ZsToTop.install = (app: App) => {
    app.component(ZsToTop.__name as string, ZsToTop) //注册组件
}

export default ZsToTop

