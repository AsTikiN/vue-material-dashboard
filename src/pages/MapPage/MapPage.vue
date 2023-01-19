<template>
  <div ref="mapWrapper">
    <div class="mapPageWrapper" id="app">
      <Modal :isOpen="isOpen" :handleClose="handleCloseModal" :w="500" :h="300" title="Hoogte profiel">
        <Plotly class="plotlyGraph" @hover="handleHoverGraph" :data="data" :layout="layout" :display-mode-bar="false" />
      </Modal>

      <Modal :isOpen="isTableOpen" :handleClose="handleCloseModal" :w="500" :h="300" title="Paths info">
        <div class="modalTableWrapper">
          <SimpleTable :columns="graphsData" />
        </div>
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
import SimpleTable from "../../components/Tables/SimpleTable.vue";

export default {
  name: "VueMaterialDashboardMapPage",

  data() {
    return {
      isOpen: true,
      isTableOpen: true,
      activePathId: null,
      graphsData: [],
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
    SimpleTable,
  },

  mounted() {
    fetch("graphPath.json")
      .then((res) => res.json())
      .then((data) => {
        this.graphsData = data;
      });
  },

  computed: {
    data() {
      const activeData = this.graphsData.find((data) => data.id === this.activePathId);
      return [
        {
          x: activeData ? activeData.graph.distance : [],
          y: activeData ? activeData.graph.z : [],
          type: "scatter",
          mode: "lines",
          line: { color: "#7F7F7F" },
        },
      ];
    },
    mapTrace() {
      const activeData = this.graphsData.find((data) => data.id === this.activePathId);
      return activeData ? activeData.map_trace : {};
    },
  },

  methods: {
    handleOpenModal(pathId) {
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

.modalTableWrapper {
  margin-top: 55px;
}
</style>
