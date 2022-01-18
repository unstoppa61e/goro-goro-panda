<template>
  <img :src="imgSrc" class="wordplay-img" alt="wordplay" />
  <!--  動かない-->
  <div class="number">{{ number }}</div>
  <!--  これなら動く-->
  <!--  <img src="~wordplays/14.png" class="wordplay-img" alt="wordplay" />-->
</template>

<script>
export default {
  props: ['number'],
  computed: {
    imgSrc() {
      return `~wordplays/${this.number}.png`
    }
  }
}
</script>

<style scoped>
.wordplay-img {
  max-width: 100%;
  max-height: 100%;
}
.number {
  color: #ffffff;
  font-size: 30px;
}
</style>
