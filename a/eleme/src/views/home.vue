<template>
  <div class="home">
    <header>
      <label for="">
        <input type="search" v-model="password">
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
            <button class="shoping-sub icon-minus" @click="s_sub(itemnindex)">-</button>
            <span>{{item.num}}</span>
            <button class="shoping-ad icon-plus" @click="s_add(itemnindex)">+</button>
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
export default ({
  name:'home',
  data(){
    return{
      password:'',
      search_ico:'',
      goods_cls:[],
      goods:[],
      cur_goods_cls:0,
      showShoppingCart:false,
      shopping_cart:[
        {
          id:1,
          name:'红烧肉',
          price:6,
          num:7
        }
        ],
        totalNum:10,
        totalPrice:10
    }
  },
   methods:{
      search(){

      },
      order(id,event){
        id
        event
      },
      clearShopping(){

      },
      s_add(item){
item
      },
      s_sub(item){
        item
      },
      pay(){

      }
    },
    created(){
      axios.get('/data.json')
      .then(res=>{
        this.goods = res.data.goods
        this.goods_cls = res.data.goods_cls
      })
    }
})
</script>