<template>
  <div
    :is-active="isActive"
    :style="handleStyle"
    :role="role"
    :tabindex="tabindex"
    class="nav-drawer-handle"
    @keyup.13="toggle"
    @click="toggle">
    <div class="nav-drawer-handle__inner">
      <div
        class="nav-drawer-handle__lines">
        <div
          :class="lineClass"/>
        <div
          :class="lineClass"/>
        <div
          :class="lineClass"/>
      </div>
      <div
        v-if="hasLabel"
        :style="labelStyle"
        class="nav-drawer-handle__label">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@models/store.js';

export default {
  props: {
    size: {
      type: Number,
      default: 50
    },
    weight: {
      type: String,
      default: 'normal'
    },
    color: {
      type: String,
      default: '#fff'
    },
    bgColor: {
      type: String,
      default: '#f6ac1d'
    },
    fsize: {
      type: String,
      default: '10px'
    },
    isButton: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      store,
      handleStyle: {
        width: `${this.size}px`,
        height: `${this.size}px`,
        color: this.color,
        backgroundColor: this.bgColor
      },
      labelStyle: {
        fontSize: this.fsize
      },
      lineClass: {
        'nav-drawer-handle__line--normal': this.weight === 'normal',
        'nav-drawer-handle__line--thin': this.weight === 'thin',
        'nav-drawer-handle__line--bold': this.weight === 'bold',
      }
    };
  },

  computed: {
    isActive() {
      return this.store.isActive;
    },
    hasLabel() {
      return typeof this.$slots.default !== 'undefined';
    },
    role() {
      if (this.isButton) {
        return 'button';
      }
      return false;
    },
    tabindex() {
      if (this.isButton) {
        return 0;
      }
      return false;
    }
  },

  methods: {
    toggle() {
      this.store.toggle();
    }
  }
};
</script>

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
