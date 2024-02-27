import {create} from 'zustand';

export const useContextMenuStore = create((set, get) => ({
  contextProps: {},
  addOnButtonShow: true,
  setContextShow: null,
  setContextMenu(contextProps, setContextShow) {
    if (contextProps.target.tagName !== 'CANVAS') return;
    setContextShow(true);
    contextProps.preventDefault();
    set(() => ({ contextProps, setContextShow }));
  },
  setContextClose() {
    get().setContextShow(false);
    set(() => ({ contextProps: {} }));
  },
  setAddOnButtonShow() {
    get().setContextShow(false);
    set(({ addOnButtonShow }) => ({ addOnButtonShow: !addOnButtonShow }));
  },
}));
