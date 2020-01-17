# vue-nav-drawer

A Vue.js component to toggle navigation drawer menu container.


## Demo

[Demo](http://sandbox.serendip.ws/vue-nav-drawer.html)

[Demo2](http://sandbox.serendip.ws/vue-nav-drawer2.html)


## Install

### Browser

```html
<script src="vue.js"></script>
<script src="vue-nav-drawer.min.js"></script>
```


### npm

```
npm install -D @inotom/vue-nav-drawer
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

<script src="vue.js"></script>
<script src="vue-nav-drawer.min.js"></script>
<script>
Vue.use(NavDrawer);
new Vue({
  el: '#app'
});
</script>
```


### SFC

```vue
<template>
  <nav-drawer-handle></nav-drawer-handle>
  <nav-drawer-custom-handle>MENU</nav-drawer-custom-handle>
  <nav-drawer>
    MENU LIST
    <nav-drawer-custom-close-handle>CLOSE</nav-drawer-custom-close-handle>
  </nav-drawer>
</template>

<script>
import {
  NavDrawer,
  NavDrawerHandle,
  NavDrawerCustomHandle,
  NavDrawerCustomCloseHandle
} from '@inotom/vue-nav-drawer';

export default {
  components: {
    NavDrawer,
    NavDrawerHandle
    NavDrawerCustomHandle,
    NavDrawerCustomCloseHandle,
  }
}
</script>
```


## Props

### NavDrawerHandle

| Props          | Type      | Default         | Description                                    |
|----------------|-----------|-----------------|------------------------------------------------|
| `size`         | `Number`  | `50`            | Hamburger menu size(px)                        |
| `weight`       | `String`  | `"normal"`      | Hamburger menu line width (normal, thin, bold) |
| `color`        | `String`  | `"#fff"`        | Hamburger menu line color                      |
| `bg-color`     | `String`  | `"#f6ac1d"`     | Hamburger menu background color                |
| `fsize`        | `String`  | `"10px"`        | Menu label text size                           |
| `is-button`    | `Boolean` | `false`         | Add WAI-ARIA role button attribute             |


### NavDrawer

| Props                  | Type      | Default                | Description                                      |
|------------------------|-----------|------------------------|--------------------------------------------------|
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
| `is-button`    | `Boolean` | `false`         | Add WAI-ARIA role button attribute             |


### NavDrawerCustomCloseHandle

| Props          | Type      | Default         | Description                                    |
|----------------|-----------|-----------------|------------------------------------------------|
| `is-button`    | `Boolean` | `false`         | Add WAI-ARIA role button attribute             |


## License

MIT

## Author

inotom
