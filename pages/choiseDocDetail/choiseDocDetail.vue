<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="doc_info flex">
			<image class="left" :src="docDetail.avatar" mode=""></image>
			<view class="right">
				<view class="flex_y_center">
					<view class="name" v-text="docDetail.doctorName"></view>
					<view class="doc_level" v-text="docDetail.titleName">主任医生</view>
					<view class="collect">关注</view>
				</view>
				<view class="hospital" v-text="docDetail.organizationName"></view>
				<view class="flex_y_bottom">
					<navigator hover-class="none" :url="'/pages/consultingRoom/consultingRoom?id='+docDetail.doctorId">进入诊室</navigator>
					<view class="see_num" v-text="docDetail.askNum?'问诊量 '+docDetail.askNum:'问诊量 0'"></view>
				</view>
			</view>
		</view>
		<navigator hover-class="none" class="doc_detail" :url="'/pages/docDetail/docDetail?id='+docDetail.doctorId">
			<text style="font-weight: bold;color: #333;">擅长：</text>
			<text v-text="docDetail.professional"></text>
			<text style="color: #00BE72;margin-left: 10rpx;">医生信息</text>
		</navigator>
		<view class="choice flex">
			<view :class="curindex==index?'choice_item flex_all_center2 active':'choice_item flex_all_center2' " v-for="(item,index) in askList"
			 :key="index" @click="itemClick(index)">
				<view class="c_title" v-text="item.medClassName"></view>
				<view class="flex_y_bottom"><text>￥</text>{{item.price}}</view>
				<image v-show="curindex==index" class="choice_doc" src="../../static/images/choice_doc.png" mode=""></image>
			</view>
		</view>
		<view class="inquiry_box">
			<view class="flex_y_center more">
				<view>历史问诊</view>
				<!-- <navigator hover-class="none" class="flex_y_center">
					<view class="">查看更多</view>
					<image src="../../static/images/user3.png" mode=""></image>
				</navigator> -->
			</view>
			<!-- <view class="list">
				<navigator hover-class="none" class="item">
					<view class="text_more">男33岁/内分泌性中二炎症</view>
					<view class="text_more2">11岁男孩，鼻腔腺体肿大，左耳分泌性中耳炎，2018年12月做过鼻腔腺样体切除和抽取股室积液的手术，但是咽鼓管不通，发</view>
				</navigator>
				<navigator hover-class="none" class="item">
					<view class="text_more">男33岁/内分泌性中二炎症</view>
					<view class="text_more2">11岁男孩，鼻腔腺体肿大，左耳分泌性中耳炎，2018年12月做过鼻腔腺样体切除和抽取股室积液的手术，但是咽鼓管不通，发</view>
				</navigator>
			</view> -->
		</view>
		<view class="btn flex_all_center">
			<view v-text="priceTxt" @click="navigate"></view>
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
				title: "",
				docDetail: {
					avatar: '',
					doctorName: '',
					titleName: ''
				},
				askList: [],
				curindex: 0,
				price: 0,
				priceTxt: '',
				askType : ''
			}
		},
		onLoad(options) {
			this.loadDoc(options.id)
			this.listAskConfig(options.id)
		},
		methods: {
			navigate(){
				let formData = {
					amount : this.price,
					askType : this.askType,
					deptCode : this.docDetail.deptCode,
					deptId : this.docDetail.deptId,
					doctorId : this.docDetail.doctorId,
					orgId  : this.docDetail.organizationId
				}
				wx.navigateTo({
					url:"/pages/diseaseDescription/diseaseDescription?formData=" + JSON.stringify(formData)
				})
			},
			
			itemClick(e) {
				console.log(e)
				this.curindex = e
				this.askType = this.askList[e].medClassCode
				this.price = this.askList[e].price
				this.priceTxt = this.askList[e].medClassName + '￥' + this.askList[e].price + '元/次'
			},
			// 获取医生
			loadDoc(id) {
				const that = this
				let user_id = uni.getStorageSync('user_info').userId
				uni.showLoading({
					title: '正在加载...'
				})
				uni.request({
					url: that.$api.user.getDoc,
					header: {
						"token": uni.getStorageSync('user_info').token
					},
					data: {
						"doctorId": id,
						"userId": user_id
					},
					success(res) {
						uni.hideLoading()
						if (res.data.status == 200) {
							that.docDetail = res.data.data
							that.title = res.data.data.doctorName + res.data.data.titleName
						} else if (res.data.status == 1001) {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					}
				})
			},

			// 获取医生配置
			listAskConfig(id) {
				const that = this
				let user_id = uni.getStorageSync('user_info').userId
				uni.showLoading({
					title: '正在加载...'
				})
				uni.request({
					url: that.$api.user.listAskConfig,
					header: {
						"token": uni.getStorageSync('user_info').token
					},
					data: {
						"doctorId": id
					},
					success(res) {
						uni.hideLoading()
						if (res.data.status == 200) {
							let data = res.data.data
							for(let i in data){
								data[i].price = parseFloat(data[i].price/100).toFixed(2)
							}
							that.askList = data
							that.price = data[0].price
							that.askType = data[0].medClassCode
							that.priceTxt = data[0].medClassName + '￥' + data[0].price + '元/次'
						} else if (res.data.status == 1001) {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/choiseDocDetail.scss"
</style>
