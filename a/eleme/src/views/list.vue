<template>
    <div class="list">
        <header>
            <h1>xxx</h1>
            <router-link to="/home" class="goback-btn icon-chevron-left"></router-link>
            <span class="total">a{{search_list.length}}b</span>
        </header>
        <ul id="scrollMenu" class="good-list">
            <li v-for='(item,index) in search_list' :key='index'>
                <img :src="item.img" @click="show_detail(item)" alt="">
                <h4>{{item.name}}</h4>
                <p>{{item.description}}</p>
                <strong>${{item.price}}</strong>
                <button @click='pointer(item)' :class='["point-btn",item.checked?"ac":""]' :disable='item.checked'>

                </button>

            </li>
        </ul>
        <div style="text-align=center" v-if='search_list.length==0'></div>
    </div>
</template>
<script>
export default ({
    name: 'list',
    date(){
        return {
            shopping_cart:[],
            search_list:[],
            keyword:''
        }
    },
    created(){
        this.keyword = this.$store.state.keyword
        this.goods = this.$store.state.goods
        this.shopping_cartb = this.$store.shopping_cart
        for(let key in this.goods){
            if(this.goods[key].name.includes(this.keywords)&& this.keyword != ''){
                this.search_list.push(this.goods[key])
            }
        }
    }
})
</script>

