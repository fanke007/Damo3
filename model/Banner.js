/* 获取广告图信息 */

export default class Banner{
  
  constructor(page){

    //监听一个广告图的动作信息
    Reflect.set(page, "actionBanner", Banner.actionBanner);
  }

  //跳转方法
  static actionBanner(event){

    const action = event.currentTarget.dataset.action;

    //是否为专题跳转
    if (action.atype === 0){

      wx.navigateTo({
        url: '/pages/sheet/list?id=' + action.data.id + "&name=" + action.data.name
      });
    }
  }

  //获取banner图信息
  getBanner(){

    const data = [];

    //banner图的类型有多种,有的是跳转专题,有的单曲推荐
    data.push({
      img: "//y.gtimg.cn/music/common/upload/MUSIC_FOCUS/595982.jpg?max_age=2592000",
      atype : 0,//专题
      data : {
        id : 108,
        name: "美国公告牌榜"
      }
    });

    //单曲推荐
    data.push({
        img: "http://p1.music.126.net/EGyoKU7-C8GNYe--YADapA==/109951163776095083.jpg",
      atype: 1//单曲推荐
    });

    //单曲推荐
    data.push({
        img: "http://p1.music.126.net/f_G5DiwLyNCA3S7_bzT1DQ==/109951163780361991.jpg",
      atype: 1//单曲推荐
    });

    // 真正banner图信息是从后台获取的,所以这里有回调,使用promise返回
    return new Promise((resolve)=>{
      
      resolve(data);
    });
  }
} 