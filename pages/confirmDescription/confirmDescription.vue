<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="list">
			<view class="item flex_y_center">
				<view class="title">患者信息</view>
				<view class="rihgt_cont" v-text="personDetail.patientName+' '+personDetail.sexText+' '+personDetail.age+'岁'"></view>
			</view>
			<view class="item flex_y_center">
				<view class="title">是否曾到实体医院就诊过</view>
				<view class="rihgt_cont" v-text="sheetAskAddReq.sheetAskBase.hasTag==1?'是':'否'"></view>
			</view>
			<view class="item flex_y_center" v-show="sheetAskAddReq.sheetAskBase.hasTag==1">
				<view class="title">医院医生诊断结果</view>
				<view class="rihgt_cont" v-text="sheetAskAddReq.sheetAskBase.diseaseName"></view>
			</view>
		</view>
		<view class="tishi">
			<view class="t_title">
				<image style="display: inline-block;" src="../../static/images/tips.png" mode=""></image>
				<view style="display: inline;" class="">温馨提示：确认问诊即代表您已阅读并同意《互联网诊疗风险告知及知情同意书》</view>
			</view>
		</view>
		<view class="btn flex_all_center">
			<view @click="showPay">确认问诊</view>
		</view>
		<view class="cups" v-show="pay_cups">
			<view class="cup_box">
				<view class="pay_box">
					<view class="pay_item flex_y_center" @click="wxPay">
						<view class="flex_all_center">
							<image style="width: 48rpx;height: 38rpx;" src="../../static/images/wx_pay.png" mode=""></image>
						</view>
						<view>微信支付</view>
						<view class="pay_price" v-text="'￥'+sheetAskAddReq.sheetAskBase.amount"></view>
					</view>
					<!-- <view class="pay_item flex_y_center">
						<view class="flex_all_center">
							<image style="width: 46rpx;height: 46rpx;" src="../../static/images/zfb_icon.png" mode=""></image>
						</view>
						<view>支付宝支付</view>
						<view class="pay_price">￥19.00</view>
					</view> -->
				</view>
				<view class="cancel" @click="cancle">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from "../../components/header/Header.vue"
	var jweixin = require('jweixin-module')
	export default {
		components: {
			Header
		},
		data() {
			return {
				title: "确认问诊",
				pay_cups: false,
				sheetAskAddReq: {},
				personDetail: {
					patientName: '',
					sexText: '',
					age: '',
				}
			}
		},
		onLoad(options) {
			let sheetAskAddReq = JSON.parse(options.sheetAskAddReq)
			this.sheetAskAddReq = sheetAskAddReq
			this.sheetAskAddReq.sheetAskBase.userId = uni.getStorageSync('user_info').userId
			this.loadPerson(sheetAskAddReq.sheetAskBase.patientId)
		},
		methods: {
			wxPay() {
				const that = this
				uni.showLoading({
					title: "",
					mask: true
				})
				uni.request({
					url: that.$api.sheetAsk.create,
					method: "post",
					header: {
						"token": uni.getStorageSync('user_info').token
					},
					data: that.sheetAskAddReq,
					success(res) {
						if (res.data.status == 200) {
							that.loadPayData(res.data.data.sheetId)
						} else if (res.data.status == 1001) {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					}
				})
			},
			loadPayData(sheetId) {
				const that = this
				console.log(jweixin)
				uni.showLoading({
					title: "",
					mask: true
				})
				uni.request({
					url: that.$api.user.jsapiPay,
					method: "post",
					header: {
						"token": uni.getStorageSync('user_info').token
					},
					data: {
						"openId": "string",
						"payType": 1,
						"sheetId": sheetId,
						"sheetType": 1
					},
					success(res) {
						console.log(res)
						
						// if(res.data.status==200){
						// 	that.payMoney()
						// }else if(res.data.status==1001){
						// 	uni.navigateTo({
						// 		url:'/pages/login/login'
						// 	})
						// }
					}
				})
			},
			payMoney(timeStamp,nonceStr,packageValue,paySign) {
				var self = this;
				jweixin.config({
					appId: "wx4291fe4d41fd251c", // 必填，公众号的唯一标识
					timestamp: timeStamp, // 必填，生成签名的时间戳
					nonceStr: nonceStr, // 必填，生成签名的随机串
					signature: paySign, // 必填，签名，见附录1
					jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				jweixin.ready(function() {
					jweixin.checkJsApi({
						jsApiList: ['chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
						success: function(res) {
							console.log('checkjsapi Success')
							console.log(res);
						},
						fail: function(res) {
							console.log('res')
							console.log(res);
						}
					});
					jweixin.chooseWXPay({
						timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
						package: packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
						signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						paySign: paySign, // 支付签名
						success: function(res) {
							// 支付成功后的回调函数

							console.log('paysuccess')
							console.log(res)
							var route = 'payResult' + '?type=1'
							uni.navigateTo({
								url: route
							});

						},
						cancel: function(r) {
							var route = 'payResult' + '?type=2'
							uni.navigateTo({
								url: route
							});
						},
						fail: function(res) {
							console.log('payfail')
							console.log(res)
							var route = 'payResult' + '?type=0'
							uni.navigateTo({
								url: route
							});
						}
					});
				});
				jweixin.error(function(res) {
					console.log('error')
					console.log(res)
					uni.showToast({
						icon: 'none',
						title: '支付失败了',
						duration: 4000
					});
					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					/*alert("config信息验证失败");*/
				});

			},

			showPay() {
				this.pay_cups = true
			},
			cancle() {
				this.pay_cups = false
			},

			loadPerson(id) {
				const that = this
				uni.showLoading({
					title: '正在加载...'
				})
				uni.request({
					url: that.$api.user.patient_get,
					header: {
						"token": uni.getStorageSync('user_info').token
					},
					data: {
						patientId: id
					},
					success: res => {
						uni.hideLoading()
						if (res.data.status == 200) {
							that.personDetail = res.data.data
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
	@import "../../static/css/diseaseDescription.scss"
</style>
