<script setup lang="ts">
import {ref, useSlots} from "vue";
import {createCurve} from "@/components/ZsTab/baseCurve";

const slots = useSlots()
slots.default?.().filter(item => {
    console.log(item.type['__name'])
})

const middleBox = ref(null)
const range = 300
const maxScale = 1.5

function changeX(e) {
    const curve = createCurve(range, e.clientX, 1, maxScale)
    layout(curve)
}

function layout(curve) {
    for (const item of middleBox.value.children) {
        const rect = item.getBoundingClientRect()
        const x = rect.x + 60 / 2
        const scale = curve(x)
        item.style.setProperty('--i', scale)
    }
}

function resetX() {
    layout(() => 1)
}
</script>

<template>
    <div class="bigBox" @mousemove="changeX" @mouseleave="resetX">
        <div class="middleBox" ref="middleBox">
            <div class="box" :style="{'--i':1}"></div>
            <div class="box" :style="{'--i':1}"></div>
        </div>
    </div>
</template>

<style scoped lang="less">
.bigBox {
  position: fixed;
  bottom: 30px;
  left: 50%;
  height: 80px;
  background-color: pink;
  transform: translateX(-50%);
  border-radius: 5px;
  @i: var(--i);
  padding: 0 5px;

  .middleBox {
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-evenly;
  }

  .box {
    width: calc(60px * @i);
    height: calc(60px * @i);
    background-color: black;
    border-radius: 3px;
    margin: 0 calc(5px * @i) calc(10px * @i) calc(5px * @i);
    box-sizing: border-box;
    cursor: pointer;
  }
}
</style>