<template>
  <div v-if="isOpen" class="modalWrapper">
    <div class="modelActions">
      <div class="modalClose" @click="handleClose" />
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Modal",

  props: {
    isOpen: Boolean,
    positionX: {
      type: Number,
      default: 0,
    },
    positionY: {
      type: Number,
      default: 0,
    },
    handleClose: Function,
  },

  data() {
    return {};
  },

  mounted() {},

  computed: {
    cssVars() {
      return {
        "--modal-x": this.positionX + "px",
        "--modal-y": this.positionY + "px",
      };
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.modalWrapper {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;
  width: 400px;
  max-width: 95%;
  background-color: grey;
  padding: 10px;
  color: #fff;
}

.modelActions {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
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
    background-color: white;
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
</style>