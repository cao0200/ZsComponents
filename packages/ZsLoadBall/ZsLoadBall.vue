<script setup lang="ts">
import type {LoadBallPageProps} from "./ZsLoadBall";

const props = defineProps<LoadBallPageProps>()

let classStyle = {
    // 进度
    '--progress': props.progress,
    // 宽度
    '--loadWidth': props.loadWidth || '200px',
    // 加载求颜色
    '--loadColor': props.loadColor || 'skyblue',
    // 字体颜色
    '--contentColor': props.contentColor || 'black'
}

if (typeof props?.loadWidth === 'number') {
    classStyle['--loadWidth'] = props.loadWidth + 'px'
}

</script>

<template>
    <div class="loadBall" :style="classStyle">
        <span>{{ props.progress }}%</span>
        <div></div>
    </div>
</template>

<style scoped lang="scss">
// 宽度
$loadWidth: var(--loadWidth);
// 进度
$progress: var(--progress);
// 加载求颜色
$loadColor: var(--loadColor);
// 字体颜色
$contentColor: var(--contentColor);
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loadBall {
  position: relative;
  width: $loadWidth;
  height: $loadWidth;
  border-radius: 50%;
  border: 1px solid black;
  overflow: hidden;
  text-align: center;
  line-height: $loadWidth;
  color: $contentColor;

  div {
    transform: translateY(calc(($loadWidth * 1.08) * ($progress / 100) * -1));
    position: absolute;
    top: calc($loadWidth * 1.08);
    z-index: -1;
    left: calc($loadWidth * -0.1);
    transition: all .1s;

    &::after {
      display: block;
      border-radius: 35%;
      animation: rotate 3s linear;
      animation-iteration-count: infinite;
      content: '';
      width: calc($loadWidth * 1.2);
      height: calc($loadWidth * 1.2);
      background-color: $loadColor;
    }
  }
}
</style>