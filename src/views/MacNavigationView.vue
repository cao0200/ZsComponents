<!-- App.vue -->
<template>
    <div>
        <ZsTab :active-name="activeName" :is-trans="true">
            <ZsTabPane name="first">
                <div class="box">
                    123
                </div>
            </ZsTabPane>
            <ZsTabPane name="6"></ZsTabPane>
            <ZsTabPane name="5"></ZsTabPane>
            <ZsTabPane name="4"></ZsTabPane>
            <ZsTabPane name="3"></ZsTabPane>
            <ZsTabPane name="2"></ZsTabPane>
            <ZsTabPane name="1"></ZsTabPane>
        </ZsTab>
    </div>
</template>

<script setup>

import {ref} from "vue";
import ZsTab from "@/components/ZsTab/ZsTab.vue";
import ZsTabPane from "@/components/ZsTab/ZsTabPane.vue";

const activeName = ref('first')
</script>

<style scoped>
.box {
    width: 100%;
    height: 100%;
    background-color: pink;
    color: white;
}
</style>