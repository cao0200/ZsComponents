import type { App } from 'vue'
// @ts-ignore
import ZsTab from "./ZsTab.vue"

// 使用install方法，在app.use挂载
ZsTab.install = (app: App) => {
    app.component(ZsTab.__name as string, ZsTab) //注册组件
}

export default ZsTab

