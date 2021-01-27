<template>
	<!-- <view class="header flex_y_center">
		<navigator open-type="navigateBack" hover-class="none" class="page_back_box flex_all_center">
			<image v-if="status==1" class="page_back" src="../../static/images/back.png" mode=""></image>
		</navigator>
		<view class="page_title text_more">{{title}}</view>
	</view> -->
</template>

<script>
	export default {
		
		data() {
			return {
				
			}
		},
		props:{
			title : String,
			status : Number
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style>
</style>
