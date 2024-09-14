import type { App } from 'vue'
// @ts-ignore
import ZsContestmenu from "./ZsContestmenu.vue"

// 使用install方法，在app.use挂载
ZsContestmenu.install = (app: App) => {
    app.component(ZsContestmenu.__name as string, ZsContestmenu) //注册组件
}

export default ZsContestmenu

