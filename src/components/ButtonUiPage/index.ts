import type {App} from 'vue'
import ZsButton from "./ZsButton.vue"

// 使用install方法，在app.use挂载
ZsButton.install = (app: App) => {
    app.component(ZsButton.__name as string, ZsButton) //注册组件
}

export default ZsButton

