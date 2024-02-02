/** @prettier */

import { ref, Ref } from 'vue';

export const NAV_DRAWER_ACTIVE_ATTR = 'is-nav-drawer-active';

interface NavStore {
  key: string;
  isActive: Ref<boolean>;
  top: Ref<number>;
}

const navStores = [
  {
    key: 'default',
    isActive: ref(false),
    top: ref(0),
  },
] as NavStore[];

const toggleActive = (key: string = 'default') => {
  const store = getStore(key);
  store.isActive.value = !store.isActive.value;
  updateStore(key);
};

const closeActive = (key: string = 'default') => {
  const store = getStore(key);
  store.isActive.value = false;
  updateStore(key);
};

const updateStore = (key: string = 'default') => {
  const store = getStore(key);
  const attrName = store.key === 'default' ? NAV_DRAWER_ACTIVE_ATTR : `is-nav-drawer-${key}-active`;
  if (store.isActive.value) {
    store.top.value = window.scrollY;
    document.documentElement.setAttribute(attrName, '');
    document.body.style.top = `-${store.top.value}px`;
  } else {
    document.documentElement.removeAttribute(attrName);
    window.scrollTo(0, store.top.value);
    document.body.style.top = '0px';
  }
};

const getStore = (key: string = 'default'): NavStore => {
  const store = navStores.find((item: NavStore) => item.key === key);
  if (!store) {
    const newStore = {
      key,
      isActive: ref(false),
      top: ref(0),
    };
    navStores.push(newStore);
    return newStore;
  }
  return store;
};

const isDrawerActive = (key: string = 'default'): boolean | null => {
  if (getStore(key).isActive.value) {
    return true;
  }
  return null;
};

export const useNavStore = () => {
  return {
    toggleActive,
    closeActive,
    getStore,
    isDrawerActive,
  };
};
