<template>
    <div class="list">
        <header>
            <h1>搜索结果</h1>
            <router-link to='/home' class="goback-btn icon-chevron-left"></router-link>
            <span class="total">共{{search_list.length}}条</span>
        </header>
        <ul id="scrolMenu" class="good-list">
            <li v-for='(item,index) in search_list' :key='index'>
                <img :src="item.img" @click="show_detail(item)"/>
                <h4>{{item.name}}</h4>
                <p>{{item.description}}</p>
                <strong>￥{{item.price}}</strong>
                <button @click="pointer(item)" 
                :class="['pointer-btn',item.checked ? 'ac' : '']" :disabled="item.checked">
                         <b>点餐</b><i>已点</i>
                </button>
                </li>
        </ul>
                <div style='text-align=center' v-if='search_list.length=0'>没有搜到结果！</div>
    </div>
</template>
<script>
export default ({
    name: 'list',
    data(){
        return {
            shopping_cart:[],
            search_list:[],
            keyword:''
        }
    },
    created(){
        // console.log(1);
        this.keyword = this.$store.state.keyword
        this.goods = this.$store.state.goods
        console.log(this.goods);
        this.shopping_cartb = this.$store.shopping_cart
        // console.log(1);
        for(let key in this.goods){
            // console.log(1);
            if(this.goods[key].name.includes(this.keyword)&& this.keyword != ''){
                this.search_list.push(this.goods[key])
                // console.log(1);
            }
        }
    }
})
</script>

