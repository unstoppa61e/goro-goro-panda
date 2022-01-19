<template>
  <ul class="panels-container">
    <li v-for="panelIndex in 10" :key="panelIndex">
      <stage-select-panel
        :panel-number="panelIndex"
        :pi-digits="panelPiDigits(panelIndex)"
      ></stage-select-panel>
    </li>
  </ul>
</template>

<script>
import StageSelectPanel from './StageSelectPanel'
export default {
  components: {
    'stage-select-panel': StageSelectPanel
  },
  computed: {
    piDigits() {
      return '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679'
    }
  },
  methods: {
    panelPiDigits(panelIndex) {
      return this.piDigits.substr((panelIndex - 1) * 10, 10)
    }
  }
}
</script>

<style scoped>
ul {
  padding-inline-start: 0;
}
li {
  list-style-type: none;
  text-align: center;
}
.panels-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
