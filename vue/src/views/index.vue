<template>
  <div>
    <da-jiang-you />
    <div v-for='(item, index) of menus' :key='index' @click='detail(item)'>
      <img :src='item.src' />
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>
<script>
import DaJiangYou from './sth.vue'
export default {
  name: 'index',
  components: {
    DaJiangYou
  },
  data () {
    return {
      menus: [
        { name: '红烧肉', src: require('../assets/fqfp.jpg'), des: 'aaaa' },
        { name: '红烧肉bbbb', src: require('../assets/fqfp.jpg'), des: 'bbbb' },
        { name: '红烧肉cccc', src: require('../assets/fqfp.jpg'), des: 'cccc' }
      ]
    }
  },
  methods: {
    detail (item) {
      window.sessionStorage.setItem('src', item.src)
      window.sessionStorage.setItem('des', item.des)
      this.$router.push('/detail')
    }
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
