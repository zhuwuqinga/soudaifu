<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="recome_list" v-if="list.length>0">
			<navigator :url="'/pages/articleDetail/articleDetail?url='+item.h5Url+'&name='+item.titleName" hover-class="none" class="recome_item" v-for="item in list" :key="item.id">
				<view class="text_more doctor_name" v-text="item.titleName"></view>
				<view class="flex_y_center">
					<view class="text_more" v-text="item.orgName"></view>
					<view class="flex_y_center">
						<image src="../../static/images/watch_num.png" mode=""></image>
						<view v-text="item.view"></view>
					</view>
				</view>
			</navigator>
		</view>
		<NotData v-else></NotData>
	</view>
</template>

<script>
	import Header from "../../components/header/Header.vue"
	import NotData from "../../components/notData/NotData.vue"
	export default {
		components  : {
			Header,
			NotData
		},
		data() {
			return {
				title: "",
				pageNo : 1,
				pageSize :10,
				type:0,
				list:[]
			}
		},
		onLoad(options) {
			
			if(options.id==5){
				this.title = "推荐医生"
				uni.setNavigationBarTitle({
					title:"推荐医生"
				})
			}else if(options.id==6){
				this.title = "优势病种"
				uni.setNavigationBarTitle({
					title:"优势病种"
				})
			}else if(options.id==7){
				this.title = "特色服务"
				uni.setNavigationBarTitle({
					title:"特色服务"
				})
			}else if(options.id==8){
				this.title = "设备设施"
				uni.setNavigationBarTitle({
					title:"设备设施"
				})
			}
			this.type = options.id
			
		},
		onShow() {
			this.loaddata(this.pageNo,this.pageSize,this.type)
		},
		methods: {
			loaddata(pageNo,pageSize,type) {
				uni.showLoading({
					title: '正在加载中...'
				})
				uni.request({
					url: this.$api.healty.listSpecialService,
					method: 'post',
					data: {
						"offset": 0,
						"orgId": 0,
						"pageNo": pageNo,
						"pageSize": pageSize,
						"type":type
					},
					success: res => {
						uni.hideLoading()
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recome_list{
		.recome_item{
			padding: 20rpx;
			background: #fff;
			margin-bottom: 20rpx;
			.doctor_name{
				font-size: 30rpx;
				font-weight: bold;
				margin-bottom: 20rpx;
			}
			.flex_y_center{
				font-size: 24rpx;
				.text_more{
					width: 600rpx;
				}
				.flex_y_center{
					margin-left: auto;
					image{
						width: 32rpx;
						height: 32rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>
