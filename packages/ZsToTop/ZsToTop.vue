<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";
import type { ToTopPageProps} from "./ZsToTop";

const props = withDefaults(defineProps<ToTopPageProps>(), {
    backgroundColor: 'black',
    visibilityHeight: 200,
    isReversion: false,
    right: 40,
    bottom: 40,
    animationStyle: 'opacity'
})

const emit = defineEmits<{
    (e: 'click', click: object): void
}>()

const setStyle = ref<{
    'border-bottom-color': string,
    top?: string,
    right?: string,
    bottom?: string,
    left?: string,
    opacity?: string,
    transform?: string
}>({
    'border-bottom-color': props.backgroundColor,
})

// 监听属性left > right;top > bottom
watch(() => props.top, newVal => {
    if (newVal) {
        setStyle.value.top = newVal + 'px'
    } else {
        setStyle.value.bottom = props.bottom + 'px'
    }
}, {
    deep: true,
    immediate: true
})

watch(() => props.left, newVal => {
    if (newVal) {
        setStyle.value.left = newVal + 'px'

    } else {
        setStyle.value.right = props.right + 'px'
    }
}, {
    deep: true,
    immediate: true
})

if (!props.isReversion && window.scrollY < props.visibilityHeight) {
    setStyle.value.opacity = '0'
}

if (props.isReversion && window.scrollY < props.visibilityHeight) {
    setStyle.value.transform = 'rotate(180deg)'
}

// 点击事件
function handleClick(e: MouseEvent) {
    emit('click', e)
    if (window.scrollY > props.visibilityHeight) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: "smooth",
        });
    }
}

onMounted(() => {
    window.addEventListener('scroll', getScroll)
})

function getScroll() {
    if (!props.isReversion) {
        if (props.animationStyle === 'translate') {
            let tranX
            if (props.left) {
                tranX = -50 - props.left
            } else {
                tranX = 50 + props.right
            }
            setStyle.value.transform = window.scrollY > props.visibilityHeight ? '' : `translateX(${tranX}px)`
        }
        setStyle.value.opacity = window.scrollY > props.visibilityHeight ? '1' : '0'
    } else {
        setStyle.value.transform = window.scrollY > props.visibilityHeight ? 'rotate(0deg)' : 'rotate(180deg)'
    }
}

onUnmounted(() => {
    window.removeEventListener('scroll', getScroll)
})
</script>

<template>
    <div class="toTop" @click="handleClick" :style="setStyle">
        <div class="up"></div>
    </div>
</template>

<style scoped lang="less">
.toTop {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  line-height: 50px;
  text-align: center;
  position: fixed;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  bottom: 60px;
  right: 60px;
  z-index: 999;
  transition: all .5s;

  .up {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -75%);
    margin: 0 auto;
    z-index: 1000;
  }
}
</style>