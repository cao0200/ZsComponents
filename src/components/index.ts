// index.ts
//index.ts
import type {App} from 'vue'
import ZsButton from './ButtonUiPage'
import ZsContestmenu from './ContextmenuPage'
import ZsLoadBall from './LoadBallPage'
import ZsMouseAnimation from './MouseAnimationPage'
import ZsToTop from './ToTopPage'
// 所有组件列表
const components = [
    ZsButton,
    ZsContestmenu,
    ZsLoadBall,
    ZsMouseAnimation,
    ZsToTop
]

// 定义 install 方法
const install = (app: App): void => {
    components.forEach(component => app.component(component.__name as string, component))
}

export {
    ZsButton,
    ZsContestmenu,
    ZsLoadBall,
    ZsMouseAnimation,
    ZsToTop
}

const VueTestUI = {
    install
}

export default VueTestUI

declare module "vue" {
    export interface GlobalComponents {
        ZsButton: typeof ZsButton,
        ZsContestmenu: typeof ZsContestmenu,
        ZsLoadBall: typeof ZsLoadBall,
        ZsMouseAnimation: typeof ZsMouseAnimation,
        ZsToTop: typeof ZsToTop,
    }
}