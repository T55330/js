<template>
  <div>
    <img :src='src' alt='' />
    <p>{{ description }}</p>
    <p><router-link to='/'>主页</router-link></p>
  </div>
</template>
<script>
export default {
  name: 'detail',
  data () {
    return {
      src: '',
      description: ''
    }
  },
  created () {
    this.src = window.sessionStorage.getItem('src')
    this.description = window.sessionStorage.getItem('des')
  }
}
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
div {
  text-align: center;
}
</style>
