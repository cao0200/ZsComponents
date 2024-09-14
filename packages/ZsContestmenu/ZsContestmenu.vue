<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";
import type {ContextmenuPops} from './ZsContestmenu'
// 父传子
const props = defineProps<ContextmenuPops>()

let transformTime: (string)

watch(() => props.transformTime, (newVal) => {
    if (typeof newVal === 'number') {
        transformTime = newVal + 's'
        return
    } else if (newVal) {
        if (newVal.substring(newVal.length - 1) === 's') {
            // undefined 不能赋值给 transformTime
            transformTime = newVal
            return
        } else {
            // 如果可以转为纯数字则添加s单位
            if (!isNaN(Number(newVal))) {
                transformTime = newVal + 's'
            } else {
                console.error('transformTime传参错误')
            }
        }
    }
}, {
    deep: true,
    immediate: true
})
// 子传父
const emit = defineEmits<{
    // 修改日历数组
    (e: 'getLabel', getLabel: object): void
}>();

const showValue = ref(false)

// 右键事件
function getMenuDate(e: MouseEvent) {
    _contentBoxStyle.value.left = e.clientX + 'px'
    _contentBoxStyle.value.top = e.clientY + 'px'
    showValue.value = true
}

function changeLabel(item: object) {
    emit('getLabel', item)
}

// 关闭窗口
function closeMenu() {
    showValue.value = false
}

// 监听window
onMounted(() => {
    window.addEventListener('click', closeMenu, true)
    window.addEventListener('contextmenu', closeMenu, true)
})

onUnmounted(() => {
    window.removeEventListener('click', closeMenu, true)
    window.removeEventListener('contextmenu', closeMenu, true)
})

// 动画之前
function handleBeforeEnter(el: any) {
    el.style.height = '0px'
}

// 动画中
function handleEnter(e: any) {
    e.style.height = 'auto';
    const h = e.clientHeight;
    e.style.height = '0px';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            e.style.height = (h - 10) + 'px';
        });
    });
    e.style.transition = transformTime;
}

// 动画之后
function handleAfterEnter(e: any) {
    e.style.transition = 'none';
}

const _contentBoxStyle = ref({
    left: '0px',
    top: '0px',
    '--hoverColor': props.hoverColor ? props.hoverColor : '#77c7ff',
    '--backgroundColor': props.backgroundColor ? props.backgroundColor : 'white',
    '--contentColor': props.contentColor ? props.contentColor : 'black'
})
</script>

<template>
    <div class="contextmenu" @contextmenu.stop.prevent="getMenuDate">
        <slot></slot>
        <Teleport to="body">
            <Transition
                    @before-enter="handleBeforeEnter"
                    @enter="handleEnter"
                    @after-enter="handleAfterEnter"
            >
                <div class="_contentBox" v-if="showValue" :style="_contentBoxStyle" @contextmenu.prevent>
                    <div class="content" v-for="(item,index) in props.menuData" @contextmenu.stop.prevent="changeLabel(item)" :key="index" @click="changeLabel(item)">
                        {{ item.label }}
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped lang="less">
.contextmenu {
  background-color: white;
  width: 90px;
}
</style>
<style lang="less">
._contentBox {
  @hoverColor: var(--hoverColor);
  @backgroundColor: var(--backgroundColor);
  @contentColor: var(--contentColor);

  position: fixed;
  left: 0;
  top: 0;
  background-color: @backgroundColor;
  border-radius: 5px;
  padding: 5px;
  overflow: hidden;
  color: @contentColor;

  .content {
    cursor: pointer;
    width: 90px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
    user-select: none;

    &:hover {
      background-color: @hoverColor;
    }
  }
}
</style>