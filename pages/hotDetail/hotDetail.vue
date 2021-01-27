<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="top flex">
			<image :src="topPicUrl" mode=""></image>
			<view class="top_right">
				<view class="text_more2" v-text="topTitle"></view>
				<view class="times" v-text="topReadTimes"></view>
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="i_top flex_y_center">
					<image :src="item.authorPic" mode=""></image>
					<view class="i_center">
						<view class="i_name" v-text="item.authorName"></view>
						<view class="i_level" v-text="item.authorNote"></view>
					</view>
					<view class="flex_all_center">
						<image src="../../static/images/collect.png" mode=""></image>
						<text>关注</text>
					</view>
				</view>
				<view class="i_content" v-text="item.shortContent"></view>
				<view class="i_botomm flex_y_center">
					<view class="flex_all_center">
						<image src="../../static/images/like.png" mode=""></image>
						<text v-text="item.likes"></text>
					</view>
					<view class="flex_all_center">
						<image src="../../static/images/shoucang.png" mode=""></image>
						<text v-text="item.collections"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from "../../components/header/Header.vue"
	export default {
		components: {
			Header
		},
		data() {
			return {
				title: "热门话题",
				id : 0,
				topTitle:'',
				topPicUrl:'',
				topReadTimes:'',
				list:[]
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow(){
			this.loaddata(this.id)
		},
		onReachBottom(){
			
		},
		methods: {
			loaddata(id) {
				uni.showLoading({
					title: '正在加载中...'
				})
				uni.request({
					url: this.$api.healty.listHotSubject,
					method: 'post',
					data: {
						"parentId": id,
						"userId": 11
					},
					success: res => {
						uni.hideLoading()
						// console.log(res)
						if(res.data.status==200){
							this.topTitle = res.data.data.pname
							this.topPicUrl = res.data.data.picUrl
							this.topReadTimes = res.data.data.readTimes
							this.list = res.data.data.subjectRespsInfos
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
	@import "../../static/css/hotDetail.scss";
</style>
