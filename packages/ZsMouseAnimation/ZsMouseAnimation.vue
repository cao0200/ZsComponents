<script setup lang="ts">
// 父传子
import {onMounted, onUnmounted, ref, watch} from "vue";
import ArrowPointer from "./MouseClass"
import type {mouseAnimationProps} from "./ZsMouseAnimation"

const props = withDefaults(defineProps<mouseAnimationProps>(), {
    isTran: false,
    mouseStyle: 'triangle',
    isRotation: false,
    rotationAngle: 0,
    isClickStyle: false,
    clickColor: 'skyblue',
    mouseSize: ''
})

// 鼠标样式
const mouseSize = ref('')
watch(() => props.mouseSize, newVal => {
    mouseSize.value = newVal === 'large' ? '25px' : newVal === 'small' ? '15px' : '20px'
}, {
    deep: true,
    immediate: true
})

// 鼠标样式标识符
const triangleFlag = ref(false)
const planeFlag = ref(false)
watch(() => props.mouseStyle, newVal => {
    if (newVal !== 'triangle' && newVal !== 'plane' && newVal !== 'none') {
        triangleFlag.value = true
    } else {
        triangleFlag.value = newVal === 'triangle'
        planeFlag.value = newVal === 'plane'
    }
}, {
    deep: true,
    immediate: true
})

// 大盒子
const mouseAnimation = ref()
// svg元素
const cursor = ref()
// 鼠标标识符
const flag = ref(false)
// 鼠标DOM元素
const cursorBox = ref()

onMounted(() => {
    // 获取根元素html
    if (triangleFlag.value || planeFlag.value) {
        cursor.value = new ArrowPointer(props.isTran, mouseSize.value, cursorBox.value, props.isRotation, props.rotationAngle)
    }
    if (props.isClickStyle) {
        mouseAnimation.value.addEventListener('click', getClickClass)
    }
})

function getClickClass(e: MouseEvent) {
    const div = document.createElement('div')
    div.style.cssText = `
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid ${props.clickColor};
            position: fixed;
            top: ${e.clientY}px;
            left: ${e.clientX}px;
            transform: translate(-50%, -50%);
            `
    div.className = '___animation'
    mouseAnimation.value.appendChild(div)
    div.addEventListener('animationend', function () {
        mouseAnimation.value.removeChild(div)
    })
}

function mouseLeave() {
    flag.value = false
}

function mouseEnter() {
    flag.value = true
}

function mouseMove(event: Event) {
    if (cursor.value) {
        cursor.value.move(event)
    }
}

onUnmounted(() => {
    if (mouseAnimation.value) {
        mouseAnimation.value.removeEventListener('mousemove', mouseMove, true)
        mouseAnimation.value.removeEventListener('mouseenter', mouseEnter, true)
        mouseAnimation.value.removeEventListener('mouseleave', mouseLeave, true)
    }
    if (props.isClickStyle) {
        if (mouseAnimation.value) {
            mouseAnimation.value.removeEventListener('click', getClickClass)
        }
    }
})

const mouseSlot = ref()
</script>

<template>
    <div ref="mouseAnimation" class="mouse_animation_box" @mousemove.stop="mouseMove" @mouseenter.stop="mouseEnter"
         @mouseleave.stop="mouseLeave">
        <slot></slot>
        <slot name="mouseSlot" :mouseSlot="mouseSlot"></slot>
        <Teleport to="body">
            <div class="cursor-arrow-pointer" ref="cursorBox">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" v-show="flag" v-if="triangleFlag">
                    <path class="inner"
                          d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z"
                          fill="#F2F5F8"/>
                    <path class="outer"
                          d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z"
                          fill="#111920"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" v-show="flag" v-if="planeFlag">
                    <g id="Layer_1">
                        <path stroke="#000" id="svg_4"
                              d="m15.94893,0.10092c-0.33821,0 -0.63911,0.13705 -0.89299,0.38566c-0.25367,0.2484 -0.46349,0.60433 -0.63809,1.04886c-0.34915,0.88893 -0.56392,2.13766 -0.6814,3.63314c-0.11725,1.4926 -0.13701,3.2306 -0.0883,5.09109c-4.1777,1.69188 -12.65086,5.18515 -13.33151,5.96513c-0.90622,1.03845 -0.61342,2.22857 -0.24824,3.01862l13.92961,-2.79876c0.29444,3.64726 0.71309,7.25968 1.07791,10.09029c-1.36223,0.39357 -3.90508,1.17068 -4.42995,1.65257c-0.72306,0.66385 -0.72305,2.80775 -0.72305,2.80775l5.70113,-0.45774c0.13427,0.92413 0.21825,1.46335 0.21825,1.46335l0.00833,0.04866l0.04498,0l0.10496,0l0.04498,0l0.00833,-0.04866c0,0 0.08381,-0.53923 0.21825,-1.46335l5.7028,0.45774c0,0 0.00001,-2.1439 -0.72305,-2.80775c-0.52507,-0.48208 -3.06977,-1.26096 -4.43162,-1.65439c0.36407,-2.82192 0.78198,-6.42052 1.07625,-10.05603l13.76635,2.76631c0.36518,-0.79005 0.65965,-1.98017 -0.24657,-3.01862c-0.67224,-0.77032 -8.94065,-4.1859 -13.16991,-5.90026c0.05053,-1.88461 0.03196,-3.64629 -0.08663,-5.15597l0,-0.0036c-0.11754,-1.49383 -0.33254,-2.74135 -0.6814,-3.62954c-0.17455,-0.4444 -0.38266,-0.80037 -0.63642,-1.04886c-0.25388,-0.2486 -0.55478,-0.38566 -0.89299,-0.38566l-0.00001,0z"
                              fill="#fff"/>
                    </g>
                </svg>
            </div>
        </Teleport>
    </div>
</template>

<style lang="less">
@keyframes ___identifier {
  0% {
    transform: translate(-50%, -50%) scale(1, 1);
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -50%) scale(4, 4);
    opacity: 0;
  }
}

.___animation {
  animation: ___identifier 2s 1;
  animation-fill-mode: forwards;
}
</style>
<style scoped lang="less">
.mouse_animation_box {
  cursor: none;

  .mouse {
    transform-origin: center top;

    .mouseSvg {
      display: none;
      transform: translate() rotate();
    }
  }
}
</style>