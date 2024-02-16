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

const { toggleActive, isDrawerActive } = useNavStore();
</script>

<template>
  <div
    :is-active="isDrawerActive(drawerKey)"
    :role="role(isButton)"
    :tabindex="tabindex(isButton)"
    class="nav-drawer-custom-handle"
    @keyup.13="toggleActive(drawerKey)"
    @click="toggleActive(drawerKey)"
  >
    <slot />
  </div>
</template>
