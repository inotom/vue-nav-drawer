/** @prettier */

export const NAV_DRAWER_ACTIVE_ATTR = 'is-nav-drawer-active';

export const store = {
  isActive: false,
  top: 0,
  toggle() {
    this.isActive = !this.isActive;
    this.update();
  },
  close() {
    this.isActive = false;
    this.update();
  },
  update() {
    if (this.isActive) {
      this.top = window.pageYOffset;
      document.documentElement.setAttribute(NAV_DRAWER_ACTIVE_ATTR, '');
      document.body.style.top = -this.top + 'px';
    } else {
      document.documentElement.removeAttribute(NAV_DRAWER_ACTIVE_ATTR);
      window.scrollTo(0, this.top);
      document.body.style.top = 0;
    }
  },
};
