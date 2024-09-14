<script setup lang="ts">
import {getCurrentInstance} from "vue";
import type {ZsTabPaneTs} from "./ZsTabPane";

const prop = defineProps<ZsTabPaneTs>()
if (getCurrentInstance()?.parent?.type['__name'] !== 'ZsTab') {
    throw new Error('ZsTabPane can only be used in ZsTab')
}
</script>

<template>
    <div :class="prop.disabled?'ZsBigTabPane ZsDisabled':'ZsBigTabPane'" :id="prop.name" :aria-disabled="prop.disabled">
        <div class="selectedState"></div>
        <div class="ZsTabPane">
            <slot></slot>
        </div>
        <div class="pop" v-show="prop.title">
            <div>{{ prop.title }}</div>
        </div>
    </div>
</template>

<style scoped lang="less">
.ZsReveal {
  .selectedState {
    display: block !important;
  }
}

.ZsDisabled {
  cursor: not-allowed !important;

  .ZsTabPane {
    opacity: .8;
  }
}

.ZsBigTabPane {
  position: relative;
  @i: var(--ZsBlowUp);
  cursor: pointer;

  &:hover .pop {
    opacity: 1;
  }

  .pop {
    left: 50%;
    top: -40px;
    opacity: 0;
    width: 70px;
    height: 25px;
    position: absolute;
    border-radius: 5px;
    text-align: center;
    line-height: 25px;
    transition: opacity .2s;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, .5);

    div {
      width: 100%;
      color: white;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -9px;
      border: 5px solid transparent;
      border-top-color: rgba(0, 0, 0, .5);
    }
  }

  .selectedState {
    position: absolute;
    left: 50%;
    top: -5px;
    transform: translateX(-50%);
    width: calc(70px * @i);
    height: calc(75px * @i);
    z-index: -1;
    border-radius: 5px;
    display: none;

    &::after {
      content: '';
      position: absolute;
      bottom: calc(1px * @i);
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: white;
    }
  }

  .ZsTabPane {
    width: calc(60px * @i);
    height: calc(60px * @i);
    background-color: black;
    border-radius: 5px;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 calc(5px * @i) calc(15px * @i) calc(5px * @i);
    position: relative;
  }
}
</style>