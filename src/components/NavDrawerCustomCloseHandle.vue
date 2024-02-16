<script setup lang="ts">
import { useNavStore } from '../store';
import { role, tabindex } from '../functions';

interface Props {
  drawerKey?: string;
  isButton?: boolean;
}

withDefaults(defineProps<Props>(), {
  drawerKey: 'default',
  isButton: false,
});

const { closeActive, isDrawerActive } = useNavStore();
</script>

<template>
  <div
    :is-active="isDrawerActive(drawerKey)"
    :role="role(isButton)"
    :tabindex="tabindex(isButton)"
    class="nav-drawer-custom-close-handle"
    @keyup.13="closeActive(drawerKey)"
    @click="closeActive(drawerKey)"
  >
    <slot />
  </div>
</template>
