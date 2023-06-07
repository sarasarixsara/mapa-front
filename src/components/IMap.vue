<script setup lang="ts">
import { onMounted, ref } from "vue";
import markerIcon from "../assets/punto.png";
import { DevicesRepsository } from "../repositories/implementation/mocked/DevicesRespository"
import { Device } from "../entities/Device";
import Target from "ol/events/Target";

const center = ref([-75.23222, 4.43889]); // TODO replace from pinia config of business
const projection = ref("EPSG:4326");
const zoom = ref(13);
const rotation = ref(0);
const devices = ref (<Device[]> ([]));

const loadDevices = async () => {
  const devicesRepository = new DevicesRepsository()
  devices.value = await devicesRepository.index()
  console.log(devices.value[0].geometry.coordinates);
   // console.log (devices.map(device => device.geometry.coordinates))
}

onMounted(() => {
  loadDevices();
});

//point
const overrideStyleFunction = (feature: any , style: any) => {
  const clusteredFeatures = feature.get("features");
  const size = clusteredFeatures.length;

  const color = size > 20 ? "192,0,0" : size > 8 ? "255,128,0" : "0,128,0";
  const radius = Math.max(8, Math.min(size, 20));
  const dash = (2 * Math.PI * radius) / 6;
  const calculatedDash = [0, dash, dash, dash, dash, dash, dash];

  style.getImage().getStroke().setLineDash(dash);
  style
    .getImage()
    .getStroke()
    .setColor("rgba(" + color + ",0.5)");
  style.getImage().getStroke().setLineDash(calculatedDash);
  style
    .getImage()
    .getFill()
    .setColor("rgba(" + color + ",1)");

  style.getImage().setRadius(radius);

  style.getText().setText(size.toString());
};

const getRandomInRange = (from: any, to: any, fixed: any) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
};

const featureSelected = (event: any) => {
  console.log('prueba de ingreso',event);
};
</script>

<template>
  <div id="MapContainer">
    <!-- <button type="button" @click="loadDevices">Press me</button> -->
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 400px">
      <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />
      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
      <ol-interaction-clusterselect @select="featureSelected" :pointRadius="20">
        <ol-style>
          <ol-style-stroke color="green" :width="5"></ol-style-stroke>
          <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
          <ol-style-icon :src="markerIcon" :scale="0.05"></ol-style-icon>
        </ol-style>
      </ol-interaction-clusterselect>
      <ol-animated-clusterlayer :animationDuration="500" :distance="40">
        <ol-source-vector ref="vectorsource">
          <ol-feature v-for="device in devices" :key="device">
            <ol-geom-point :coordinates="device.geometry.coordinates"></ol-geom-point>
          </ol-feature>
        </ol-source-vector>

        <ol-style :overrideStyleFunction="overrideStyleFunction">
          <ol-style-stroke color="red" :width="2"></ol-style-stroke>
          <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>

          <ol-style-circle :radius="20">
            <ol-style-stroke color="black" :width="15" :lineDash="[]" lineCap="butt"></ol-style-stroke>
            <ol-style-fill color="black"></ol-style-fill>
          </ol-style-circle>

          <ol-style-text>
            <ol-style-fill color="white"></ol-style-fill>
          </ol-style-text>
        </ol-style>
      </ol-animated-clusterlayer>
    </ol-map>
  </div>
</template>


