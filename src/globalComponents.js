import DropDown from "./components/Dropdown.vue";
import VueDragResize from "vue-drag-resize";

const GlobalComponents = {
  install(Vue) {
    Vue.component("drop-down", DropDown);
    Vue.component("vue-drag-resize", VueDragResize);
  },
};

export default GlobalComponents;
