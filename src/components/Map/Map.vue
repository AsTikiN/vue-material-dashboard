<template>
  <div class="mapWrapper">
    <MglMap
      ref="mapRef"
      id="map"
      :center="[18.61731, 54.37629]"
      :zoom="5"
      :accessToken="accessToken"
      :mapStyle="mapStyle"
    >
      <!-- <MglMarker :coordinates="[18.61731, 54.37629]" color="blue">
      <MglPopup>
        <VCard>
        <div>Hello, I'm popup!</div>
        </VCard>
      </MglPopup>
      </MglMarker>-->
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
    // MglMarker,
    // MglPopup,
    MglGeojsonLayer,
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiYXN0aWtpbiIsImEiOiJjbGJkZDF5NGwwMDl0M3BvMDhocTljMGs5In0.ynCQEC2NEX1PfFQkafdTRQ",
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
    };
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  mounted() {
    fetch("path.json")
      .then((res) => res.json())
      .then(
        (data) =>
          (this.geoJsonSources = data?.map((json) => ({
            type: "geojson",
            data: {
              id: json.id,
              name: json.name,
              type: "Feature",
              geometry: json.geom,
              year: json.year,
            },
          })))
      );
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

<style lang="scss" scoped>
.geoLayer:hover {
  cursor: p;
}
</style>
