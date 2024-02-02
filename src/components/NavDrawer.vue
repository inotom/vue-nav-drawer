<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useNavStore } from '../store';
import { role, tabindex } from '../functions';

interface Props {
  drawerKey?: string;
  isLeft?: boolean;
  bgColor?: string;
  coverOpacity?: number;
  disableCloseButton?: boolean;
  mediaQuery?: string;
  top?: string;
  zIndex?: number;
  drawerWidth?: string;
  isButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  drawerKey: 'default',
  isLeft: false,
  bgColor: '#fff',
  coverOpacity: 0.5,
  disableCloseButton: false,
  mediaQuery: '(max-width: 640px)',
  top: '0px',
  zIndex: 1000,
  drawerWidth: '80vw',
  isButton: false,
});

const { closeActive, getStore, isDrawerActive } = useNavStore();

const isOpen = computed(() => getStore(props.drawerKey).isActive.value);

const isEnabled = ref(false);

const menuClass = computed(() => {
  return {
    'nav-drawer__menu--left': props.isLeft,
    'nav-drawer__menu--right': !props.isLeft,
  };
});

const closeClass = computed(() => {
  return {
    'nav-drawer__close--left': props.isLeft,
    'nav-drawer__close--right': !props.isLeft,
  };
});

const drawerStyle = computed(() => {
  return {
    '--vue-nav-drawer-width': props.drawerWidth,
  };
});

const menuStyle = computed(() => {
  return {
    top: props.top,
    height: `calc(100% - ${props.top})`,
    zIndex: props.zIndex + 1,
    backgroundColor: props.bgColor,
  };
});

const coverStyle = computed(() => {
  return {
    top: props.top,
    zIndex: props.zIndex,
    backgroundColor: `rgba(0, 0, 0, ${props.coverOpacity})`,
  };
});

const closeButtonStyle = computed(() => {
  return {
    zIndex: props.zIndex + 1,
  };
});

const queryMatch = (mediaQuery: string) => {
  return window.matchMedia(mediaQuery).matches;
};

const checkQueryMatch = () => {
  isEnabled.value = queryMatch(props.mediaQuery);
};

onBeforeMount(() => {
  checkQueryMatch();
  window.addEventListener('resize', checkQueryMatch);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkQueryMatch);
});
</script>

<template>
  <div class="nav-drawer-container">
    <div
      v-if="isEnabled"
      class="nav-drawer"
      :style="drawerStyle"
    >
      <transition name="nav-drawer-cover">
        <div
          v-if="isOpen"
          :style="coverStyle"
          class="nav-drawer__cover"
          @click="closeActive(drawerKey)"
        />
      </transition>
      <transition
        v-if="!disableCloseButton"
        name="nav-drawer-close"
      >
        <div
          v-if="isOpen"
          :role="role(isButton)"
          :tabindex="tabindex(isButton)"
          :style="closeButtonStyle"
          :class="closeClass"
          @keyup.13="closeActive(drawerKey)"
          @click="closeActive(drawerKey)"
        />
      </transition>
      <transition name="nav-drawer-menu">
        <div
          :is-active="isDrawerActive(drawerKey)"
          :style="menuStyle"
          :class="menuClass"
        >
          <slot />
        </div>
      </transition>
    </div>
    <div
      v-else
      class="nav-drawer--disabled"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-drawer {
  --vue-nav-drawer-width: 80vw;

  &__cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }

  %menu {
    overflow-y: auto;
    position: fixed;
    width: var(--vue-nav-drawer-width);
    transition: transform .3s ease-out 0s;
  }

  &__menu {
    &--left {
      @extend %menu;
      right: auto;
      left: 0;
      transform: translateX(-100vw);

      &[is-active='true'] {
        transform: translateX(0);
      }
    }

    &--right {
      @extend %menu;
      right: 0;
      left: auto;
      transform: translateX(var(--vue-nav-drawer-width));

      &[is-active='true'] {
        transform: translateX(0);
      }
    }
  }

  $close-size: 40px;

  %close {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 10px;
    width: $close-size;
    min-width: $close-size;
    height: $close-size;
    white-space: nowrap;
    text-indent: 100%;

    &::after,
    &::before {
      content: '';
      display: block;
      position: absolute;
      width: $close-size;
      min-width: $close-size;
      height: 5px;
      background-color: #fff;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  &__close {
    &--left {
      @extend %close;
      right: 10px;

      &.nav-drawer-close-enter {
        transform: translateX(-100vw);
      }
    }

    &--right {
      @extend %close;
      left: 10px;

      &.nav-drawer-close-enter {
        transform: translateX(100vw);
      }
    }
  }
}

.nav-drawer-cover-enter-active,
.nav-drawer-cover-leave-active {
  transition: opacity .5s;
}
.nav-drawer-cover-enter,
.nav-drawer-cover-leave-to {
  opacity: 0;
}

.nav-drawer-close-enter-active {
  transition: transform .3s ease-out .5s
}
.nav-drawer-close-leave-active {
  transition: opacity .3s ease-out 0s;
}
.nav-drawer-close-leave-to {
  opacity: 0;
}
</style>

<style lang="scss">
html[is-nav-drawer-active] {
  position: fixed;

  body {
    position: fixed;
  }
}
</style>
