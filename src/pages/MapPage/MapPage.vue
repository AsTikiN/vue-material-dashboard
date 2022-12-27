<template>
  <div class="mapPageWrapper">
    <Modal :isOpen="isOpen" :handleClose="handleCloseModal">{{activePathId}}</Modal>
    <Map @handle-open-modal="handleOpenModal" />
  </div>
</template>

<script>
import Map from "../../components/Map/Map.vue";
import Modal from "../../components/Modal/Modal.vue";

export default {
  name: "VueMaterialDashboardMapPage",

  data() {
    return {
      isOpen: false,
      activePathId: null,
    };
  },

  components: {
    Map,
    Modal,
  },

  mounted() {},

  methods: {
    handleOpenModal(pathId) {
      this.isOpen = true;
      this.activePathId = pathId;
    },

    handleCloseModal() {
      this.isOpen = false;
      this.activePathId = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.mapPageWrapper {
  position: relative;
}
</style>