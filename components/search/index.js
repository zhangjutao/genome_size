// components/search/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		searchType:String,
		tips: String
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		searchVal:"",
		postList: ["searchGeneList", "searchGeneNCBIList","searchGeneCList"],
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		searchInput(e){
			this.setData({
				searchVal: e.detail.value
			})
		},
		searchClick(e){
			let searchVal = this.data.searchVal.trim();
			let type = this.data.postList[this.properties.searchType -1];
			const reg = /^[a-zA-Z .]+$/g;
			if (searchVal == ''){
				wx.showToast({
					title: '搜索值不能为空,请重新输入！',
					icon: 'none',
					duration: 3000
				})
				return
			}
			if (this.properties.searchType =='3'){
				let	titles = "请输入正确的物种英文名。";
				if (!reg.test(searchVal)) {
					wx.showToast({
						title: titles,
						icon: 'none',
						duration: 3000
					})
					this.setData({
						searchVal: ""
					})
					return
				}
				if (searchVal.length < 3) {
					wx.showToast({
						title: '请输入至少3个字母进行搜索。',
						icon: 'none',
						duration: 3000
					})
					return
				}
			}
			this.triggerEvent('searchList', { searchVal, type})
		}
	},
})
