<template>
  <div class="mapWrapper">
    <MglMap ref="mapRef" id="map" :center="center" :zoom="10" :accessToken="accessToken" :mapStyle="mapStyle">
      <MglMarker v-if="isOpen" :coordinates="[markerX || 6.040129727, markerY || 51.415623313]" color="blue" />
      <MglGeojsonLayer
        class="geoLayer"
        @click="handleRouteClick"
        v-for="source of geoJsonSources"
        :key="source.data.id"
        :sourceId="source.data.id"
        :source="source"
        :layerId="source.data.id"
        :layer="geoJsonlayer"
      />
    </MglMap>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglPopup, MglGeojsonLayer } from "vue-mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default {
  name: "Map",
  components: {
    MglMap,
    MglMarker,
    // MglPopup,
    MglGeojsonLayer,
  },
  props: {
    isOpen: Boolean,
    markerX: Number,
    markerY: Number,
    center: Array,
  },
  data() {
    return {
      accessToken: "pk.eyJ1IjoiYXN0aWtpbiIsImEiOiJjbGJkZDF5NGwwMDl0M3BvMDhocTljMGs5In0.ynCQEC2NEX1PfFQkafdTRQ",
      mapStyle: "mapbox://styles/mapbox/dark-v11", // your map style
      geoJsonSources: [],
      geoJsonlayer: {
        type: "line",
        layout: {
          visibility: "visible",
        },
        paint: {
          "line-color": "#00ffff",
          "line-width": 5,
        },
      },
      mapCenter: [6.040129727, 51.415623313],
      // isOpen: true,
      // markerX: 6.040129727,
      // markerY: 51.415623313,
    };
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  mounted() {
    fetch("path.json")
      .then((res) => res.json())
      .then((data) => {
        this.geoJsonSources = data.map((geo) => ({
          type: "geojson",
          data: {
            id: geo.id,
            name: geo.name,
            type: "Feature",
            geometry: geo.geom,
            year: geo.year,
          },
        }));
        console.log(this.geoJsonSources[0].data);
      });
  },
  methods: {
    handleRouteClick(e) {
      this.$refs.mapRef.actions.flyTo({
        center: e.mapboxEvent.lngLat,
        zoom: 12,
        speed: 2,
      });
      this.$emit("handle-open-modal", e.layerId);
    },
  },
};
</script>

<style lang="scss" scoped></style>
