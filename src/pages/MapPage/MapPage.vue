<template>
  <div ref="mapWrapper">
    <div class="mapPageWrapper" id="app">
      <Modal :isOpen="isOpen" :handleClose="handleCloseModal">
        <Plotly class="plotlyGraph" @hover="handleHoverGraph" :data="data" :layout="layout" :display-mode-bar="false" />
      </Modal>

      <Map
        @handle-open-modal="handleOpenModal"
        :isOpen="isOpen"
        :markerX="markerCoords[0]"
        :markerY="markerCoords[1]"
        :center="center"
      />
    </div>
  </div>
</template>

<script>
import Map from "../../components/Map/Map.vue";
import Modal from "../../components/Modal/Modal.vue";
import { Plotly } from "vue-plotly";

export default {
  name: "VueMaterialDashboardMapPage",

  data() {
    return {
      isOpen: false,
      activePathId: null,
      graphX: [],
      graphY: [],
      mapTrace: {},
      markerCoords: [6.040129727, 51.415623313],
      center: [6.040129727, 51.415623313],
      layout: {
        xaxis: {
          title: "Afstand(m)",
        },
        yaxis: {
          title: "Z-coordinaat(m)",
        },
      },
    };
  },

  components: {
    Map,
    Modal,
    // PathGraph,
    Plotly,
  },

  mounted() {
    fetch("graphPath.json")
      .then((res) => res.json())
      .then((data) => {
        this.graphX = data.graph.distance;
        this.graphY = data.graph.z;
        this.mapTrace = data.map_trace;
      });
  },

  updated() {
    console.log();
  },

  computed: {
    data() {
      return [
        {
          x: this.graphX,
          y: this.graphY,
          type: "scatter",
          mode: "lines",
          line: { color: "#7F7F7F" },
        },
      ];
    },
  },

  methods: {
    handleOpenModal(pathId) {
      this.isOpen = true;
      this.activePathId = pathId;
    },

    handleCloseModal() {
      this.isOpen = false;
      this.activePathId = null;
    },

    handleClickModal(geom) {
      if (geom?.coordinates) this.center = [geom.coordinates[0], geom.coordinates[1]];
    },

    setGraphHoverGeometry(geom) {
      if (geom?.coordinates) this.markerCoords = [geom.coordinates[0], geom.coordinates[1]];
    },

    handleHoverGraph(e) {
      this.setGraphHoverGeometry(this.mapTrace[e.points[0].x]);
    },
  },
};
</script>

<style lang="scss" scoped>
.mapPageWrapper {
  position: relative;
  overflow: hidden;
}

.plotlyGraph {
  height: 100%;
}
</style>
