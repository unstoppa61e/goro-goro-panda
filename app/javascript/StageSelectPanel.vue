<template>
  <div class="panel" :class="{unlocked:isOne(panelNumber)}">
    <div class="panel-number">{{ panelNumber }}</div>
    <ul class="tiles-container">
      <li v-for="tileIndex in 5" :key="tileIndex">
        <stage-panel-tile :number="tileNumber(tileIndex)" :locked="!isOne(panelNumber)"></stage-panel-tile>
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
    },
    isOne(panelNumber) {
      return (panelNumber === 1)
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
  border-radius: 5px;
  background-color: #b7d6e8;
}
.unlocked {
  background-color: #ff88bb;
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
