import type { App } from 'vue'
// @ts-ignore
import ZsTabPane from "./ZsTabPane.vue"

// 使用install方法，在app.use挂载
ZsTabPane.install = (app: App) => {
    app.component(ZsTabPane.__name as string, ZsTabPane) //注册组件
}

export default ZsTabPane

