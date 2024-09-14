<script setup lang="ts">

import MouseAnimationPage from "@/components/MouseAnimationPage/MouseAnimationPage.vue";
import ContextmenuPage from "@/components/ContextmenuPage/ContextmenuPage.vue";
import {ref} from "vue";

function getLabel(obj: object) {
    console.log(obj)
}

const mouseSlot = ref()

</script>

<template>
    <div>
        <contextmenu-page class="box2" :menuData="[
                {label:'添加'},
            ]" @getLabel="getLabel" transformTime="1">
            <mouse-animation-page class="box" mouseSize="large" :rotationAngle="-30" :isClickStyle="true">
                <h1>321</h1>
                <template #mouseSlot>
                    <div ref="mouseSlot"></div>
                </template>
            </mouse-animation-page>
        </contextmenu-page>

    </div>
</template>

<style scoped lang="less">
.box2 {
  width: 600px;
  height: 600px;
  background-color: skyblue;

  .box {
    width: 100%;
    height: 100%;
    background-color: pink;

    h1 {
      text-align: center;
    }
  }
}
</style>