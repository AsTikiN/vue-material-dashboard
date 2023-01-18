<template>
  <div ref="mapWrapper">
    <div class="mapPageWrapper" id="app">
      <Modal :isOpen="isOpen" :handleClose="handleCloseModal">
        <Plotly
          class="plotlyGraph"
          @hover="handleHoverGraph"
          :data="data"
          :layout="layout2"
          :display-mode-bar="false"
        />
      </Modal>

      <Modal :isOpen="isOpen" :handleClose="handleCloseModal">
        <Plotly
          class="plotlyGraph"
          @hover="handleHoverGraph"
          :data="data2"
          :layout="layout2"
          :display-mode-bar="false"
        />
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

      data2: [
        {
          type: "table",
          // header: {
          //   values: [["<b>EXPENSES</b>"], ["<b>Q1</b>"], ["<b>Q2</b>"], ["<b>Q3</b>"], ["<b>Q4</b>"]],
          //   align: "center",
          //   line: { width: 1, color: "black" },
          //   fill: { color: "grey" },
          //   font: { family: "Arial", size: 12, color: "white" },
          // },
          header: {
            values: [["<b>EXPENSES</b>"]],
            // align: "center",
            // line: { width: 1, color: "black" },
            // fill: { color: "grey" },
            // font: { family: "Arial", size: 12, color: "white" },
          },
          cells: {
            values: [[["Salaries"], [1200000], [1300000], [1300000], [1400000]]],
            align: "left",
            // line: { color: "black", width: 1 },
            // font: { family: "Arial", size: 11, color: ["black"] },
          },
        },
      ],

      layout2: {
        title: "123",
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
        console.log(1212, data);
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
