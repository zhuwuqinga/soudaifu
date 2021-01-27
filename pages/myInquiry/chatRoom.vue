<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		
	</view>
</template>

<script>
	import Header from "../../components/header/Header.vue"
	export default {
		components  : {
			Header
		},
		data() {
			return {
				title: "",
				detail : {
					sheetAskListResp:{
						docPhoto : ''
					}
				},
			}
		},
		onLoad(options) {
			this.loadData(options.id)
		},
		methods: {
			loadData(id){
				const that = this
				uni.showLoading({
					title:"正在加载..."
				})
				uni.request({
					url:that.$api.sheetAsk.getDetail,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"sheetId": id,
					},
					success:res=>{
						// console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							let data = res.data.data
							data.sheetAskListResp.amount = parseFloat(data.sheetAskListResp.amount/100).toFixed(2)
							that.detail = data
							uni.setNavigationBarTitle({
								title:data.sheetAskListResp.doctorName + ' ' + data.sheetAskListResp.doctorTitle
							})
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/refund.scss"
</style>
