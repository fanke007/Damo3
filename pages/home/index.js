import pageModule from "../../lib/Page.js";
import Banner from "../../model/Banner.js";
import {
    region,
    sheet,
    request,
    list
} from "../../common/const.js";
import $pagemusic from "../../model/PageMusic.js";
import utlis from "../../utlis/utlis.js";


//页面的命名空间
const $namespace = "home/index";

//实例page模型
const $page = new pageModule({

    //监听一个加载事件
    onLoad: function(options) {


        utlis.getUserInfo()
            .then(userInfo => {
                console.log(userInfo)
            })


        //加载banner图信息;
        const banner = new Banner(this);
        banner.getBanner().then(data => {
            this.setData({
                banner: data
            })
        });

        //数据加载更新
        this.setData({
            //轮播默认值
            currentIndex: 0
        })
      
        //设置歌单信息
        this.getSheet()
            .findNameSpace($namespace)
            .then(this.setSheet.bind(this));
    },
    // 页面变化加载
    onShow(){
        
        //数据加载更新
        this.setData({
            region, //地区歌曲分类
            list, //导航点击信息
            num: 0, //轮播默认num
        })
        //打开运行导航事件
        this.getRect()
    },
    /* 这里实现控制中间凸显图片的样式 */
    handleChange: function(e) {
        // console.log(e)
        this.setData({
            currentIndex: e.detail.current
        })
    },
    //头部点击事件
    click(e) {
        const id = e.currentTarget.dataset.id,
            url = e.currentTarget.dataset.url;
        if (id === 0) {
            // console.log(e)
            this.setData({
                num: id
            }) 
        }else{
            wx.navigateTo({
                url: url,
            })
            // console.log(e)
            this.setData({
                num: id
            }) 
        }
        //更新
        this.getRect()
    },
    //获取头部导航位置信息
    getRect() {
        var query = wx.createSelectorQuery();
        //选择节点
        var that = this;
        query.select('.nav').boundingClientRect(function(rect) {
            //   console.log(rect)
            that.setData({
                width: rect.width - 20 + 'px',
                height: rect.height + 2 + 'px',
                wrapwidth: 3 * rect.width + 'px',
                left: rect.left + 7 + "px",
            })
        }).exec();

    },
    //获取歌单信息
    getSheet() {

        const sheetPromise = [];

        //循环歌单
        sheet.forEach(item => {

            //歌单类型请求
            const p = new Promise((resolve) => {

                const url = request.topid + item.id;
                wx.request({
                    url: url,
                    success: resolve
                });
            });

            sheetPromise.push(p);
        });

        //返回Promise
        return {
            nameSpace: $namespace,
            data: Promise.all(sheetPromise)
        };
    },

    // 设置歌单信息
    setSheet(arg) {

        const sheetData = [];

        arg.forEach((res, key) => {

            sheetData.push(Object.assign({
                songs: res.data.songs
            }, sheet[key]));
        });

        this.setData({
            sheets: sheetData
        })
    }
});

//继承公共的音乐模块
$page.extend($pagemusic);

//调用page
$page.start();