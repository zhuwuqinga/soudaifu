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
			<navigator :url="'/pages/articleDetail/articleDetail?url='+item.h5Url+'&name='+item.infoName" hover-class="none" class="item flex" v-for="item in list" :key="item.id">
				<view class="left">
					<view class="text_more2" v-text="item.infoName"></view>
					<view class="times flex_y_center">
						<view>
							<text v-text="item.authorLevel?item.authorLevel:''"></text>
							<text style="margin-left: 10rpx;" v-text="item.authorName?item.authorName:''"></text>
						</view>
						<view class="flex_y_center">
							<image src="../../static/images/watch_num.png" mode=""></image>
							<view v-text="item.readTime"></view>
						</view>
					</view>
				</view>
				<image class="right" :src="item.coverPicUrl" mode=""></image>
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
				title: "",
				pageNo:1,
				pageSize:10,
				list : [],
				searchTxt:'',
				id : 0
			}
		},
		onLoad(options) {
			// console.log(options)
			this.id = options.id
			if(options.id == 11){
				this.title = '专家专刊'
				uni.setNavigationBarTitle({
					title:'专家专刊'
				})
			}else{
				this.title = '健康课堂'
				uni.setNavigationBarTitle({
					title:'健康课堂'
				})
			}
		},
		onShow(){
			this.loaddata(this.id,this.pageNo,this.pageSize,this.searchTxt)
		},
		onReachBottom(){
			
		},
		methods: {
			
			loaddata(id,pageNo,pageSize,infoName) {
				// console.log(this.$api.healty.listExpertInfo)
				uni.showLoading({
					title: '正在加载中...'
				})
				uni.request({
					url: id==11 ? this.$api.healty.listExpertInfo : this.$api.healty.listAuscultation,
					method: 'post',
					data: {
						"infoName": infoName,
						"infoType": id,
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
	@import "../../static/css/special.scss";
</style>
