<template>
  <ul class="panels-container">
    <li class="panel panel-1">
      <ul class="tiles-container">
        <li v-for="number in numbers" :key="number" class="tile">
          <stage-panel-tile :number="number"></stage-panel-tile>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import StagePanelTile from './StagePanelTile.vue'
export default {
  components: {
    'stage-panel-tile': StagePanelTile
  },
  data() {
    return {
      numbers: ['14', '15', '92', '65', '35']
    }
  },
  methods: {}
}
</script>

<style scoped>
ul {
  padding-inline-start: 0;
}
.panel {
  list-style: none;
  text-align: center;
}
.tiles-container {
  display: flex;
  width: 250px;
}
.tile {
  list-style-type: none;
  text-align: center;
}
/*.wordplay-img {*/
/*  max-width: 100%;*/
/*  max-height: 100%;*/
/*}*/
/*.number {*/
/*  color: #ffffff;*/
/*  font-size: 30px;*/
/*}*/
.panels-container {
  display: flex;
  justify-content: center;
}
.panel-1 {
  background-color: #ff88bb;
  border-radius: 5px;
}
</style>
