<template>
  <div class="home">
    <header>
      <label for="">
        <input type="search" v-model="keyword" :placeholder="search_ico">
        <button class="search-btn" @click="search">搜索</button>
      </label>
    </header>
    <aside>
      <ul>
        <li v-for="(menu,index) in goods_cls" :class='{"ac":cur_goods_cls==menu.id}' :key="index" @click="changeMenu(index)">{{menu.name}}</li>
      </ul>
    </aside>
    <div style="width:100%;overflow:hidden;">
      <div class="order-bar animated bounceInRight">
        <div class="order-class" v-for="(item,index) in goods_cls" :key="index">
          <h3>{{item.name}}</h3>
          <ul class="good-list">
            <li v-for='(id,index) in item.goods' :key="index">
              <router-link :to='{name:"detail",params:{item:goods[id]}}'>
                <img :src="goods[id].img">
              </router-link>
              <h4>{{goods[id].name}}</h4>
              <p class="ellipsis">{{goods[id].describe}}</p>
              <strong>￥{{goods[id].price}}</strong>
              <button @click="order(goods[id],$event)" :class='["pointer-btn",goods[id].checked?"ac":""]' :disabled='goods[id].checked'>
                <b>点餐</b><i>已点</i>
              </button>
            </li>
          </ul>

        </div>
      </div>
    </div>

    <footer>
      <div class="shoping-cart animated" :class='{"bounceInUP":showShoppingCart,"shoping-list-slide":showShoppingCart}'>
          <div class="empty">
            <span class="icon-trash" @click="clearShopping"></span>
          </div>
      <ul v-if="shopping_cart.length>0">
        <li v-for='(item,index) in shopping_cart' :key="index">
          {{item.name}}
          <em>￥{{item.price}}</em>
          <div>
            <button class="shoping-sub icon-minus" @click="s_sub(item,index)"></button>
            <span>{{item.num}}</span>
            <button class="shoping-ad icon-plus" @click="s_add(item)"></button>
          </div>
        </li>
      </ul>
      <ul v-else>
        <li style="text-align:center">你还没点菜！</li>
      </ul>
      <button id="shoppingBtn" class="shopping-btn icon-shopping-cart" @click="showShoppingCart=!showShoppingCart"></button>
      <span class="count" :class='{"hide":totalNum==0}'>{{totalNum}}</span>
    </div>
    <div class='cont'>
      <div class="order-pointer-footer">
        <div class="total">
          <em>￥{{totalPrice}}</em>
        </div>
        <a v-if="totalNum>0" class="pay-btn" @click="pay">去下单</a>
      </div>
    </div>
    </footer>
  </div>
</template>
<script>
import axios from 'axios'
import $ from 'jquery'
import par from '../assets/js/parabola'
export default({
  name:'home',
  data(){
    return{
      keyword:'',
      search_ico:"\ue903 请输入菜品名称",
      goods_cls:[],
      goods:[],
      cur_goods_cls:0,
      showShoppingCart:false,
      shopping_cart:[
        ],
        totalNum:0,
        totalPrice:0
    }
  },
  watch:{
    shopping_cart:{
      handler(curval){
        this.totalNum = 0 
        this.totalPrice = 0
       for (let i in this.goods){
         this.goods[i].checked = false
       }
       curval.forEach(item=>{
         this.totalPrice += item.num * item.price
         this.totalNum += item.num
         this.goods[item.id].checked = true
       })
      },
      deep:true
    }
  },
   methods:{
      search(){
          this.$store.commit('update_keyword',this.keyword);
          this.$router.push('/list')
      },
      order(item,event){
       this.shopping_cart.push({  
        id:item.id,
        name:item.name,
        price:item.price,
        num:1
       })
       let el = $('<div class="parabola-el"></div>')
       $(document.body).append(el)
       new par.parabola({
         origin:event.target,
         target:'#shoppingBtn',
         element:el,
         time:500,
         a:0.01,
         callback(el){
           el.remove()
         }
       }).move()
      },
      clearShopping(){
         this.showShoppingCart = !this.showShoppingCart
         this.shopping_cart = []
      },

      s_sub(item,index){
        item.num--
        if(item.num==0){
          this.shopping_cart.splice(index,1)
        }
      },
      s_add(item){
        item.num++
      },
       changeMenu(index){
      let aUl = $('.order-class')
      $(window).scrollTop(aUl.eq(index).position().top)
    },
      pay(){

      },
      winScroll(){
        let _this = this
        let scrollTop =  $(window).scrollTop()
        let oItem = $('.order-class')
        oItem.each(function(i){
          if($(this).offset().top<scrollTop+200){
            _this.cur_goods_cls = i + 1 
          }
        })
      }
    },
   
      mounted(){
        window.addEventListener('scroll',this.winScroll)
    },
    created(){
      axios.get('/data.json')
      .then(res=>{
        this.goods = res.data.goods
        this.goods_cls = res.data.goods_cls
        this.$store.commit('update_goods',this.goods);
      })
    }
})
</script>