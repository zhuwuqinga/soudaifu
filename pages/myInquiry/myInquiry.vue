<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<scroll-view scroll-x="true" class="tab_list">
			<view class="tab_item" @click="tabClick(-1)">
				<view :class="status==-1?'tab_title active':''">全部</view>
				<!-- <view class="tab_num">1</view> -->
			</view>
			<view class="tab_item" @click="tabClick(0)">
				<view :class="status==0?'tab_title active':''">待支付</view>
				<!-- <view class="tab_num">1</view> -->
			</view>
			<view class="tab_item" @click="tabClick(1)">
				<view :class="status==1?'tab_title active':''">待就诊</view>
				<!-- <view class="tab_num">1</view> -->
			</view>
			<view class="tab_item" @click="tabClick(2)">
				<view :class="status==2?'tab_title active':''">进行中</view>
				<!-- <view class="tab_num">1</view> -->
			</view>
			<view class="tab_item" @click="tabClick(3)">
				<view :class="status==3?'tab_title active':''">待评价</view>
				<!-- <view class="tab_num">1</view> -->
			</view>
			<view class="tab_item" @click="tabClick(5)">
				<view :class="status==5?'tab_title active':''">退款/售后</view>
				<!-- <view class="tab_num">1</view> -->
			</view>
		</scroll-view>
		<view class="inquiry_list" v-if="orderList.length>0">
			<view @click="itemClick(item.sheetId)" class="inquiry_item" v-for="(item,index) in orderList" :key="index">
				<view class="flex_y_center item_top">
					<image class="inquiry_avt" :src="item.docPhoto" mode=""></image>
					<view class="inquiry_name" v-text="item.doctorName+item.doctorTitle"></view>
					<view class="inquiry_hospital" v-text="item.orgName"></view>
					<image class="inquiry_right" src="../../static/images/user3.png" mode=""></image>
					<view v-show="item.sheetPresTag==1" class="inquiry_yao">药</view>
				</view>
				<view class="item_bottom">
					<view class="ib_title flex_y_center">
						<view v-text="item.askType"></view>
						<view class="ibt_right" v-text="'￥'+item.amount"></view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">问诊详情：</view>
						<view class="text_more" v-text="item.askDetail"></view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊人：</view>
						<view class="text_more" v-text="item.patientName+' '+item.patientSex+' '+item.patientAge+'岁'"></view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">问诊时间：</view>
						<view class="text_more" v-text="item.createTime"></view>
					</view>
				</view>
				<view class="btn_list flex_y_center">
					<view class="btns" v-if="item.sheetStatus==0">
						<view @click.stop="pay(item.sheetId)" class="inquiry_btn active">支付</view>
					</view>
					<view class="btns flex" v-else-if="item.sheetStatus==1">
						<view @click.stop="navAsk(item.sheetId)" class="inquiry_btn">开始问诊</view>
						<view @click.stop="navRefund(item.sheetId)" class="inquiry_btn">申请退款</view>
					</view>
					<view class="btns flex" v-else-if="item.sheetStatus==2">
						<view @click.stop="navAsk(item.sheetId)" class="inquiry_btn active">进行中</view>
					</view>
				</view>
			</view>
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
				title: "我的问诊",
				status : -1,
				pageNo:1,
				pageSize:10,
				orderList:[]
			}
		},
		onLoad() {
			this.loadData(this.status,this.pageNo,this.pageSize)
		},
		methods: {
			pay(e){
				console.log(e)
			},
			
			navRefund(e){
				uni.navigateTo({
					url:'refund?id='+e
				})
			},
			
			itemClick(e){
				uni.navigateTo({
					url:'detail?id=' + e
				})
			},
			
			navAsk(e){
				uni.navigateTo({
					url:'chatRoom?id=' + e
				})
			},
			
			
			tabClick(e){
				this.status = e
				this.loadData(e,1,10)
			},
			loadData(status,pageNo,pageSize){
				const that = this
				uni.showLoading({
					title:"正在加载..."
				})
				uni.request({
					url:that.$api.sheetAsk.listAsk,
					method:'post',
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"appType": 1,
						// "orgId": 0,
						"pageNo": pageNo,
						"pageSize": pageSize,
						"sheetStatus": status==-1?'':status,
						"userId": uni.getStorageSync('user_info').userId
					},
					success:res=>{
						// console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							let data = res.data.data
							for(let i in data){
								data[i].amount = parseFloat(data[i].amount/100).toFixed(2)
								data[i].upgradeAmount = parseFloat(data[i].upgradeAmount/100).toFixed(2)
							}
							that.orderList = data
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
	@import "../../static/css/myInquiry.scss"
</style>
