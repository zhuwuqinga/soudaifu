<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="search">
			<view class="flex_all_center">
				<image src="../../static/images/index_search_icon.png" mode=""></image>
				<input type="text" value="" placeholder="请输入..." />
			</view>
		</view>
		<view class="list flex_wrap" v-if="list.length>0">
			<navigator hover-class="none" :url="'/pages/hotDetail/hotDetail?id='+item.id" class="item" v-for="item in list" :key="item.id">
				<image :src="item.picUrl" mode=""></image>
				<view class="text_more" v-text="item.hotName"></view>
				<view class="times" v-text="item.readTime+'浏览'"></view>
			</navigator>
		</view>
		<NotData v-else></NotData>
	</view>
</template>

<script>
	import Header from "../../components/header/Header.vue"
	import NotData from "../../components/notData/NotData.vue"
	export default {
		components: {
			Header,
			NotData
		},
		data() {
			return {
				title: "热门话题",
				pageNo:1,
				pageSize:10,
				list : [],
				searchTxt:''
			}
		},
		onLoad() {
			
		},
		onShow(){
			this.loaddata(this.pageNo,this.pageSize,this.searchTxt)
		},
		onReachBottom(){
			
		},
		methods: {
			loaddata(pageNo,pageSize,hotName) {
				uni.showLoading({
					title: '正在加载中...'
				})
				uni.request({
					url: this.$api.healty.listHot,
					method: 'post',
					data: {
						"hotName": hotName,
						"offset": 0,
						"pageNo": pageNo,
						"pageSize": pageSize
					},
					success: res => {
						uni.hideLoading()
						// console.log(res)
						if(res.data.status==200){
							this.list = res.data.data
						}else{
							uni.showToast({
								title:res.data.msg,
								icon: 'none'
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/hotList.scss";
</style>
