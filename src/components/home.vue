<template>
  <div class="home">
    <div class="container">
      <el-container style="width: 1000px;height: 100%; min-height: 600px; margin: auto auto;">
        <el-aside width="280px" style="background-color: #2e3238;height: 100%;overflow: hidden">
          <div class="my-settings clearfix">
            <div class="head-img" style="float: left; height: 40px;">
              <img src="../../static/image/my-headImg.jpg">
            </div>
            <div class="personal-message">
              <span style="float: left;color: #eeeeee;">空</span>
              <span style="float: right;color: #777;cursor:pointer;"><i class="iconfont icon-liebiao" style="font-size: 20px"></i></span>
            </div>
          </div>
          <div class="search-area">
            <i class="iconfont icon-sousuo"></i>
            <input type="search" placeholder="搜索">
          </div>
          <div class="tab-contain">
            <ul class="tab-title clearfix">
              <li @click="cur=0" v-bind:class="{ active: cur===0}"><i class="iconfont icon-weibiaoti-"></i></li>
              <li @click="cur=1" v-bind:class="{ active: cur===1}"><i class="iconfont icon-wenjian1"></i></li>
              <li @click="cur=2" v-bind:class="{ active: cur===2}"><i class="iconfont icon-tongxunlu"></i></li>
            </ul>
            <div class="tab-main">
              <div v-show="cur===0" class="chat-msg">
                <ul class="chat-list">
                  <li class="chat-item" v-for="(item,index) in chatData" v-bind:class="{ active: chatIndex==index}" @click="chatIndex=index">
                    <div class="ext">
                      <p class="attr">{{item.time}}</p>
                    </div>
                    <div class="avatar">
                      <img v-bind:src="item.imgSrc" class="img">
                    </div>
                    <div class="info">
                      <h3 class="nickname">{{item.nickName}}</h3>
                      <p class="msg">{{item.nowMsg}}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-show="cur===1">
                <div class="read_list" v-for="(item,index) in readList">
                  <div class="read_item_hd">
                    <p class="date">{{item.date}}</p>
                    <div class="avatar">
                      <img v-bind:src="item.readImg" class="img">
                    </div>
                    <div class="info">
                      <span class="username">{{item.username}}</span>
                    </div>
                  </div>
                  <div class="read_item" v-for="(article,articleIndex) in item.articleList">
                    <div class="cont">
                      <h3 class="title">{{article.articleTitle}}</h3>
                    </div>
                    <div class="ext">
                      <div class="cover">
                        <img class="img" v-bind:src="article.articleImg">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="cur===2">
                <ul class="contact_list">
                  <li class="contact_item" v-for="(item,index) in allPeople">
                    <div class="avatar">
                      <img v-bind:src="item.imgSrc" class="img">
                    </div>
                    <div class="info">
                      <p class="nickName">{{item.nickName}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-aside>

        <el-container style="background: #eee;position: relative">
          <el-header style="height: 51px; text-align: center; font-size: 12px;cursor: pointer" @click.native="fadeBoxOff=!fadeBoxOff">
            <span>{{nowChatFriend.nickName}}</span>
            <i class="iconfont icon-xiangxia" style="position: relative;top: 2px;"></i>
          </el-header>
          <transition name="slide-fade">
            <div id="fade-box"  v-show="fadeBoxOff">
              <img src="../../static/image/addChat.jpg">
              <img v-bind:src="nowChatFriend.imgSrc">
            </div>
          </transition>
          <el-main style="padding: 0;">
            <div class="message-showArea">
              <div style="height: 500px;" v-show="cur===0" class="chatWindow">
                <ul v-if="!chatMessage[chatIndex]">
                  <li>
                    <div style="text-align: center;line-height: 300px; color: #888">
                      暂无消息
                    </div>
                  </li>
                </ul>
                <ul v-else>
                  <li v-for="item in chatMessage[chatIndex]">
                    <div>
                      <div v-if="item.person==='A'" style="text-align: left;">
                        <img v-bind:src="nowChatFriend.imgSrc" alt="">
                        <span class="you">{{item.words}}</span>
                      </div>
                      <div v-else style="text-align: right;">
                        <span class="my">{{item.words}}</span>
                        <img src="../../static/image/my-headImg.jpg">
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="height: 500px;" v-show="cur===1" class="readWindow">
                1
              </div>
              <div style="height: 500px;" v-show="cur===2" class="lookWindow">
                2
              </div>
            </div>
            <div class="message-inputArea">
              <div class="input-tool">
                <ul class="clearfix">
                  <li><i class="iconfont icon-xiaolian"></i></li>
                  <li><i class="iconfont icon-scissors"></i></li>
                  <li><i class="iconfont icon-wenjian"></i></li>
                </ul>
              </div>
              <div class="input-textArea">
                <textarea v-model="nowInput"></textarea>
              </div>
              <div class="enter-message">
                <span class="desc">按下Ctrl+Enter换行</span>
                <button @click="addMessage">发送</button>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        cur: 0,
        chatIndex: 0,
        chatData: [
          {
            nickName: "LK",
            nowMsg: "我知道了",
            imgSrc: "../../static/image/LK.jpg",
            time: "14:23"
          },
          {
            nickName: "冷金妮",
            nowMsg: "你好呀",
            imgSrc: "../../static/image/my-headImg.jpg",
            time: "14:28"
          },
          {
            nickName: "xixi",
            nowMsg: "我知道了",
            imgSrc: "../../static/image/xixi.jpg",
            time: "14:43"
          },
          {
            nickName: "郑永吉",
            nowMsg: "加油哦!",
            imgSrc: "../../static/image/zyj.jpg",
            time: "15:23"
          },
          {
            nickName: "冷金妮",
            nowMsg: "你好呀",
            imgSrc: "../../static/image/my-headImg.jpg",
            time: "14:28"
          },
          {
            nickName: "xixi",
            nowMsg: "我知道了",
            imgSrc: "../../static/image/xixi.jpg",
            time: "14:43"
          },
          {
            nickName: "郑永吉",
            nowMsg: "加油哦!",
            imgSrc: "../../static/image/zyj.jpg",
            time: "15:23"
          },
          {
            nickName: "郑永吉",
            nowMsg: "加油哦!",
            imgSrc: "../../static/image/zyj.jpg",
            time: "15:23"
          },
          {
            nickName: "冷金妮",
            nowMsg: "你好呀",
            imgSrc: "../../static/image/my-headImg.jpg",
            time: "14:28"
          }
        ],
        allPeople: [
          {
            imgSrc: '../../static/image/LK.jpg',
            nickName: 'LK'
          },
          {
            imgSrc: '../../static/image/zyj.jpg',
            nickName: '郑永吉xixixixixixi'
          },
          {
            imgSrc: '../../static/image/xixi.jpg',
            nickName: 'xixi'
          },
          {
            imgSrc: '../../static/image/LK.jpg',
            nickName: 'LKxixixixi'
          },
          {
            imgSrc: '../../static/image/zyj.jpg',
            nickName: '郑永吉'
          },
          {
            imgSrc: '../../static/image/xixi.jpg',
            nickName: 'xixi'
          },
          {
            imgSrc: '../../static/image/LK.jpg',
            nickName: 'LKLKLKLKLK'
          },
          {
            imgSrc: '../../static/image/zyj.jpg',
            nickName: '郑永吉郑永吉郑永吉郑永吉'
          },
          {
            imgSrc: '../../static/image/xixi.jpg',
            nickName: 'xixixixixixixixixixi'
          }
        ],
        readList: [
          {
            username: "公务员考试信息网",
            readImg: "../../static/image/1.jpg",
            date: "9:14",
            articleList: [
              {
                articleTitle: "砺石早报 | 小米电视上半年中国区销量和出货量均突破400万台；小鹏汽车发布老用户补贴细则……",
                articleImg: "../../static/image/2.jpg"
              },
              {
                articleTitle: "400万台；小鹏汽车发布老用户补贴细则……",
                articleImg: "../../static/image/1.jpg"
              },
              {
                articleTitle: "小米电视上半年中国区销量和出货量均突破400万台",
                articleImg: "../../static/image/3.jpg"
              }
            ]
          },
          {
            username: "砺石早报",
            readImg: "../../static/image/2.jpg",
            date: "9:14",
            articleList: [
              {
                articleTitle: "砺石早报 | 小米电视上半年中国区销量和出货量均突破400万台；小鹏汽车发布老用户补贴细则……",
                articleImg: "../../static/image/2.jpg"
              },
              {
                articleTitle: "400万台；小鹏汽车发布老用户补贴细则……",
                articleImg: "../../static/image/1.jpg"
              },
              {
                articleTitle: "小米电视上半年中国区销量和出货量均突破400万台",
                articleImg: "../../static/image/3.jpg"
              }
            ]
          },
          {
            username: "小米电视",
            readImg: "../../static/image/3.jpg",
            date: "9:14",
            articleList: [
              {
                articleTitle: "砺石早报 | 小米电视上半年中国区销量和出货量均突破400万台；小鹏汽车发布老用户补贴细则……",
                articleImg: "../../static/image/2.jpg"
              },
              {
                articleTitle: "400万台；小鹏汽车发布老用户补贴细则……",
                articleImg: "../../static/image/1.jpg"
              }
            ]
          }
        ],
        nowChatFriend: {
          nickName: "LK",
          nowMsg: "我知道了",
          imgSrc: "../../static/image/LK.jpg",
          time: "14:23"
        },
        fadeBoxOff: false,
        chatMessage: [
          [
            {person: 'A', words: '吃饭了吗？'},
            {person: 'B', words: '还没呢，你呢？'},
            {person: 'A', words: '我吃过了'},
            {person: 'B', words: '哦哦 还要不要吃'},
            {person: 'A', words: '吃饭了吗？'},
            {person: 'B', words: '还没呢，你呢？'},
            {person: 'A', words: '我吃过了'},
            {person: 'B', words: '哦哦 还要不要吃'}
          ],
          [
            {person: 'A', words: '去看书吗'},
            {person: 'B', words: '走起'},
            {person: 'A', words: '去哪里看'},
            {person: 'B', words: '图书馆'},
            {person: 'A', words: '吃饭了吗？'},
            {person: 'B', words: '还没呢，你呢？'},
            {person: 'A', words: '我吃过了'},
            {person: 'B', words: '哦哦 还要不要吃'}
          ],
        ],
        nowInput: ''
      }
    },
    watch: {
      chatIndex(now){
        this.nowChatFriend = this.chatData[now];
      }
    },
    methods: {
      addMessage(){
        if(this.nowInput) {
          this.chatMessage[this.chatIndex].push(
            {person: 'B', words: this.nowInput},
          );
          this.nowInput = ''
        }
      }
    }
  }
</script>

<style  lang="scss" scoped>
 .home {
   width: 100%;
   height: 100%;
   background: url(../../static/image/login_bj.jpg) no-repeat;
   background-size: cover;
   .container {
     height: 100%;
     min-height: 600px;
     padding: 100px 0;
   }
   .el-header {
     color: #333;
     line-height: 51px;
     margin: 0 19px;
     border-bottom: 1px solid #d6d6d6;
   }
   .el-aside {
     color: #333;
   }
   .message-showArea {
     height: calc(100% - 181px);
     overflow-y: auto;
   }
   .message-inputArea {
     height: 181px;
     border-top: 1px solid #d6d6d6;
     padding: 10px 0px 10px 20px;
     margin-right: 20px;
   }
   .input-tool ul li {
     float: left;
     margin-right: 10px;
   }
   .input-tool ul li i {
     font-size: 26px;
     color: #4d4d4d;
   }
   .message-inputArea textarea {
     background: rgba(0, 0, 0, 0);
     width: 100%;
     height: 80px;
     border: none;
     resize: none;
     overflow-y: auto;
     outline: none;
     color: #555;
     padding: 10px 0;
     font-size: 14px;
     font-family: "Microsoft YaHei";
   }
   .enter-message {
     text-align: right;
   }
   .enter-message button {
     display: inline-block;
     height: 30px;
     line-height: 30px;
     -webkit-appearance: none;
     background-color: #fff;
     color: #222;
     padding-left: 30px;
     padding-right: 30px;
     border: 1px solid #c1c1c1;
     border-radius: 4px;
     -moz-border-radius: 4px;
     -webkit-border-radius: 4px;
     cursor: pointer;
     outline: none;
   }
   .enter-message button:hover {
     background: #f4f4f4;
   }
   .enter-message .desc {
     color: #888;
     font-size: 12px;
     margin-left: 10px;
     margin-right: 7px;
   }
   .my-settings {
     padding: 18px;
     height: 76px;
   }
   .my-settings .head-img img {
     width: 40px;
     height: 40px;
     border-radius: 4px;
     cursor: pointer;
   }
   .personal-message {
     float: right;
     width: calc(100% - 50px);
     line-height: 40px;
     font-size: 18px;
   }
   .search-area {
     position: relative;
     width: 244px;
     margin: 0 auto 6px;
     height: 33px;
   }
   .search-area i {
     display: inline-block;
     width: 30px;
     height: 32px;
     line-height: 32px;
     text-align: center;
     color: #999999;
     background-color: #26292e;
     border-radius: 2px;
   }
   .search-area input {
     width: 214px;
     height: 32px;
     line-height: 32px;
     border: 0;
     border-radius: 2px;
     -moz-border-radius: 2px;
     -webkit-border-radius: 2px;
     background-color: #26292e;
     color: #fff;
     font-size: 12px;
     margin-left: -5px;
     outline: none;
   }
   .tab-contain {
     height: 100%;
   }
   .tab-title {
     margin-bottom: 10px;
   }
   .tab-contain ul.tab-title li {
     float: left;
     width: 33%;
     border-right: 1px solid #272727;
     text-align: center;
     color: #eee;
     cursor: pointer;
   }
   .tab-contain ul.tab-title li.active {
     color: #3caf36;
   }
   .tab-contain ul.tab-title li:last-child {
     border-right: none;
   }
   .tab-contain ul.tab-title li i {
     font-size: 28px;
   }
   .tab-main {
     height: calc(100% - 31px);
     overflow-y: auto;
   }
   .chat-msg .chat-list .chat-item {
     overflow: hidden;
     padding: 12px 18px 11px;
     border-bottom: 1px solid #292c33;
     cursor: pointer;
     position: relative;
   }
   .chat-item.active {
     background: #3a3f45;
   }
   .chat-item.active .ext, .chat-item.active .info .msg {
     color: #fff;
   }
   .chat-item .ext {
     float: right;
     color: #6b6f7c;
     font-size: 13px;
     text-align: right;
   }
   .chat-item .avatar {
     float: left;
     margin-right: 10px;
     position: relative;
   }
   .chat-item .info {
     overflow: hidden;
   }
   .chat-item .ext .attr {
     height: 19px;
     line-height: 1.5;
   }
   .chat-item .avatar .img {
     display: block;
     width: 40px;
     height: 40px;
     border-radius: 2px;
     -moz-border-radius: 2px;
     -webkit-border-radius: 2px;
   }
   .chat-item .info .nickname {
     font-weight: 400;
     font-size: 13px;
     color: #fff;
     line-height: 20px;
   }
   .chat-item.active .ext, .chat-item.active .info .msg, .chat-item.active .info .nickname {
     color: #fff;
   }
   .chat-item .info .msg {
     color: #989898;
     font-size: 13px;
     width: 100%;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
     word-wrap: normal;
     height: 1.5em;
   }
   .contact_list .contact_item {
     overflow: hidden;
     padding: 10px 18px 9px;
     border-bottom: 1px solid #292c33;
     cursor: pointer;
   }
   .contact_list .avatar {
     float: left;
     margin-right: 10px;
   }
   .contact_list .avatar .img {
     display: block;
     width: 30px;
     height: 30px;
     border-radius: 2px;
     -moz-border-radius: 2px;
     -webkit-border-radius: 2px;
   }
   .contact_list .info {
     overflow: hidden;
     line-height: 30px;
   }
   .contact_list .info .nickName {
     color: #fff;
     font-weight: 400;
     font-size: 13px;
     width: 100%;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
     word-wrap: normal;
   }
   .read_list .just_for_bg.first {
     padding-top: 0;
   }
   .read_list .just_for_bg {
     background-color: #292d32;
     padding-top: 10px;
   }
   .read_item_hd {
     overflow: hidden;
     padding: 10px 20px;
     background-color: #2f3239;
   }
   .read_item_hd .date {
     float: right;
     color: #888;
     font-size: 12px;
     line-height: 20px;
   }
   .read_item_hd .avatar {
     float: left;
     margin-right: 10px;
   }
   .read_item_hd .avatar .img {
     width: 20px;
     height: 20px;
     display: block;
     border-radius: 50%;
     -moz-border-radius: 50%;
     -webkit-border-radius: 50%;
   }
   .read_item_hd .info {
     overflow: hidden;
     line-height: 20px;
   }
   .read_item_hd .date {
     float: right;
     color: #888;
     font-size: 12px;
     line-height: 20px;
   }
   .read_item_hd .info .username {
     font-size: 12px;
     color: #888;
     line-height: 1;
   }
   .read_item.active {
     background-color: #3a3f45;
   }
   .read_item {
     padding: 10px 18px 9px;
     border-bottom: 1px solid #292c33;
     cursor: pointer;
     overflow: hidden;
     background-color: #2f3239;
   }
   .read_item .cont {
     overflow: hidden;
     display: table-cell;
     vertical-align: middle;
     word-wrap: break-word;
     word-break: break-all;
     width: 2000px;
     line-height: 20px;
   }
   .read_item .title {
     font-weight: 400;
     font-size: 13px;
     color: #fff;
     max-height: 40px;
   }
   .read_item .ext {
     display: table-cell;
     vertical-align: middle;
     word-wrap: break-word;
     word-break: break-all;
     white-space: nowrap;
     position: relative;
     overflow: hidden;
     padding-left: 10px;
   }
   .read_item .ext .cover {
     width: 40px;
     height: 40px;
     overflow: hidden;
   }
   .read_item .ext .cover .img {
     display: block;
     width: 40px;
     height: 40px;
     background-size: cover;
   }
   #fade-box {
     position: absolute;
     top: 51px;
     left: 0;
     opacity: 1;
     padding: 15px 4px 10px 17px;
     background-color: #eee;
     border-bottom: 1px solid #dedede;
     width: 100%;
     height: auto;
     cursor: pointer;
     box-shadow: 0 5px 5px rgba(0,0,0,.1);
     z-index: 9;
   }
   #fade-box img {
     display: block;
     float: left;
     margin-right: 20px;
     cursor: pointer;
     width: 55px;
     height: 55px;
     background-color: #ccc;
   }
   .fade-enter-active, .fade-leave-active {
     transition: top 1s, opacity 1s;
   }
   .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
     opacity: 0;
     top: 0;
   }
   .chatWindow {
     padding: 10px 15px 0;
     overflow-y: auto;
   }
   .chatWindow ul li {
     position: relative;
     margin-bottom: 15px;
   }
   .chatWindow img {
     width: 40px;
     height: 40px;
     display: inline-block;
     vertical-align: middle;
   }
   .chatWindow span {
     height: 40px;
     line-height: 40px;
     display: inline-block;
     vertical-align: middle;
     border-radius: 3px;
   }
   .chatWindow span.you {
     background: #f8f8f8;
     padding: 0 6px;
     margin-left: 5px;
   }
   .chatWindow span.you:before {
     content:"";
     width:0;
     height:0;
     position:absolute;
     left: 40px;
     top: 12px;
     border-top:solid 10px transparent;
     border-right:solid 10px #f8f8f8;
     border-bottom:solid 10px transparent;
   }
   .chatWindow span.my {
     background: #b2e281;
     padding: 0 10px;
     margin-right: 5px;
   }
   .chatWindow span.my:after {
     content:"";
     width:0;
     height:0;
     position:absolute;
     right: 40px;
     top: 12px;
     border-top:solid 10px transparent;
     border-left:solid 10px #b2e281;
     border-bottom:solid 10px transparent;
   }
 }
</style>
