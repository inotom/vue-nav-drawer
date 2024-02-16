# @inotom/vue-nav-drawer

A Vue.js component to toggle navigation drawer menu container.

From v2.0.0, it works for Vue 3.

## Demo

[Demo](https://sandbox.serendip.ws/vue-nav-drawer-v2.html)


## Install

### Browser

```html
<script src="vue.global.prod.js"></script>
<script src="vue-nav-drawer.umd.js"></script>
```


### npm

```
npm install --save @inotom/vue-nav-drawer
```


## Usage

### Browser

```html
<div id="app">
  <nav-drawer-handle></nav-drawer-handle>
  <nav-drawer-custom-handle>MENU</nav-drawer-custom-handle>
  <nav-drawer>
    MENU LIST
    <nav-drawer-custom-close-handle>CLOSE</nav-drawer-custom-close-handle>
  </nav-drawer>
</div>

<script src="vue.global.prod.js"></script>
<script src="vue-nav-drawer.umd.js"></script>
<script>
const { createApp } = Vue;
const { NavDrawer, NavDrawerHandle, NavDrawerCustomHandle, NavDrawerCustomCloseHandle } = SwsVueNavDrawer;

createApp({
  components: {
    NavDrawer,
    NavDrawerHandle,
    NavDrawerCustomHandle,
    NavDrawerCustomCloseHandle,
  },
}).mount('#app');
</script>
```


### SFC (TypeScript)

```vue
<template>
  <nav-drawer-handle></nav-drawer-handle>
  <nav-drawer-custom-handle>MENU</nav-drawer-custom-handle>
  <nav-drawer>
    MENU LIST
    <nav-drawer-custom-close-handle>CLOSE</nav-drawer-custom-close-handle>
  </nav-drawer>
</template>

<script setup lang="ts">
import {
  NavDrawer,
  NavDrawerHandle,
  NavDrawerCustomHandle,
  NavDrawerCustomCloseHandle
} from '@inotom/vue-nav-drawer';
</script>
```


## Props

### NavDrawerHandle

| Props          | Type      | Default         | Description                                    |
|----------------|-----------|-----------------|------------------------------------------------|
| `drawer-key`   | `String`  | `"default"`     | Key string for drawer identification           |
| `size`         | `Number`  | `50`            | Hamburger menu size(px)                        |
| `weight`       | `String`  | `"normal"`      | Hamburger menu line width (normal, thin, bold) |
| `color`        | `String`  | `"#fff"`        | Hamburger menu line color                      |
| `bg-color`     | `String`  | `"#f6ac1d"`     | Hamburger menu background color                |
| `fsize`        | `String`  | `"10px"`        | Menu label text size                           |
| `is-button`    | `Boolean` | `false`         | Add WAI-ARIA role button attribute             |


### NavDrawer

| Props                  | Type      | Default                | Description                                      |
|------------------------|-----------|------------------------|--------------------------------------------------|
| `drawer-key`           | `String`  | `"default"`            | Key string for drawer identification             |
| `is-left`              | `Boolean` | `false`                | Drawer container align left                      |
| `bg-color`             | `String`  | `"#fff"`               | Drawer container background color                |
| `cover-opacity`        | `Number`  | `0.5`                  | Drawer background layer opacity                  |
| `disable-close-button` | `Boolean` | `false`                | Hide close button                                |
| `media-query`          | `String`  | `"(max-width: 640px)"` | Enable drawer conditional                        |
| `top`                  | `String`  | `"0px"`                | Drawer top position                              |
| `z-index`              | `Number`  | `1000`                 | Drawer z-index                                   |
| `is-button`            | `Boolean` | `false`                | Add WAI-ARIA role button attribute to close icon |
| `drawer-width`         | `String`  | `80vw`                 | Drawer container width                           |


### NavDrawerCustomHandle

| Props          | Type      | Default         | Description                                    |
|----------------|-----------|-----------------|------------------------------------------------|
| `drawer-key`   | `String`  | `"default"`     | Key string for drawer identification           |
| `is-button`    | `Boolean` | `false`         | Add WAI-ARIA role button attribute             |


### NavDrawerCustomCloseHandle

| Props          | Type      | Default         | Description                                    |
|----------------|-----------|-----------------|------------------------------------------------|
| `drawer-key`   | `String`  | `"default"`     | Key string for drawer identification           |
| `is-button`    | `Boolean` | `false`         | Add WAI-ARIA role button attribute             |


## License

MIT

## Author

inotom
