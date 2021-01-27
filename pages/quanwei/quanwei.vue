<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="search">
			<view class="flex_all_center">
				<image src="../../static/images/index_search_icon.png" mode=""></image>
				<input type="text" value="" placeholder="请输入..." />
			</view>
		</view>
		<view class="list" v-if="list.length>0">
			<navigator hover-class="none" class="item" :url="'/pages/articleDetail/articleDetail?url='+item.h5Url+'&name='+item.infoName" v-for="item in list" :key="item.id">
				<view class="flex_y_center">
					<view class="text_more" v-text="item.infoName"></view>
					<view class="times" v-text="item.readTime+'浏览'"></view>
				</view>
				<view class="content" v-text="item.shortContent"></view>
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
				title: "权威期刊",
				pageNo:1,
				pageSize:10,
				list : [],
				searchTxt:''
			}
		},
		onLoad(options) {
			
		},
		onShow(){
			this.loaddata(this.pageNo,this.pageSize,this.searchTxt)
		},
		onReachBottom(){
			
		},
		methods: {
			
			loaddata(pageNo,pageSize,infoName) {
				console.log(this.$api.healty.listExpertInfo)
				uni.showLoading({
					title: '正在加载中...'
				})
				uni.request({
					url: this.$api.healty.listPeriodical,
					method: 'post',
					data: {
						"infoName": infoName,
						"offset": 0,
						"pageNo": pageNo,
						"pageSize": pageSize,
						"platform": 0
					},
					success: res => {
						uni.hideLoading()
						console.log(res)
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
	@import "../../static/css/quanwei.scss";
</style>
