<template>
  <MglMap ref="mapRef" id="map" :center="[18.61731, 54.37629]" :zoom="5" :accessToken="accessToken"
    :mapStyle="mapStyle">
    <!-- <MglMarker :coordinates="[18.61731, 54.37629]" color="blue">
      <MglPopup>
        <VCard>
        <div>Hello, I'm popup!</div>
        </VCard>
      </MglPopup>
    </MglMarker> -->
    <MglGeojsonLayer @click="handleRouteClick" v-for="source of geoJsonSources" :key="source.data.id"
      :sourceId="source.data.id" :source="source" :layerId="source.data.id" :layer="geoJsonlayer" />
  </MglMap>
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
        // pickable: true,
        // stroked: false,
        // filled: true,
        // extruded: true,
        // pointType: 'fill',
        // lineWidthScale: 20,
        // lineWidthMinPixels: 2,
        // getPointRadius: 100,
        // getLineWidth: 1,
        // getElevation: 30,
        paint: {
          "line-color": "#00ffff",
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
          }
        })))
      );
  },
  methods: {
    handleRouteClick(e) {
      console.log(123)
      this.$refs.mapRef.actions.flyTo({
        center: e.mapboxEvent.lngLat,
        zoom: 12,
        speed: 2,
      })
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
