/** @prettier */

// Import vue component
import NavDrawer from '@components/NavDrawer.vue';
import NavDrawerHandle from '@components/NavDrawerHandle.vue';
import NavDrawerCustomHandle from '@components/NavDrawerCustomHandle.vue';

// Declare install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) {
    return;
  }
  install.installed = true;
  Vue.component('nav-drawer', NavDrawer);
  Vue.component('nav-drawer-handle', NavDrawerHandle);
  Vue.component('nav-drawer-custom-handle', NavDrawerCustomHandle);
}

// Create module definition for Vue.use()
const plugin = {
  install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export { NavDrawer, NavDrawerHandle, NavDrawerCustomHandle };
