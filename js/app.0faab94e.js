(function(t){function e(e){for(var i,c,o=e[0],r=e[1],l=e[2],u=0,m=[];u<o.length;u++)c=o[u],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&m.push(a[c][0]),a[c]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i]);v&&v(e);while(m.length)m.shift()();return n.push.apply(n,l||[]),s()}function s(){for(var t,e=0;e<n.length;e++){for(var s=n[e],i=!0,c=1;c<s.length;c++){var r=s[c];0!==a[r]&&(i=!1)}i&&(n.splice(e--,1),t=o(o.s=s[0]))}return t}var i={},a={app:0},n=[];function c(t){return o.p+"js/"+({about:"about"}[t]||t)+"."+{about:"52d5bf8e"}[t]+".js"}function o(e){if(i[e])return i[e].exports;var s=i[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.e=function(t){var e=[],s=a[t];if(0!==s)if(s)e.push(s[2]);else{var i=new Promise((function(e,i){s=a[t]=[e,i]}));e.push(s[2]=i);var n,r=document.createElement("script");r.charset="utf-8",r.timeout=120,o.nc&&r.setAttribute("nonce",o.nc),r.src=c(t);var l=new Error;n=function(e){r.onerror=r.onload=null,clearTimeout(u);var s=a[t];if(0!==s){if(s){var i=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;l.message="Loading chunk "+t+" failed.\n("+i+": "+n+")",l.name="ChunkLoadError",l.type=i,l.request=n,s[1](l)}a[t]=void 0}};var u=setTimeout((function(){n({type:"timeout",target:r})}),12e4);r.onerror=r.onload=n,document.head.appendChild(r)}return Promise.all(e)},o.m=t,o.c=i,o.d=function(t,e,s){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(s,i,function(e){return t[e]}.bind(null,i));return s},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/",o.oe=function(t){throw console.error(t),t};var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var u=0;u<r.length;u++)e(r[u]);var v=l;n.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"0ba3":function(t,e,s){t.exports=s.p+"img/avatar.7982e1c4.jpg"},"0bc8":function(t,e,s){"use strict";s("2b44")},1:function(t,e){},10:function(t,e){},"14dd":function(t,e,s){},1564:function(t,e,s){"use strict";s("b475")},2:function(t,e){},"2b44":function(t,e,s){},3:function(t,e){},3300:function(t,e,s){t.exports=s.p+"img/double-arrow-gray.efdd23b4.png"},"336f":function(t,e,s){},"3c68":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"get-in-touch"}},[s("div",{staticClass:"narrow-content"},[t._m(0),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6 col-md-offset-3 col-md-pull-3 animate-box",attrs:{"data-animate-effect":"fadeInLeft"}},[s("p",{staticClass:"lead"},[t._v("小站目前内容有限，如需了解更多可点击下方按钮")]),s("p",[s("a",{staticClass:"btn btn-primary",on:{click:function(e){return t.$router.push({name:"contact"})}}},[t._v("了解更多")])])])])])])},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-4 animate-box",attrs:{"data-animate-effect":"fadeInLeft"}},[s("h1",{staticClass:"heading-colored"},[t._v("联系我")])])])}],n=s("2877"),c={},o=Object(n["a"])(c,i,a,!1,null,null,null);e["a"]=o.exports},4:function(t,e){},"4af2":function(t,e,s){"use strict";s("e4dc")},5:function(t,e){},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var i=s("2b0e"),a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("guide"),s("div",{staticClass:"swiper-wrapper"},[s("Menu",{staticClass:"swiper-slide"}),s("router-view",{staticClass:"swiper-slide",attrs:{id:"main"}})],1)],1)},n=[],c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"menu"},[s("a",{staticClass:"nav-toggle",class:{active:t.open},attrs:{href:"#"},on:{click:t.openMenu}},[s("i")]),s("aside",{staticClass:"border js-fullheight",attrs:{id:"aside",role:"complementary"}},[s("h1",{attrs:{id:"logo"}},[s("a",{on:{click:function(e){return t.go("home")}}},[t._v("赵大仁")])]),s("nav",{attrs:{id:"main-menu",role:"navigation"}},[s("ul",[s("li",{class:{active:t.checkPath("home")},on:{click:function(e){return t.go("home")}}},[s("a",{on:{click:function(e){return t.go("home")}}},[t._v("Home主页")])]),s("li",{class:{active:t.checkPath("blog")},on:{click:function(e){return t.go("blog")}}},[s("a",{on:{click:function(e){return t.go("blog")}}},[t._v("Blog博客")])]),s("li",{class:{active:t.checkPath("portfolio")},on:{click:function(e){return t.go("portfolio")}}},[s("a",{on:{click:function(e){return t.go("portfolio")}}},[t._v("Portfolio作品集")])]),s("li",{class:{active:t.checkPath("about")},on:{click:function(e){return t.go("about")}}},[s("a",{on:{click:function(e){return t.go("about")}}},[t._v("About关于")])]),s("li",{class:{active:t.checkPath("contact")},on:{click:function(e){return t.go("contact")}}},[s("a",{on:{click:function(e){return t.go("contact")}}},[t._v("Contact联系方式")])]),s("li",{class:{active:t.checkPath("settings")},on:{click:function(e){return t.go("settings")}}},[s("a",{on:{click:function(e){return t.go("settings")}}},[t._v("Settings网站设置")])])])]),t._m(0)])])},o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"footer"},[s("p",[t._v("Copyright © 2017.Sky__zt All rights reserved.")]),s("ul",[s("li",[s("a",{attrs:{href:"#"}},[s("i",{staticClass:"icon-facebook2"})])]),s("li",[s("a",{attrs:{href:"https://twitter.com/boyzhaotian"}},[s("i",{staticClass:"icon-twitter2"})])]),s("li",[s("a",{attrs:{href:"#"}},[s("i",{staticClass:"icon-instagram"})])]),s("li",[s("a",{attrs:{href:"#"}},[s("i",{staticClass:"icon-linkedin2"})])])]),s("a",{attrs:{href:"https://beian.miit.gov.cn/"}},[t._v("京ICP备18056784号")])])}],r=s("41d6"),l={data:function(){return{menuSwiper:Object,open:this.$store.state.guide}},mounted:function(){var t=this;this.init(),this.open&&setTimeout((function(){t.closeMenu()}),this.$store.state.guideTime)},methods:{checkPath:function(t){var e="home"===t&&"/"===this.$route.path;return this.$route.path.indexOf(t)>-1||e},go:function(t){this.$router.push({name:t}),setTimeout(this.closeMenu,500)},openMenu:function(){this.open=!0,this.menuSwiper.slidePrev()},closeMenu:function(){this.open=!1,this.menuSwiper.slideNext()},init:function(){var t=document.querySelector(".nav-toggle");this.menuSwiper=new r["a"]("#app",{slidesPerView:"auto",initialSlide:this.open?0:1,resistanceRatio:0,slideToClickedSlide:!0,noSwiping:!1,preventInteractionOnTransition:!0,on:{init:function(){var e=this;t.addEventListener("click",(function(){0===e.activeIndex?e.slideNext():e.slidePrev()}),!0)},slideChange:function(){var e=this;0===e.activeIndex?t.classList.add("active"):t.classList.remove("active")}}})}}},u=l,v=(s("7463"),s("62db"),s("c5be"),s("2877")),m=Object(v["a"])(u,c,o,!1,null,"59d54320",null),d=m.exports,f=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"guide",class:{hiding:t.hiding}},[t._m(0),s("div",[s("div",{staticClass:"iknewit",on:{click:t.seen}},[t._v(" 知道啦"),t.cd?s("span",[t._v("("+t._s(t.cd)+"s)")]):t._e()])])])},_=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tipBox"},[i("img",{staticClass:"arrow",attrs:{src:s("3300"),alt:""}}),i("div",{staticClass:"tip"},[t._v("左右滑动开关菜单")])])}],h={data:function(){return{show:this.$store.state.guide,hiding:!1,cd:this.$store.state.guideTime/1e3}},mounted:function(){this.countDown()},methods:{seen:function(){var t=this;this.cd||(this.$store.commit("guide",!1),this.hiding=!0,setTimeout((function(){t.show=!1}),600))},countDown:function(){var t=this;this.cd&&setTimeout((function(){t.cd--,t.countDown()}),1e3)}}},p=h,g=(s("4af2"),Object(v["a"])(p,f,_,!1,null,"0f8a4d78",null)),C=g.exports,b=(s("ac1f"),s("466d"),{Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return b.Android()||b.BlackBerry()||b.iOS()||b.Opera()||b.Windows()}}),w=function(){var t=function(){for(var t=document.getElementsByClassName("js-fullheight"),e=0;e<t.length;e++)t[e].style.height=window.innerHeight+"px"};window.onresize=function(){t()},!b.any()&&t()},y=function(){w()},k={components:{Menu:d,Guide:C},mounted:function(){y()}},x=k,j=(s("5c0b"),s("5c64"),s("1564"),Object(v["a"])(x,a,n,!1,null,null,null)),$=j.exports,E=(s("d3b7"),s("3ca3"),s("ddb0"),s("8c4f")),P=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home"},[i("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[i("img",{attrs:{alt:"Vue logo",src:s("cdf4")}})]),i("Slider"),t.blogList.length?i("narrow-content",{attrs:{title:"recent blog"}},[i("blog-item"),i("blog-item"),i("blog-item"),i("blog-item")],1):t._e(),i("Get-in-touch")],1)},S=[],O=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},I=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("aside",{staticClass:"js-fullheight",attrs:{id:"hero"}},[s("div",{staticClass:"swiper-container swiper-no-swiping js-fullheight"},[s("div",{staticClass:"swiper-wrapper"},[s("div",{staticClass:"swiper-slide bg_1"},[s("div",{staticClass:"overlay"}),s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"row"},[s("div",{staticClass:"\n                col-md-8 col-md-offset-2\n                text-center\n                js-fullheight\n                slider-text\n              "},[s("div",{staticClass:"slider-text-inner"},[s("h1",[s("strong",[t._v("独立建站")]),t._v("，力求优质高效")])])])])])]),s("div",{staticClass:"swiper-slide bg_2"},[s("div",{staticClass:"overlay"}),s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"row"},[s("div",{staticClass:"\n                col-md-8 col-md-offset-2\n                text-center\n                js-fullheight\n                slider-text\n              "},[s("div",{staticClass:"slider-text-inner"},[s("h1",[s("strong",[t._v("精雕细琢")]),t._v("，用适合的技术，呈现最好的效果 ")])])])])])]),s("div",{staticClass:"swiper-slide bg_3"},[s("div",{staticClass:"overlay"}),s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"row"},[s("div",{staticClass:"\n                col-md-8 col-md-offset-2\n                text-center\n                js-fullheight\n                slider-text\n              "},[s("div",{staticClass:"slider-text-inner"},[s("h1",[s("strong",[t._v("追求卓越")]),t._v("，学无止境")])])])])])])]),s("div",{staticClass:"swiper-pagination"})])])}],A=(s("7db0"),500),M={data:function(){return{Swiper:Object}},mounted:function(){this.init()},methods:{init:function(){var t;this.Swiper=new r["a"](".swiper-container",{noSwiping:!0,autoplay:{delay:1e4},effect:"fade",fadeEffect:{crossFade:!0},pagination:{el:".swiper-pagination",clickable:!0},on:{init:function(){t=this.slides.eq(0).find(".slider-text"),t.addClass("animated fadeInUp")},transitionStart:function(){var e=this;setTimeout((function(){for(var s=0;s<e.slides.length;s++)t=e.slides.eq(s).find(".slider-text"),t.removeClass("animated fadeInUp")}),A)},transitionEnd:function(){var e=this;setTimeout((function(){t=e.slides.eq(e.activeIndex).find(".slider-text"),t.addClass("animated fadeInUp")}),A)}}})}}},T=M,L=(s("6a87"),s("0bc8"),Object(v["a"])(T,O,I,!1,null,"c5e9d26a",null)),N=L.exports,z=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-md-3 col-sm-6 col-padding animate-box",attrs:{"data-animate-effect":"fadeInLeft"}},[s("div",{staticClass:"blog-entry"},[s("a",{staticClass:"blog-img",attrs:{href:t.link}},[s("img",{staticClass:"img-responsive",attrs:{src:t.img,alt:"Free HTML5 Bootstrap Template by FreeHTML5.co"}})]),s("div",{staticClass:"desc"},[s("h3",[s("a",{attrs:{href:"#"}},[t._v(t._s(t.title))])]),s("span",[s("small",[t._v("by "+t._s(t.author)+" ")]),t._v(" / "),s("small",[t._v(" "+t._s(t.category)+" ")]),t._v(" / "),t._m(0)]),s("p",[t._v(t._s(t.brief))]),s("a",{staticClass:"lead",attrs:{href:t.link}},[t._v("Read More "),s("i",{staticClass:"icon-arrow-right3"})])])])])},B=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("small",[s("i",{staticClass:"icon-comment"}),t._v(" 14")])}],q={props:{img:{type:String,default:"/static/img/img-"+Math.ceil(5*Math.random())+".jpg"},title:{type:String,default:"Inspirational Website"},author:{type:String,default:"Admin"},category:{type:String,default:"Web Design"},brief:{type:String,default:"Design must be functional and functionality must be translated into visual aesthetics"},link:{type:String,default:"#"}}},H=q,D=Object(v["a"])(H,z,B,!1,null,null,null),G=D.exports,W=s("3c68"),F=s("6d44"),J={name:"home",components:{Slider:N,GetInTouch:W["a"],NarrowContent:F["a"],BlogItem:G},data:function(){return{blogList:[]}},mounted:function(){}},U=J,V=Object(v["a"])(U,P,S,!1,null,null,null),K=V.exports,Q=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._m(0),s("p",{staticClass:"last-modified"},[t._v("最后更新时间：2018年2月")]),s("div",{staticClass:"content"},[s("div",{staticClass:"content-bd"},[s("div",{staticClass:"content-left"},[t._m(1),s("section",{staticClass:"project"},[t._m(2),s("div",{staticClass:"section-bd"},[s("div",{staticClass:"item"},[t._m(3),s("div",{staticClass:"item-bd"},[s("p",{staticClass:"section-content"},[s("strong",[t._v("mobile+PC")]),t._v(" 个人主页，会不定期更新，欢迎大家提出宝贵的意见来帮助丰富小站内容，优化用户体验。 "),s("br"),s("span",{staticClass:"green",on:{click:function(e){return t.$router.push({name:"contact"})}}},[t._v("我要提意见！")]),s("br"),t._v("#"),s("em",[t._v("vue")]),t._v(","),s("em",[t._v("vue-router")]),t._v(","),s("em",[t._v("vuex")]),t._v(","),s("em",[t._v("swiper")]),t._v(","),s("em",[t._v("axios")]),t._v(","),s("em",[t._v("scss")]),t._v(","),s("em",[t._v("webpack")]),t._v(","),s("em",[t._v("jenkins")]),t._v(","),s("em",[t._v("docker")]),t._v("# ")])])]),t._m(4),t._m(5),t._m(6),t._m(7),t._m(8),t._m(9),t._m(10)])]),t._m(11),t._m(12)]),t._m(13)]),t._m(14)]),t._m(15)])},R=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a",{staticClass:"pdf",attrs:{href:"/resume.png"}},[s("i",{staticClass:"iconfont icon-pdf"}),t._v(" 简历长图")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"practice"},[s("header",{staticClass:"section-hd"},[s("span",{staticClass:"section-title-l"}),s("h2",{staticClass:"section-title"},[t._v("实践经历")]),s("span",{staticClass:"section-title-r"})]),s("div",{staticClass:"section-bd"},[s("div",{staticClass:"item"},[s("header",{staticClass:"item-hd"},[s("span",{staticClass:"item-time"},[t._v("2018.05 ~ 至今")]),s("a",{staticClass:"btn item-more",attrs:{href:"http://weizhan.gmw.cn/web/index.php?",target:"_blank"}},[t._v("工作")]),s("h3",{staticClass:"item-name"},[t._v("中化能源科技有限公司")])]),s("div",{staticClass:"item-bd"},[s("p",{staticClass:"section-content"},[s("strong",[t._v("项目单元负责人")]),s("strong",[t._v("前端工程师")]),s("ul",[s("li",[t._v("负责2C-mobile项目前端单元开发。")]),s("li",[t._v("负责项目架构，配置部署环境，前端性能优化；")]),s("li",[t._v("积极沟通以呈现最好的用户体验及视觉效果。")])])])])]),s("div",{staticClass:"item"},[s("header",{staticClass:"item-hd"},[s("span",{staticClass:"item-time"},[t._v("2015.12 ~ 2018.04")]),s("a",{staticClass:"btn item-more",attrs:{href:"http://weizhan.gmw.cn/web/index.php?",target:"_blank"}},[t._v("工作")]),s("h3",{staticClass:"item-name"},[t._v("光明云科技有限公司")])]),s("div",{staticClass:"item-bd"},[s("p",{staticClass:"section-content"},[s("strong",[t._v("技术部-经理")]),s("strong",[t._v("前端工程师")]),s("ul",[s("ul",[t._v("负责需求分析，进度评估以及跟踪，评估项目风险，对产品及运营需求进行方案设计、实现及持续优化。")]),s("ul",[t._v("对业务目标及技术目标的达成负责，对问题快速响应，利用工程化的手段提高研发效率、质量。")])])])])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("header",{staticClass:"section-hd"},[s("span",{staticClass:"section-title-l"}),s("h2",{staticClass:"section-title"},[t._v("项目经验")]),s("span",{staticClass:"section-title-r"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("header",{staticClass:"item-hd"},[s("span",{staticClass:"item-time"},[t._v("2018.10 ~ 至今")]),s("a",{staticClass:"btn item-more",attrs:{href:"zhaosky.cn",target:"_blank"}},[t._v("zhaosky.cn")]),s("h3",{staticClass:"item-name"},[t._v("赵大仁 · SKY ZHAO")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"item"},[s("header",{staticClass:"item-hd"},[s("span",{staticClass:"item-time"},[t._v("2018.05 ~ 至今")]),s("a",{staticClass:"btn item-more",attrs:{href:"https://m.sinochem-fjxs.com/weixin/filter/common/redirectFlag?flag=memberCenter&sbxid=wx175f54b5df1158b4",target:"_blank"}},[t._v("小化加油")]),s("h3",{staticClass:"item-name"},[t._v("小化加油 - 公众号")])]),s("div",{staticClass:"item-bd"},[s("p",{staticClass:"section-content"},[s("strong",[t._v("前端负责人")]),s("strong",[t._v("mobile")]),s("strong",[t._v("toC")]),t._v(" 对项目进行入口拆分以及依赖文件的提取，解决了首屏加载慢的遗留问题。 针对地图、弹窗、选择器、滑动容器等功能制作公共组件。 优化开发、发版流程，管理git分支，部署自动化发版工具。 "),s("br"),t._v("#"),s("em",[t._v("vue")]),t._v(","),s("em",[t._v("vue-router")]),t._v(","),s("em",[t._v("vuex")]),t._v(","),s("em",[t._v("better-scroll")]),t._v(","),s("em",[t._v("axios")]),t._v(","),s("em",[t._v("scss")]),t._v(","),s("em",[t._v("webpack")]),t._v(","),s("em",[t._v("jenkins")]),t._v(","),s("em",[t._v("docker")]),t._v("# ")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"item"},[s("header",{staticClass:"item-hd"},[s("span",{staticClass:"item-time"},[t._v("2018.05 ~ 至今")]),s("h3",{staticClass:"item-name"},[t._v("管理平台/大数据展示平台")])]),s("div",{staticClass:"item-bd"},[s("p",{staticClass:"section-content"},[s("strong",[t._v("前端工程师")]),s("strong",[t._v("PC")]),s("strong",[t._v("toB")]),t._v(" 图表、表单类开发，包含大量复杂表单交互的处理。 "),s("br"),t._v("#"),s("em",[t._v("vue")]),t._v(","),s("em",[t._v("vue-router")]),t._v(","),s("em",[t._v("axios")]),t._v(","),s("em",[t._v("element-ui")]),t._v(","),s("em",[t._v("echarts")]),t._v(","),s("em",[t._v("scss")]),t._v(","),s("em",[t._v("webpack")]),t._v(","),s("em",[t._v("jenkins")]),t._v("# ")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"item"},[s("header",{staticClass:"item-hd"},[s("span",{staticClass:"item-time"},[t._v("2017.07 ~ 2018.04")]),s("a",{staticClass:"btn item-more",attrs:{href:"http://theory.cloud.gmw.cn/templates/app/index.html",target:"_blank"}},[t._v("理论号")]),s("h3",{staticClass:"item-name"},[t._v("光明日报理论号")])]),s("div",{staticClass:"item-bd"},[s("p",{staticClass:"section-content"},[s("strong",[t._v("前端负责人")]),s("strong",[t._v("混合式app")]),s("strong",[t._v("网址：theory.cloud.gmw.cn/templates/app/index.html")]),t._v(" 政治正确的新闻资讯站点，经历多次改版，解决了大量兼容性问题。 "),s("br"),t._v("#"),s("em",[t._v("php")]),t._v(","),s("em",[t._v("jquery")]),t._v(","),s("em",[t._v("jsbridge")]),t._v(","),s("em",[t._v("tmodjs")]),t._v(","),s("em",[t._v("owl-carousel")]),t._v("# ")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"item"},[s("header",{staticClass:"item-hd"},[s("span",{staticClass:"item-time"},[t._v("2016.12")]),s("a",{staticClass:"btn item-more",attrs:{href:"http://ws.gmym.cn/app/index.php?i=76",target:"_blank"}},[t._v("微信官网")]),t._v(" 洲际酒店微网站项目 "),s("h3",{staticClass:"item-name"},[t._v("北京三里屯通盈中心洲际酒店")])]),s("div",{staticClass:"item-bd"},[s("p",{staticClass:"section-content"},[s("strong",[t._v("前端负责人")]),s("strong",[t._v("网址：ws.gmym.cn/app/index.php?i=76")]),s("br"),t._v("#"),s("em",[t._v("php")]),t._v(","),s("em",[t._v("jquery")]),t._v(","),s("em",[t._v("tmodjs")]),t._v(","),s("em",[t._v("owl-carousel")]),t._v("# ")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"item"},[s("header",{staticClass:"item-hd"},[s("span",{staticClass:"item-time"},[t._v("2016.06 ~ 2016.10")]),s("h3",{staticClass:"item-name"},[t._v("艾索AKESO官网及后台管理系统")])]),s("div",{staticClass:"item-bd"},[s("p",{staticClass:"section-content"},[s("strong",[t._v("前端工程师")]),s("br"),t._v("#"),s("em",[t._v("rubyonrails")]),t._v(","),s("em",[t._v("react")]),t._v(","),s("em",[t._v("slim")]),t._v(","),s("em",[t._v("less")]),t._v(","),s("em",[t._v("echarts")]),t._v("# ")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"item"},[s("header",{staticClass:"item-hd"},[s("span",{staticClass:"item-time"},[t._v("2015.09 ~ 2016.04")]),s("h3",{staticClass:"item-name"},[t._v("智行护驾APP / 智行小弟APP / 智行护驾微信端")])]),s("div",{staticClass:"item-bd"},[s("p",{staticClass:"section-content"},[s("strong",[t._v("前端工程师")]),s("strong",[t._v("混合式APP")]),t._v(" 在熟练使用ES5、jQuery、Bootstrap的前提下，初识NodeJS环境，学习了运行环境、包等概念。 "),s("br"),t._v("#"),s("em",[t._v("jquery")]),t._v(","),s("em",[t._v("jsbridge")]),t._v(","),s("em",[t._v("coffeescript")]),t._v(","),s("em",[t._v("backbone")]),t._v(","),s("em",[t._v("express")]),t._v(","),s("em",[t._v("underscore")]),t._v("# ")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"item"},[s("header",{staticClass:"item-hd"},[s("span",{staticClass:"item-time"},[t._v("2015.04 ~ 2015.08")]),s("h3",{staticClass:"item-name"},[t._v("超级中学家教O2O平台")])]),s("div",{staticClass:"item-bd"},[s("p",{staticClass:"section-content"},[s("strong",[t._v("前端工程师")]),t._v(" 大四阶段与学长的创业项目，负责前后端开发，及路演等内容。 "),s("br"),t._v("#"),s("em",[t._v("php")]),t._v(","),s("em",[t._v("thinkphp")]),t._v(","),s("em",[t._v("jquery")]),t._v("# ")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"skill"},[s("header",{staticClass:"section-hd"},[s("span",{staticClass:"section-title-l"}),s("h2",{staticClass:"section-title"},[t._v("专业技能")]),s("span",{staticClass:"section-title-r"})]),s("div",{staticClass:"section-bd"},[s("ul",{staticClass:"section-list"},[s("li",[s("p",{staticClass:"section-content"},[s("i",{staticClass:"iconfont icon-dot"}),t._v("精通"),s("em",[t._v("html/css/javascript")]),t._v("，熟练掌握"),s("em",[t._v("Vue")]),t._v("、"),s("em",[t._v("jQuery")]),t._v("，掌握"),s("em",[t._v("reactjs")]),t._v("、"),s("em",[t._v("angular")]),t._v("等前端框架。")])]),s("li",[s("p",{staticClass:"section-content"},[s("i",{staticClass:"iconfont icon-dot"}),t._v("精通"),s("em",[t._v("PC端")]),t._v("，"),s("em",[t._v("H5/APP")]),t._v("端的前端设计模式，熟悉"),s("em",[t._v("Webpack")]),t._v("、"),s("em",[t._v("gulp")]),t._v("等前端构建工具。")])]),s("li",[s("p",{staticClass:"section-content"},[s("i",{staticClass:"iconfont icon-dot"}),t._v("熟悉数据库基本操作，可使用"),s("em",[t._v("PHP")]),t._v("、"),s("em",[t._v("Nodejs")]),t._v("、"),s("em",[t._v("java")]),t._v("、"),s("em",[t._v("Python")]),t._v("等语言进行服务端开发。")])]),s("li",[s("p",{staticClass:"section-content"},[s("i",{staticClass:"iconfont icon-dot"}),t._v("熟练使用"),s("em",[t._v("docker")]),t._v("、"),s("em",[t._v("jenkins")]),t._v("等自动化构建工具")])]),s("li",[s("p",{staticClass:"section-content"},[s("i",{staticClass:"iconfont icon-dot"}),t._v("重视"),s("em",[t._v("用户体验")]),t._v("，有一定"),s("em",[t._v("视觉设计")]),t._v("能力。")])]),s("li",[s("p",{staticClass:"section-content"},[s("i",{staticClass:"iconfont icon-dot"}),t._v("熟练掌握"),s("em",[t._v("Git")]),t._v("，熟悉多人开发流程。")])]),s("li",[s("p",{staticClass:"section-content"},[s("i",{staticClass:"iconfont icon-dot"}),t._v("掌握"),s("em",[t._v("koa")]),t._v("、"),s("em",[t._v("express")]),t._v("等Node后端框架。")])]),s("li",[s("p",{staticClass:"section-content"},[s("i",{staticClass:"iconfont icon-dot"}),t._v("可以独立完成"),s("em",[t._v("微信小程序")]),t._v("开发，有过"),s("em",[t._v("小游戏")]),t._v("经验，能够快速掌握新技能，可阅读"),s("em",[t._v("英文文档")]),t._v("，适应英文办公环境。")])]),s("li",[s("p",{staticClass:"section-content"},[s("i",{staticClass:"iconfont icon-dot"}),t._v("有责任感，学习能力强，有良好的沟通技巧和团队合作精神。")])])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"prize"},[s("header",{staticClass:"section-hd"},[s("span",{staticClass:"section-title-l"}),s("h2",{staticClass:"section-title"},[t._v("奖项证书")]),s("span",{staticClass:"section-title-r"})]),s("div",{staticClass:"section-bd"},[s("div",{staticClass:"item"},[s("header",{staticClass:"item-hd"},[s("span",{staticClass:"item-time"},[t._v("2013.09")]),s("span",{staticClass:"item-more"},[t._v("市级")]),s("h3",{staticClass:"item-name"},[t._v("全国大学生电子设计竞赛（本科组）·一等奖第一名")])])]),s("div",{staticClass:"item"},[s("header",{staticClass:"item-hd"},[s("span",{staticClass:"item-time"},[t._v("2013.09")]),s("span",{staticClass:"item-more"},[t._v("全国")]),s("h3",{staticClass:"item-name"},[t._v("全国大学生电子设计竞赛（本科组）·二等奖")])])])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("header",{staticClass:"content-right content-hd"},[i("section",{staticClass:"title"},[i("img",{staticClass:"avatar",attrs:{src:s("0ba3")}}),i("div",{staticClass:"name"},[i("h1",[t._v("赵天")])]),i("h2",{staticClass:"job"},[t._v("前端工程师"),i("br"),t._v("全栈工程师")])]),i("section",{staticClass:"info"},[i("h2",[t._v("男 / 1992.12.23")]),i("h3",[t._v("北京工业大学 · 电子信息工程")]),i("h3",[t._v("北京工业大学 · 广告学双学位")]),i("h3",[t._v("本科 / 2015年毕业")])]),i("section",{staticClass:"contact"},[i("ul",[i("li",[i("a",{attrs:{href:"http://zhaosky.cn",target:"_blank"}},[i("i",{staticClass:"iconfont icon-homepage"}),i("span",{staticClass:"contact-link"},[t._v("zhaosky.cn")])])]),i("li",[i("a",{attrs:{href:"https://github.com/boyzhaotian",target:"_blank"}},[i("i",{staticClass:"iconfont icon-github"}),i("span",{staticClass:"contact-link"},[t._v("github.com/boyzhaotian")])])]),i("li",[i("a",{attrs:{href:"mailto:13426031783@139.com",target:"_blank"}},[i("i",{staticClass:"iconfont icon-email"}),i("span",{staticClass:"contact-link"},[t._v("13426031783@139.com")])])]),i("li",[i("a",{attrs:{href:"tel:13426031783",target:"_blank"}},[i("i",{staticClass:"iconfont icon-phone"}),i("span",{staticClass:"contact-link"},[t._v("13426031783")])])])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("footer",{staticClass:"print-footer"},[s("a",{staticClass:"footer-link",attrs:{href:"https://boyzhaotian.github.io/resume-1",target:"_blank"}},[s("i",{staticClass:"iconfont icon-link"}),t._v(" 网页版简历：boyzhaotian.github.io/resume")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("footer",{staticClass:"github-footer"},[s("a",{staticClass:"footer-link",attrs:{href:"https://github.com/boyzhaotian/resume-1",target:"_blank"}},[s("i",{staticClass:"iconfont icon-link"}),t._v(" github.com/boyzhaotian/resume")])])}],Y={},Z=Y,X=(s("94d3"),Object(v["a"])(Z,Q,R,!1,null,"36bda6cb",null)),tt=X.exports,et=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"blog"},[s("narrow-content",{attrs:{title:"Blog博客"}},[s("blog-item"),s("blog-item"),s("blog-item")],1),s("get-in-touch")],1)},st=[],it={components:{BlogItem:G,GetInTouch:W["a"],NarrowContent:F["a"]}},at=it,nt=Object(v["a"])(at,et,st,!1,null,null,null),ct=nt.exports,ot=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"more-contact"},[s("div",{staticClass:"narrow-content"},[s("div",{staticClass:"row"},[t._m(0),t._m(1),t._m(2),s("div",{staticClass:"col-md-4"},[s("div",{staticClass:"feature feature-sm animate-box",attrs:{"data-animate-effect":"fadeInLeft"}},[t._m(3),s("div",{staticClass:"text"},[s("p",[s("span",{staticClass:"green",on:{click:function(e){return t.$router.push({name:"resume"})}}},[t._v("→个人简历点击这里←")])])])])])])])]),s("div",{staticClass:"narrow-content animate-box",attrs:{"data-animate-effect":"fadeInLeft"}},[t._m(4),s("form",{attrs:{action:""}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",placeholder:"称呼"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"text",placeholder:"邮箱"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.mobile,expression:"mobile"}],staticClass:"form-control",attrs:{type:"text",placeholder:"手机号"},domProps:{value:t.mobile},on:{input:function(e){e.target.composing||(t.mobile=e.target.value)}}})])]),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],staticClass:"form-control",attrs:{name:"",id:"message",cols:"30",rows:"7",placeholder:"内容"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("input",{staticClass:"btn btn-primary btn-md",attrs:{type:"submit",value:"发送邮件"},on:{click:t.sendMessage}})])])])])])])]),s("div",{attrs:{id:"map"}})])},rt=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-md-4"},[s("div",{staticClass:"feature feature-sm animate-box",attrs:{"data-animate-effect":"fadeInLeft"}},[s("div",{staticClass:"icon"},[s("i",{staticClass:"icon-globe"})]),s("div",{staticClass:"text"},[s("p",[s("a",{attrs:{href:"#"}},[t._v("13426031783@139.com")])])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-md-4"},[s("div",{staticClass:"feature feature-sm animate-box",attrs:{"data-animate-effect":"fadeInLeft"}},[s("div",{staticClass:"icon"},[s("i",{staticClass:"icon-map"})]),s("div",{staticClass:"text"},[s("p",[t._v("地球 亚洲 中国 北京 北京市 海淀区")])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-md-4"},[s("div",{staticClass:"feature feature-sm animate-box",attrs:{"data-animate-effect":"fadeInLeft"}},[s("div",{staticClass:"icon"},[s("i",{staticClass:"icon-phone"})]),s("div",{staticClass:"text"},[s("p",[s("a",{attrs:{href:"tel://"}},[t._v("+86 134 2603 1783")])])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"icon"},[s("i",{staticClass:"icon-phone"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-4"},[s("h2",[t._v("联系我")])])])}],lt=(s("b0c0"),s("99af"),s("60de")),ut=s.n(lt),vt=s("57c4"),mt=s.n(vt),dt="1400151932",ft="09af7b453d651363a4a93b8c2ff01327",_t={data:function(){return{name:"",email:"",mobile:"",content:""}},mounted:function(){console.log(this.API)},methods:{sendMessage:function(){event.preventDefault(),this.name||this.email||this.mobile||this.content||mt.a.alert("请填写完整信息方便后期与您取得联系哦"),mt.a.confirm("\n                <div style='text-align:left'>请核对您要发送的信息：\n                <br>称呼：".concat(this.name,"\n                <br>邮箱：").concat(this.email,"\n                <br>手机号：").concat(this.mobile,"\n                <br>内容：").concat(this.content,"</div>"),this.sendMail)},sendMail:function(){this.API.sendMail(this.$data,(function(t){"success"===t.status?mt.a.alert("发送成功！"):mt.a.alert("发送失败！Error:"+t.message),console.log(t)}))},sendSMS:function(){var t=ut()(dt,ft),e=t.SmsSingleSender(),s=0,i=function(t,e,s){console.log(t,e,s)};e.send(s,86,this.phone,"【个人主页-联系我】称呼：".concat(this.name,"，邮箱：").concat(this.email,"，手机号：").concat(this.mobile,"，内容：").concat(this.content,"。"),"","",i)}}},ht=_t,pt=Object(v["a"])(ht,ot,rt,!1,null,null,null),gt=pt.exports,Ct=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"portfolio"},[s("narrow-content",{attrs:{title:"Portfolio作品集"}},[s("portfolio-item"),s("portfolio-item"),s("portfolio-item")],1),s("get-in-touch")],1)},bt=[],wt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-md-3 col-sm-6 col-padding text-center animate-box"},[s("a",{staticClass:"work image-popup",style:{backgroundImage:"url("+t.img+")"},attrs:{href:t.link}},[s("div",{staticClass:"desc"},[s("h3",[t._v(t._s(t.name))]),s("span",[t._v(t._s(t.illus))])])])])},yt=[],kt={props:{name:{type:String,default:"Project Name"},illus:{type:String,default:"Illustration"},link:{type:String,default:"#"},img:{type:String,default:"/static/img/img-1.jpg"}}},xt=kt,jt=Object(v["a"])(xt,wt,yt,!1,null,null,null),$t=jt.exports,Et={components:{PortfolioItem:$t,NarrowContent:F["a"],GetInTouch:W["a"]}},Pt=Et,St=Object(v["a"])(Pt,Ct,bt,!1,null,null,null),Ot=St.exports,It=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"settings"},[s("div",{staticClass:"narrow-content"},[s("h2",{staticClass:"heading animate-box",attrs:{"data-animate-effect":"fadeInLeft"}},[t._v(" Settings网站设置 ")]),s("div",{staticClass:"weui-cells weui-cells_form"},[s("div",{staticClass:"weui-cell weui-cell_switch"},[s("div",{staticClass:"weui-cell__bd"},[t._v("开启网站引导")]),s("div",{staticClass:"weui-cell__ft"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.guide,expression:"guide"}],staticClass:"weui-switch",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.guide)?t._i(t.guide,null)>-1:t.guide},on:{change:function(e){var s=t.guide,i=e.target,a=!!i.checked;if(Array.isArray(s)){var n=null,c=t._i(s,n);i.checked?c<0&&(t.guide=s.concat([n])):c>-1&&(t.guide=s.slice(0,c).concat(s.slice(c+1)))}else t.guide=a}}})])])]),t._m(0)])])},At=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"weui-cells__tips"},[t._v(" *开启后需刷新页面查看引导"),s("a",{attrs:{href:""}},[t._v("点击刷新")])])}],Mt={data:function(){return{guide:this.$store.state.guide}},watch:{"$store.state.guide":function(t){this.guide=t},guide:function(t){this.$store.commit("guide",t)}}},Tt=Mt,Lt=Object(v["a"])(Tt,It,At,!1,null,null,null),Nt=Lt.exports,zt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._v("404")])},Bt=[],qt={},Ht=qt,Dt=Object(v["a"])(Ht,zt,Bt,!1,null,null,null),Gt=Dt.exports;i["a"].use(E["a"]);var Wt=new E["a"]({mode:"history",base:"/",routes:[{path:"/",redirect:"home",name:"root"},{path:"/about",name:"about",component:function(){return s.e("about").then(s.bind(null,"f820"))}},{path:"/about/resume",name:"resume",component:tt},{path:"/resume",redirect:{name:"resume"}},{path:"/home",name:"home",component:K},{path:"/blog",name:"blog",component:ct},{path:"/contact",name:"contact",component:gt},{path:"/portfolio",name:"portfolio",component:Ot},{path:"/settings",name:"settings",component:Nt},{path:"*",component:Gt}]}),Ft=s("2f62");i["a"].use(Ft["a"]);var Jt=new Ft["a"].Store({state:{guide:!localStorage.getItem("guide")||"true"===localStorage.getItem("guide"),guideTime:5e3,weuiConfirm:{title:"弹窗标题"}},mutations:{guide:function(t,e){localStorage.setItem("guide",e),t.guide=e}},actions:{}});s("8a03"),s("336f"),s("455b"),s("ab8b");i["a"].config.productionTip=!1,new i["a"]({router:Wt,store:Jt,render:function(t){return t($)}}).$mount("#app")},"5c0b":function(t,e,s){"use strict";s("9c0c")},"5c16":function(t,e,s){},"5c64":function(t,e,s){"use strict";s("d32a")},6:function(t,e){},"62db":function(t,e,s){"use strict";s("ab0c")},"6a87":function(t,e,s){"use strict";s("5c16")},"6d44":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"narrow-content"},[s("h2",{staticClass:"heading animate-box",attrs:{"data-animate-effect":"fadeInLeft"}},[t._v(" "+t._s(t.title)+" ")]),s("div",{staticClass:"row"},[t._t("default")],2)])},a=[],n={props:{title:{type:String,default:"title标题"}}},c=n,o=s("2877"),r=Object(o["a"])(c,i,a,!1,null,null,null);e["a"]=r.exports},7:function(t,e){},7463:function(t,e,s){"use strict";s("14dd")},8:function(t,e){},"8a03":function(t,e,s){},9:function(t,e){},"94d3":function(t,e,s){"use strict";s("b8dc")},"9c0c":function(t,e,s){},ab0c:function(t,e,s){},b475:function(t,e,s){},b8dc:function(t,e,s){},bfa3:function(t,e,s){},c5be:function(t,e,s){"use strict";s("bfa3")},cdf4:function(t,e,s){t.exports=s.p+"img/logo-sky-blue.81c8ac92.png"},d32a:function(t,e,s){},e4dc:function(t,e,s){}});
//# sourceMappingURL=app.0faab94e.js.map