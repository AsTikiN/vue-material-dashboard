<template>
  <VueDragResize
    v-if="isOpen"
    :isActive="isOpen"
    :h="h"
    :w="w"
    v-on:resizing="resize"
    :parentLimitation="true"
    v-on:dragging="resize"
    :style="{ zIndex: 10 }"
  >
    <div class="modalWrapper">
      <div class="modelActions">
        <div class="modalTitle">{{ title }}</div>
        <div class="modalClose" @click="handleClose" />
      </div>
      <slot class="modalContent"></slot>
    </div>
  </VueDragResize>
</template>

<script>
import VueDragResize from "vue-drag-resize";

export default {
  name: "Modal",

  props: {
    isOpen: Boolean,
    handleClose: Function,
    w: Number,
    h: Number,
    title: String,
  },

  data() {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    };
  },

  components: {
    VueDragResize,
  },

  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
  },
};
</script>

<style lang="scss" scoped>
.modalWrapper {
  background-color: #fff;
  color: #fff;
  height: 100%;
  cursor: grab;
  overflow-y: scroll;
  border-radius: 0 0 10px 10px;
}

.modalWrapper:active {
  cursor: grabbing;
}

.modelActions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  background-color: #152032;
  height: 60px;
  border-radius: 10px 10px 0 0;
}

.modalClose {
  position: relative;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:before,
  &:after {
    content: "";
    width: 20px;
    height: 3px;
    background-color: #fff;
    position: absolute;
    border-radius: 5px;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
}

.modalTitle {
  font-size: 18px;
  font-weight: 400;
}
</style>
