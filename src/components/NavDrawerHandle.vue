<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { useNavStore } from '../store';
import { role, tabindex } from '../functions';

interface Props {
  drawerKey?: string;
  size?: number;
  weight?: string;
  color?: string;
  bgColor?: string;
  fsize?: string;
  isButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  drawerKey: 'default',
  size: 50,
  weight: 'normal',
  color: '#fff',
  bgColor: '#f6ac1d',
  fsize: '10px',
  isButton: false,
});

const { toggleActive, isDrawerActive } = useNavStore();

const slots = useSlots();

const handleStyle = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
    color: props.color,
    backgroundColor: props.bgColor
  };
});

const labelStyle = computed(() => {
  return {
    fontSize: props.fsize
  };
});

const lineClass = computed(() => {
  return {
    'nav-drawer-handle__line--normal': props.weight === 'normal',
    'nav-drawer-handle__line--thin': props.weight === 'thin',
    'nav-drawer-handle__line--bold': props.weight === 'bold',
  };
});

const hasLabel = computed(() => typeof slots.default !== 'undefined');
</script>

<template>
  <div
    :is-active="isDrawerActive(drawerKey)"
    :style="handleStyle"
    :role="role(isButton)"
    :tabindex="tabindex(isButton)"
    class="nav-drawer-handle"
    @keyup.13="toggleActive(drawerKey)"
    @click="toggleActive(drawerKey)"
  >
    <div class="nav-drawer-handle__inner">
      <div
        class="nav-drawer-handle__lines"
      >
        <div :class="lineClass" />
        <div :class="lineClass" />
        <div :class="lineClass" />
      </div>
      <div
        v-if="hasLabel"
        :style="labelStyle"
        class="nav-drawer-handle__label"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-drawer-handle {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  &__inner {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  &__lines {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    font: {
      size: 14px;
    }
  }

  %line {
    position: relative;
    width: 50%;
    background-color: currentColor;
    transition: transform .4s;
  }

  &__line {
    &--normal {
      @extend %line;
      height: 3px;
      &:nth-child(1) {
        transform: translate3d(0, -6px, 0) rotate(0deg) scale(1);
      }
      &:nth-child(3) {
        transform: translate3d(0, 6px, 0) rotate(0deg) scale(1);
      }
    }

    &--thin {
      @extend %line;
      height: 1px;
      &:nth-child(1) {
        transform: translate3d(0, -7px, 0) rotate(0deg) scale(1);
      }
      &:nth-child(3) {
        transform: translate3d(0, 7px, 0) rotate(0deg) scale(1);
      }
    }

    &--bold {
      @extend %line;
      height: 5px;
      &:nth-child(1) {
        transform: translate3d(0, -5px, 0) rotate(0deg) scale(1);
      }
      &:nth-child(3) {
        transform: translate3d(0, 5px, 0) rotate(0deg) scale(1);
      }
    }
  }

  &[is-active] {
    .nav-drawer-handle__line {
      &--normal {
        &:nth-child(1) {
          transform: translate3d(0, 3px, 0) rotate(405deg) scale(1.2);
        }
        &:nth-child(2) {
          transform: scale(0);
        }
        &:nth-child(3) {
          transform: translate3d(0, -3px, 0) rotate(-405deg) scale(1.2);
        }
      }

      &--thin {
        &:nth-child(1) {
          transform: translate3d(0, 1px, 0) rotate(405deg) scale(1.2);
        }
        &:nth-child(2) {
          transform: scale(0);
        }
        &:nth-child(3) {
          transform: translate3d(0, -1px, 0) rotate(-405deg) scale(1.2);
        }
      }

      &--bold {
        &:nth-child(1) {
          transform: translate3d(0, 5px, 0) rotate(405deg) scale(1.2);
        }
        &:nth-child(2) {
          transform: scale(0);
        }
        &:nth-child(3) {
          transform: translate3d(0, -5px, 0) rotate(-405deg) scale(1.2);
        }
      }
    }
  }

  &__label {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30%;
    padding: {
      bottom: .5em;
    }
    color: currentColor;
  }
}
</style>
