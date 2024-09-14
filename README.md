# ZsComponents

A Vue + TS based component library

## [npm](https://blog.csdn.net/c1985315356/category_12751539.html)

# 主要亮点组件

## ZsContextmenu

一个右键菜单的组件，可以通过传参修改右键菜单的内容\
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

一个鼠标样式组件，目前包含两种样式，非常有意思

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

一个类似mac dock的tab切换组件，动画效果很流畅

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

# 最后

感兴趣的小伙伴可以拉下来直接使用，也可以通过npm进行安装使用\
文档目前正在积极制作中
