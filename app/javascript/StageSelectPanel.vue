<template>
  <div class="panel panel-1">
    <div class="panel-number">{{ panelNumber }}</div>
    <ul class="tiles-container">
      <li v-for="tileIndex in 5" :key="tileIndex">
        <stage-panel-tile :number="tileNumber(tileIndex)"></stage-panel-tile>
      </li>
    </ul>
  </div>
</template>

<script>
import StagePanelTile from './StagePanelTile.vue'
export default {
  components: {
    'stage-panel-tile': StagePanelTile
  },
  props: {
    panelNumber: {
      type: Number,
      default: null
    },
    piDigits: {
      type: String,
      default: null
    }
  },
  methods: {
    tileNumber(tileIndex) {
      return this.piDigits.substr((tileIndex - 1) * 2, 2)
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
  text-align: center;
}
.panel {
  display: flex;
  padding-top: 10px;
  padding-right: 20px;
  margin-bottom: 20px;
}
.panel-1 {
  background-color: #ff88bb;
  border-radius: 5px;
}
.panel-number {
  color: #ffffff;
  font-size: 20px;
  margin-top: 30px;
  margin-left: 30px;
}
.tiles-container {
  display: flex;
  width: 250px;
}
</style>
