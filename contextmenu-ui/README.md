# 一个基于VUE3 + TS的组件库

<span style="color:pink;font-size:20px;font-weight:700;">0.0.32版本新增了一个tab切换组件，类似mac dock的效果</span>

## 安装指令

```sh
npm i contextmenu-ui
```

# [如何使用](https://blog.csdn.net/c1985315356/category_12751539.html)

# 如何引用

## 全局引用

在0.0.33版本全局引用的引用函数进行了修改

````javascript
// main.js

import App from './App.vue'
import ZsComponents from 'contextmenu-ui/dist/contextmenu-ui.umd.cjs'
import 'contextmenu-ui/dist/index.css'

const app = createApp(App)
app.use(ZsComponents);
````

## 局部引用

需要先在main.js中引入css样式

````javascript
// main.js
import 'contextmenu-ui/dist/index.css'

// 在其他页面引入所需组件
import {ZsButton} from 'contextmenu-ui'
````

# 组件介绍

目前有6个组件，进行了作者觉得相对有趣且有趣的一些封装：\
按钮：ZsButton\
加载球：ZsLoadBall\
回到顶部：ZsToTop\
菜单：ZsContextmenu\
鼠标效果：ZsMouseAnimation\
Tab切换：ZsTab & ZsTabPane\
\
这个库也可以称为 <span style="color: red;font-size:20px">张三的组件库</span> ，哈哈~

## ZsContextmenu

这可是整个组件库最重要的组件了，也许也是最有用的，当然还是耗费心血最多的\
<span style="color:red;">注：如全局使用此组件可在app.vue中进行使用</span>

### 参数

|          类名          | 是否必选 |              类型               |                 示例                  |
|:--------------------:|:----:|:-----------------------------:|:-----------------------------------:|
|    menuData 菜单数据     |  必选  |            object             | [{ label: '添加'}] (每个对象中必须包含label属性) |
| backgroundColor 背景颜色 |  可选  |            string             |
|  hoverColor 鼠标选中后颜色  |  可选  |            string             |
|  contentColor 文本颜色   |  可选  |            string             |
| transformTime 动画过渡时长 |  可选  | string/number 单位为s,不传参则默认没有动画 |

### 事件

|       事件名       |   返回值   |
|:---------------:|:-------:|
| getLabel 获取菜单数据 | 选中的对象内容 | 

### 插槽

|   插槽名   | 作用 |
|:-------:|:--:|
| default |    | 

## ZsMouseAnimation

这个组件则是其次重要的了，相比也更加有趣一些\
<span style="color:red;font-size:20px;">这个也许是更加需要改进的一个组件，如有建议或问题最后也会留下留言方式</span>

### 参数

|          类名          | 是否必选 |   类型    |           示例           |
|:--------------------:|:----:|:-------:|:----------------------:|
|    mouseSize 鼠标大小    |  可选  | string  | large / small / 或者不传参  |
|   mouseStyle 鼠标样式    |  可选  | string  |   triangle 默认/ plane   |
|    isTran 是否包含动画     |  可选  | boolean |        true 默认         |
| isRotation 鼠标是否跟随旋转  |  可选  | boolean |        false 默认        |
| rotationAngle 鼠标旋转角度 |  可选  | number  | 当isRotation为false时才可传参 |
| isClickStyle 鼠标点击效果  |  可选  | boolean |        false 默认        |
| clickColor 鼠标点击效果的颜色 |  可选  | string  |

### 插槽

|   插槽名   | 作用 |
|:-------:|:--:|
| default |    | 

<span style="color:red;font-size:24px;">此组件可以和ZsContextmenu组件同时使用，建议ZsContextmenu嵌套此组件使用</span>

## ZsTap

### 参数

|              类名               | 是否必选 |   类型    |    示例    |
|:-----------------------------:|:----:|:-------:|:--------:|
| activeName 对应ZsTabPane的name属性 |  必选  | string  |          |
|   TabMagnification 动画的放大倍数    |  可选  | number  |  1.5 默认  |
|         TabColor 背景颜色         |  可选  | string  |          |
|         isTrans 动画效果          |  可选  | boolean | false 默认 |

### 插槽

|   插槽名   |     作用      |
|:-------:|:-----------:|
| default | ZsTabPane组件 | 

## ZsTabPane

### 参数

|            类名             | 是否必选 |   类型    |    示例    |
|:-------------------------:|:----:|:-------:|:--------:|
| name 对应ZsTab的activeName属性 |  必选  | string  |          |
|           title           |  可选  | string  |          |
|        disabled 禁用        |  可选  | boolean | false 默认 |

### 插槽

|   插槽名   |  作用  |
|:-------:|:----:|
| default | 填充内容 | 

## ZsToTop

### 参数

|            类名             | 是否必选 |   类型    |                      示例                      |
|:-------------------------:|:----:|:-------:|:--------------------------------------------:|
|           right           |  可选  | number  |                    40 默认                     |
|           left            |  可选  | number  |                  优先级高于right                  |
|          bottom           |  可选  | number  |                    40 默认                     |
|            top            |  可选  | number  |                 优先级高于bottom                  |
| visibilityHeight 滚动值到此则显示 |  可选  | number  |                    200 默认                    |
|   isReversion 按钮是否一直存在    |  可选  | boolean | false 默认(若改为true,visibilityHeight效果为到此值转换方向) |
|    animationStyle 过渡效果    |  可选  | string  |            opacity 默认/ translate             |
|    backgroundColor 颜色     |  可选  | string  |

### 事件

貌似妹什么用

|  事件名  |  返回值   |
|:-----:|:------:|
| click | 返回内置函数 | 

## ZsButton

### 参数(0.0.31版本新增type属性，修改边框宽度属性，且删除了文本颜色属性，解决了flowMouse按钮出现的问题)

个人感觉新增的hoverBorder这个按钮很帅

|              类名              | 是否必选 |          类型          |                   示例                    |
|:----------------------------:|:----:|:--------------------:|:---------------------------------------:|
|           type 类型            |  可选  |        string        | flowBorder 默认 / flowMouse / hoverBorder |
|       borderColor 边框颜色       |  可选  |        string        |
| borderBackgroundColor 按钮背景颜色 |  可选  |        string        |
|       buttonWidth 边框宽度       |  可选  | string / number 单位px |

### 插槽(0.0.24版本新增，参数的value属性已删除)

|   插槽名   |    作用     |
|:-------:|:---------:|
| default | 当然是按钮的文字了 | 

## ZsLoadBall

### 参数

|        类名         | 是否必选 |          类型          | 示例 |
|:-----------------:|:----:|:--------------------:|:--:|
|    progress 进度    |  必选  |        number        |
|   loadWidth 宽度    |  可选  | number / string 单位px |
|  loadColor 加载球颜色  |  可选  |        string        |
| contentColor 文本颜色 |  可选  |        string        |

# 最后

<span style="font-size:24px">如果有建议或问题可以[留言](https://blog.csdn.net/c1985315356?spm=1000.2115.3001.5343)欢迎大家哦~</span>