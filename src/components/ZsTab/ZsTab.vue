<script setup lang="ts">
import {onMounted, reactive, ref, useSlots, watch} from "vue";
import type {ZsTabTs} from "@/components/ZsTab/ZsTab";
import {createCurve} from "@/components/ZsTab/baseCurve";

const slots = useSlots()
const tabs = ref([])
slots.default?.().filter(item => {
    if (item.type['__name'] !== 'ZsTabPane') {
        throw new Error('ZsTab needs to be used with the ZsTabPane component')
    } else {
        tabs.value.push(item)
    }
})

const emit = defineEmits<{
    (e: 'update:activeName', activeName): void
}>()
const props = defineProps<ZsTabTs>()
const maxScale = ref(1.5)
const _styleObj = reactive({
    '--backgroundColor': 'rgba(111, 111, 111, .2)'
})
watch(() => props, newVal => {
    if (newVal.TabMagnification != undefined) {
        maxScale.value = newVal.TabMagnification
    }
    if (newVal.TabColor != undefined) {
        _styleObj['--backgroundColor'] = newVal.TabColor
    }
}, {
    deep: true,
    immediate: true
})

const ZsTabBox = ref(null)
const range = 300

function changeX(e) {
    if (props.isTrans) {
        const curve = createCurve(range, e.clientX, 1, maxScale.value)
        layout(curve)
    }
}

function layout(curve) {
    const arr = []
    for (const item of ZsTabBox.value.children) {
        const rect = item.getBoundingClientRect()
        const x = rect.x + rect.width / 2
        const scale = curve(x)
        arr.push(scale)
        item.style.setProperty('--ZsBlowUp', scale)
    }
}

function resetX() {
    layout(() => 1)
}

function clickTabPane(e) {
    getClassName(e.target)
}

function getClassName(item) {
    if (item.className.includes('ZsBigTabPane')) {
        if (item.ariaDisabled === 'true') return
        emit('update:activeName', item.id)
        changeZsTabBoxClass(item.id)
    } else {
        getClassName(item.parentElement)
    }
}

// 添加类名
onMounted(() => {
    changeZsTabBoxClass(props.activeName, true)
})

function changeZsTabBoxClass(activeName, styleFlag = false) {
    const flag = ref(true)
    for (const item of ZsTabBox.value.children) {
        if (styleFlag) {
            item.style.setProperty('--ZsBlowUp', '1')
        }
        item.classList.remove('ZsReveal')
        if (item.id === activeName) {
            item.classList.add('ZsReveal')
            flag.value = false
        }
    }
    if (flag.value) {
        throw new Error('The parameter of activeName was passed incorrectly')
    }
}
</script>

<template>
    <div class="ZsTab" @mousemove="changeX" @mouseleave="resetX" :style="_styleObj" @click="clickTabPane">
        <div class="ZsTabBox" ref="ZsTabBox">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="less">
.ZsTab {
  @backgroundColor: var(--backgroundColor);
  position: fixed;
  left: 50%;
  bottom: 40px;
  height: 85px;
  border-radius: 5px;
  transform: translateX(-50%);
  background-color: @backgroundColor;

  .ZsTabBox {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    padding: 0 5px;
    justify-content: space-evenly;
    box-sizing: border-box;
  }
}
</style>