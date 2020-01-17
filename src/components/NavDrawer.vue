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
          @click="close"
        />
      </transition>
      <transition
        v-if="!disableCloseButton"
        name="nav-drawer-close"
      >
        <div
          v-if="isOpen"
          :role="role"
          :tabindex="tabindex"
          :style="closeButtonStyle"
          :class="closeClass"
          @keyup.13="close"
          @click="close"
        />
      </transition>
      <transition name="nav-drawer-menu">
        <div
          :is-active="isOpen"
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

<script>
import { store } from '@models/store.js';

const queryMatch = mediaQuery => {
  return window.matchMedia(mediaQuery).matches;
};

export default {
  props: {
    isLeft: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: '#fff',
    },
    coverOpacity: {
      type: Number,
      default: 0.5,
    },
    disableCloseButton: {
      type: Boolean,
      default: false,
    },
    mediaQuery: {
      type: String,
      default: '(max-width: 640px)',
    },
    top: {
      type: String,
      default: '0px',
    },
    zIndex: {
      type: Number,
      default: 1000,
    },
    drawerWidth: {
      type: String,
      default: '80vw',
    },
    isButton: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      store: store,
      isEnabled: false,
      menuClass: {
        'nav-drawer__menu--left': this.isLeft,
        'nav-drawer__menu--right': !this.isLeft,
      },
      closeClass: {
        'nav-drawer__close--left': this.isLeft,
        'nav-drawer__close--right': !this.isLeft,
      },
      drawerStyle: {
        '--vue-nav-drawer-width': this.drawerWidth,
      },
      menuStyle: {
        top: this.top,
        height: `calc(100% - ${this.top})`,
        zIndex: this.zIndex + 1,
        backgroundColor: this.bgColor,
      },
      coverStyle: {
        top: this.top,
        zIndex: this.zIndex,
        backgroundColor: `rgba(0, 0, 0, ${this.coverOpacity})`,
      },
      closeButtonStyle: {
        zIndex: this.zIndex + 1,
      },
    };
  },

  computed: {
    isOpen() {
      return this.store.isActive;
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
    },
  },

  created() {
    this.checkQueryMatch();
    window.addEventListener('resize', this.checkQueryMatch);
  },

  beforeDestory() {
    window.removeEventListener('resize', this.checkQueryMatch);
  },

  methods: {
    close() {
      this.store.close();
    },
    checkQueryMatch() {
      this.isEnabled = queryMatch(this.mediaQuery);
    }
  },
};
</script>

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

      &[is-active] {
        transform: translateX(0);
      }
    }

    &--right {
      @extend %menu;
      right: 0;
      left: auto;
      transform: translateX(var(--vue-nav-drawer-width));

      &[is-active] {
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
