<script setup lang="ts">

import ContextmenuPage from "@/components/ContextmenuPage/ContextmenuPage.vue";

function getLabel(obj: object) {
    console.log(obj)
}

const a = 2
</script>

<template>
    <contextmenu-page class="box" :menuData="[
        {label:'添加'},
        {label:'修改'},
        {label:'删除'},
    ]" @getLabel="getLabel" transformTime="1">
        <h1>123</h1>
        <contextmenu-page class="box1" :menuData="[
            {label:'添加'},
            {label:'删除'},
        ]" @getLabel="getLabel" transformTime="2s">
            <h1>321</h1>
            <contextmenu-page class="box2" :menuData="[
                {label:'添加'},
            ]" @getLabel="getLabel" :transformTime="a">
                <h1>321</h1>
            </contextmenu-page>
        </contextmenu-page>
    </contextmenu-page>
</template>

<style scoped>
.box {
    width: 500px;
    height: 500px;
    background-color: skyblue;

    h1 {
        text-align: center;
    }

    .box1 {
        width: 300px;
        height: 300px;
        background-color: pink;
    }

    .box2 {
        width: 200px;
        height: 200px;
        background-color: white;
    }
}
</style>