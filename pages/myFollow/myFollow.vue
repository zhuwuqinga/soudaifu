<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="inquiry_list" v-if="followList.length>0">
			<view class="inquiry_item">
				
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
				title: "我的随访",
				followList:[]
			}
		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/myInquiry.scss"
</style>
