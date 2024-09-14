import type { App } from 'vue'
import ZsContestmenu from "./ContextmenuPage.vue"

// 使用install方法，在app.use挂载
ZsContestmenu.install = (app: App) => {
    app.component(ZsContestmenu.__name as string, ZsContestmenu) //注册组件
}

export default ZsContestmenu

