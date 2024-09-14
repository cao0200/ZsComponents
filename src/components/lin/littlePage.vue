<script setup lang="ts">

import {getCurrentInstance} from "vue";

const props = defineProps<{
    content: string
}>()
console.log(getCurrentInstance()?.parent?.type['__name'])
</script>

<template>
    <div>{{ props.content }}</div>
</template>

<style scoped lang="less">

</style>