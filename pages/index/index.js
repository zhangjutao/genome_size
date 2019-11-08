import { SearchModel} from '../../api/search.js';
import {
	config
} from '../../config'
const searchModel = new SearchModel();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		limitNum:0,
		searchList:[],
		total:0,
		scrollTop:0,
		cangotop:false,
		showEmple:false,
		changeSearch:"1",
		warningTip:false,
		helpTip:false,
	},
	radioChange(e){
		this.setData({
			changeSearch: e.detail.value,
			searchList:[],
			total:0,
			showEmple: false
		})
	},
	searchList(e){
		wx.showLoading({
			title: '加载中',
		});
		let type = e.detail.type;
		searchModel.getSearchList({ geneNameCn: e.detail.searchVal},type)
		.then(res=>{
			wx.hideLoading();
			if (!res.list.length){
				this.setData({
					showEmple: true,
					searchList: [],
					total:0,
				})
			}else{
				this.setData({
					showEmple: false,
					searchList: res.list,
					total: res.total,
				})
			}
		})
	},
	// 获取滚动条当前位置
	onPageScroll: function (e) {
		if (e.scrollTop > 400) {//页面距离大于400px,则显示回到顶部控件
			this.setData({
				cangotop: true
			});
		} else {
			this.setData({
				cangotop: false
			});
		}
	},

	//回到顶部，内部调用系统API
	goTop: function (e) {  // 一键回到顶部
		if (wx.pageScrollTo) {
			wx.pageScrollTo({
				scrollTop: 0
			})
		} else {
			wx.showModal({
				title: '提示',
				content: '当前微信版本过低，暂无法使用该功能，请升级后重试。'
			})
		}
	},
	closeOther(e){ //关闭其他项
		const index = e.detail.index;
		const flag = e.detail.flag;
		let list = this.data.searchList;
		for(let item of list){//关闭所有
			item.flag = false
		}
		this.data.searchList[index].flag = flag;//打开当前
		this.setData({
			searchList: list
		})
	},
	jumpHelp(){
		this.setData({
			helpTip:true
		})
	},
	close(){
		this.setData({
			helpTip: false
		})
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			limitNum: config.limitNum
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})