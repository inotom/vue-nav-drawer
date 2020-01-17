<template>
  <div
    :is-active="isActive"
    :role="role"
    :tabindex="tabindex"
    class="nav-drawer-custom-close-handle"
    @keyup.13="close"
    @click="close"
  >
    <slot />
  </div>
</template>

<script>
import { store } from '@models/store.js';

export default {
  props: {
    isButton: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      store,
    };
  },

  computed: {
    isActive() {
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

  methods: {
    close() {
      this.store.close();
    },
  },
};
</script>
