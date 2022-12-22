<template>
  <MglMap id="map" :center="[18.61731, 54.37629]" :zoom="5" :accessToken="accessToken" :mapStyle="mapStyle">
    <!-- <MglMarker :coordinates="[18.61731, 54.37629]" color="blue">
      <MglPopup>
        <VCard>
        <div>Hello, I'm popup!</div>
        </VCard>
      </MglPopup>
    </MglMarker> -->
    <MglGeojsonLayer :sourceId="geoJsonSource.data.id" :source="geoJsonSource" layerId="myLayerId"
      :layer="geoJsonlayer" />
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
    MglGeojsonLayer
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiYXN0aWtpbiIsImEiOiJjbGJkZDF5NGwwMDl0M3BvMDhocTljMGs5In0.ynCQEC2NEX1PfFQkafdTRQ",
      mapStyle: "mapbox://styles/mapbox/dark-v11", // your map style
      geoJsonSource: {
        type: "geojson",
        'data': {
          id: "test",
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            // These coordinates outline Maine.
            'coordinates': [
              [
                [-67.13734, 45.13745],
                [-66.96466, 44.8097],
                [-68.03252, 44.3252],
                [-69.06, 43.98],
                [-70.11617, 43.68405],
                [-70.64573, 43.09008],
                [-70.75102, 43.08003],
                [-70.79761, 43.21973],
                [-70.98176, 43.36789],
                [-70.94416, 43.46633],
                [-71.08482, 45.30524],
                [-70.66002, 45.46022],
                [-70.30495, 45.91479],
                [-70.00014, 46.69317],
                [-69.23708, 47.44777],
                [-68.90478, 47.18479],
                [-68.2343, 47.35462],
                [-67.79035, 47.06624],
                [-67.79141, 45.70258],
                [-67.13734, 45.13745]
              ]
            ]
          }
        }
      },
      geoJsonlayer: {
        type: "line",
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
          "line-color": "#00ffff"
        }
      },
    }
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
};
</script>

<style lang="scss" scoped>

</style>
