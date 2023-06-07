<script setup lang="ts">
import IMap from "../components/IMap.vue";
</script>

<template>
  <div id="MainPage">
      <div><a href="https://alianzatic.org/" target="_blank"><img src="src\assets\logo-alianza-eslogan.png"
          style="float: left; padding: 15px;" width="250" height="50" alt="Alianza TIC"></a>
      </div>
      <div style="font-size: 30px;"><strong>Plataforma Calle Inteligente </strong></div>
    <div><strong>Dispositivos IOT activos: 0 dispositivo(s)</strong></div>
    <div>
      <hr style="
          height: 10px;
          background-color: #9b9b9b;
        ">
    </div>
    <IMap></IMap>

  </div>
</template>


