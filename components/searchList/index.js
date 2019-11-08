// components/searchList/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		searchList:{
			type:Object
		},
		searchType:String,
		index:Number,
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		searchTypes:"1"
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		isShow(){
			this.triggerEvent('closeOther', { flag: !this.properties.searchList.flag, index: this.properties.index})
		}
	}
})
