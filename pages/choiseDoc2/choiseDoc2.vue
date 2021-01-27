<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="top">
			<view class="flex_y_bottom">
				<view class="title" v-text="detail.name"></view>
				<view style="font-size: 24rpx;" v-text="detail.deptName"></view>
			</view>
			<view class="search flex_y_center">
				<image src="../../static/images/index_search_icon.png" mode=""></image>
				<input placeholder="请输入科室、医生名称"></input>
			</view>
			<view class="person flex_y_center">
				<view v-text="detail.patientName"></view>
				<image src="../../static/images/icon_right.png" mode=""></image>
			</view>
			<view class="date_list flex">
				<view v-for="(item,index) in dateArr" :key="index" @click="dateClick(index)" :class="curIndex==index?'flex_all_center2 active':'flex_all_center2'">
					<view v-text="item.week"></view>
					<view v-text="item.date">04/17</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item" @click="itemClick(item.doctorId)" v-for="(item,index) in docList" :key='index'>
				<view class="flex_y_bottom">
					<view class="name" v-text="item.doctorName"></view>
					<view class="level" v-text="item.titleName"></view>
					<view class="status" v-if="item.onlineStatus==1">在线</view>
					<view class="status" v-else>离线</view>
					<view class="flex_all_center collect" @click.stop="collect">
						<image src="../../static/images/collect.png" mode=""></image>
						<view>关注</view>
					</view>
				</view>
				<view class="text_more" v-text="item.professional "></view>
				<view class="flex_y_center set">
					<!-- <image src="" mode=""></image> -->
					<view @click.stop="set">设置有号提醒</view>
				</view>
				<view class="flex_y_center money">
					<view class="m_left">挂号费：<text v-text="item.registerPrice+'元'"></text></view>
					<view class="m_right" @click.stop="into(item.doctorId)">进入诊室</view>
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
				title: "选择医生",
				detail :{
					id : "",
					name : "",
					patientId : '',
					patientName : '',
					code:'',
					deptName:""
				},
				dateArr:[],
				curIndex:0,
				doctorName:'',
				pageNo:1,
				pageSize:10,
				docList:[],
				curDate : ''
			}
		},
		onLoad(options) {
			this.detail = options
			this.loadTimes()
		},
		methods: {
			into(doctorId){
				uni.navigateTo({
					url : "/pages/consultingRoom/consultingRoom?id="+doctorId
				})
			},
			dateClick(index){
				this.curIndex = index
				this.curDate = this.dateArr[index].postDate
				this.loadData(this.dateArr[index].postDate,this.doctorName,1,this.pageSize)
			},
			loadTimes(){
				let myDate = new Date(),dateArr=[],
				weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")
				for(let i=0;i<7;i++){
					let newDate=new Date(myDate.getTime()+i*1000*60*60*24)
					let year=newDate.getFullYear()
					let month=(parseInt(newDate.getMonth())+1)>9?(parseInt(newDate.getMonth())+1):"0"+(parseInt(newDate.getMonth())+1)
					let day=(newDate.getDate())>9?newDate.getDate():"0"+newDate.getDate()
					let weekend = newDate.getDay()
					let postDate = Math.round(newDate.getTime() / 1000)
					let fullDate={
						'date' : `${month}/${day}`,
						'week' : `${weeks[weekend]}`,
						'postDate' : `${year}-${month}-${day}`
					}
					dateArr.push(fullDate)
				}
				// console.log(dateArr)
				this.dateArr = dateArr
				this.curDate = dateArr[0].postDate
				this.loadData(dateArr[0].postDate,this.doctorName,this.pageNo,this.pageSize)
			},
			loadData(date,doctorName,pageNo,pageSize){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.sheetRegister.listDoc,
					method:'post',
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"date": date,
						"deptId": that.detail.code,
						"deptName": that.detail.deptName,
						"doctorName": doctorName,
						"organizationId": that.detail.id,
						"organizationName": that.detail.name,
						"pageNo": pageNo,
						"pageSize": pageSize,
						"userId": uni.getStorageSync('user_info').userId
					},
					success(res) {
						uni.hideLoading()
						// console.log(res)
						if(res.data.status==200){
							that.docList = res.data.data
							
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			itemClick(id){
				uni.navigateTo({
					url:"/pages/choiseDoc3/choiseDoc3?doctorId="+id+'&startDate='+this.curDate
				})
			},
			set(){
				console.log('set')
			},
			collect(){
				console.log('collect')
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/choiseDoc2.scss";
</style>
