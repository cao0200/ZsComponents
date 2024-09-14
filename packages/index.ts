// index.ts
//index.ts
import type {App} from 'vue'
import ZsButton from './ZsButton'
import ZsContestmenu from './ZsContestmenu'
import ZsLoadBall from './ZsLoadBall'
import ZsMouseAnimation from './ZsMouseAnimation'
import ZsToTop from './ZsToTop'
import ZsTab from "./ZsTab";
import ZsTabPane from "./ZsTabPane";
// 所有组件列表
const components = [
    ZsButton,
    ZsContestmenu,
    ZsLoadBall,
    ZsMouseAnimation,
    ZsToTop,
    ZsTab,
    ZsTabPane
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
    ZsToTop,
    ZsTab,
    ZsTabPane
}

const ZsComponents = {
    install
}
export default ZsComponents