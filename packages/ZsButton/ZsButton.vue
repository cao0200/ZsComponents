<script setup lang="ts">

import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import type {ButtonUiProps} from './ZsButton'

const props = defineProps<ButtonUiProps>()


let _classStyle = {
    '--borderColor': props.borderColor || 'rgb(104, 253, 114)',
    '--buttonWidth': props.buttonWidth || '100px',
    '--buttonBackgroundColor': props.buttonBackgroundColor || 'rgb(200, 200, 200)',
}

if (typeof props.buttonWidth === 'number') {
    _classStyle['--buttonWidth'] = props.buttonWidth + 'px'
}

let _type = ref()

let _flag = ref(true)

watch(() => props.type, (newValue) => {
    if (newValue !== 'flowBorder' && newValue !== 'flowMouse' && newValue !== 'hoverBorder') {
        _type.value = 'hoverBorder'
    } else {
        _type.value = props.type
    }
    if (_type.value === 'flowMouse') {
        _flag.value = false
    }
}, {
    immediate: true,
})

function getFlowMouse(e: MouseEvent) {
    let x = e.clientX - flowMouse.value.offsetLeft
    let y = e.clientY - flowMouse.value.offsetTop
    flowMouse.value.style.setProperty('--x', x + 'px')
    flowMouse.value.style.setProperty('--y', y + 'px')
    console.log(x, y)
}

const flowMouse = ref()
onMounted(() => {
    flowMouse.value = document.querySelector('.flowMouse')
    if (flowMouse.value) {
        flowMouse.value.addEventListener('mousemove', getFlowMouse)
    }
})

onBeforeUnmount(() => {
    if (flowMouse.value) {
        flowMouse.value.removeEventListener('mousemove', getFlowMouse)
    }
})
</script>

<template>
    <div :class="_type" :style="_classStyle">
        <div v-if="_flag"></div>
        <div :class="_type === 'flowMouse' ? 'flowMouseIndex' : _type === 'hoverBorder' ? 'hoverBorderIndex' : ''">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="less">
// 宽高比例 5/2
// 圆角为宽度的 1/5

// 按钮背景颜色
@buttonBackgroundColor: var(--buttonBackgroundColor);
// 边框颜色
@borderColor: var(--borderColor);
// 按钮高度
@buttonWidth: var(--buttonWidth);

@keyframes moving {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.hoverBorder {
  border-radius: calc(@buttonWidth / 10);
  color: white;
  position: relative;
  box-sizing: border-box;

  &:hover::after {
    transform: scale(1, 1);
  }

  &::after,
  &::before {
    content: '';
    position: absolute;
    box-sizing: border-box;
  }

  &::before {
    top: 4px;
    left: 4px;
    width: calc(@buttonWidth - 8px);
    height: calc(@buttonWidth * 2 / 5 - 8px);
    border-radius: calc(@buttonWidth / 10);
    background: linear-gradient(to bottom right, #6e6e6e, #000000);
  }

  &::after {
    top: 0;
    left: 0;
    width: calc(@buttonWidth);
    height: calc(@buttonWidth * 2 / 5);
    border-radius: calc(@buttonWidth / 11);
    transform: scale(.85, .82);
    z-index: -1;
    border: 2px solid black;
    transition: all .1s;
  }

  .hoverBorderIndex {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    z-index: 100;
  }
}

.flowMouse,
.flowBorder,
.hoverBorder {
  cursor: pointer;
  width: @buttonWidth;
  height: calc(@buttonWidth * 2 / 5);
  line-height: calc(@buttonWidth * 2 / 5);
  text-align: center;
  background: transparent;
}

.flowMouse,
.flowBorder {
  border-radius: calc(@buttonWidth / 5);
}

// 鼠标按钮
.flowMouse {
  transition: .5s, top 0s, left 0s;
  position: relative;
  overflow: hidden;
  background-color: @buttonBackgroundColor;
  opacity: 1;

  &:hover {
    text-shadow: 0 0 15px var(--borderColor), 0 0 40px var(--borderColor);
    color: var(--borderColor);
  }

  &:hover::before {
    opacity: 1;
  }

  &::after,
  &::before {
    content: '';
    position: absolute;
  }

  &::after {
    inset: 2px;
    border-radius: calc(@buttonWidth / 5);
    background-color: @buttonBackgroundColor;
    opacity: .8;
  }

  &::before {
    top: var(--y);
    left: var(--x);
    transform: translate(-50%, -50%);
    width: @buttonWidth;
    height: @buttonWidth;
    background: radial-gradient(var(--borderColor), transparent, transparent);
    opacity: 0;
  }
}

.flowMouseIndex {
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  z-index: 10000;
  color: black;
}

// 默认按钮
.flowBorder {
  position: relative;
  background: transparent;
  overflow: hidden;
  border: 0;

  span {
    user-select: none;
  }

  &::after,
  &::before {
    content: '';
    position: absolute;
  }

  div {
    position: absolute;
    z-index: 0;
  }

  div,
  &::after {
    border-radius: calc(@buttonWidth / 5);
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    left: 2px;
    top: 2px;
  }

  &::after {
    opacity: 1;
    background-color: @buttonBackgroundColor;
    z-index: -1;
    transition: all .5s;
  }

  &::before {
    animation-duration: 1s;
    animation-name: moving;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    transform-origin: left top;
    background-color: @borderColor;
    left: 50%;
    top: 50%;
    width: 200%;
    height: 200%;
    z-index: -3;
  }
}
</style>