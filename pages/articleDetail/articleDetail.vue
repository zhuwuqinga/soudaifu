<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<web-view style="display: block;background: #fff;" :src="url"></web-view>
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
				url:''
			}
		},
		onLoad(options) {
			this.url = options.url
			this.title = options.name
			uni.setNavigationBarTitle({
				title:options.name
			})
		},
		onShow(){
			
		},
		onReachBottom(){
			
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	
</style>
