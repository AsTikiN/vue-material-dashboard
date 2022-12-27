<template>
  <div>
    <Plotly
      @hover="handleHover"
      ref="plref"
      :data="data"
      :layout="layout"
      :display-mode-bar="false"
    ></Plotly>
  </div>
</template>

<script>
import { Plotly } from "vue-plotly";

export default {
  components: {
    Plotly,
  },
  data() {
    return {
      data: [
        {
          x: [],
          y: [],
          type: "scatter",
          mode: "lines",
          line: { color: "#7F7F7F" },
        },
      ],
      layout: {
        title: "My graph",
      },
    };
  },
  mounted() {
    fetch("graphPath.json")
      .then((res) => res.json())
      .then((data) => {
        this.data = [
          {
            ...this.data[0],
            x: data.graph.distance,
            y: data.graph.z,
          },
        ];
      });

    console.log(this.$refs.plref);
  },
  methods: {
    handleHover(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>