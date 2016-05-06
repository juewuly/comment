//yuanyuan23@staff.sina.com.cn 5759
//评论插件
//2014-10-28
//评论插件配置参数说明
// 1.所需参数，放在页面中

// __docConfig={
// 	__content,
// 	__mainPic,
// 	__title,
// 	__docUrl,
// 	__cmntTotal,
// 	__cmntListUrl,
// 	__docUrl,
// 	__suda
// }

// 2.使用方法：
// var oComment = new Comment({
//      	main : $('#mainpage'), //默认$('#mainpage'), 整体页面的容器
//      	cmtsmtCallBack : function(content, Success, _this){//发评论的回调
//      		sendMessage(content, Success, _this);
//      	}
// });

// function sendMessage(content, Success , _this){
//     $.ajax({
// 	type: 'POST',
// 	url: '',
// 	data: data,
// 	dataType: 'json',
// 	timeout: 10000,
// 	success: function(data){
// 		Success && Success.call(_this);
//     	},
// 	error: function(xhr, type){
// 	}
//     })
// }

// 另外还有两个公开方法：
// oComment.commentShow(); 显示输入框
// oComment.commentHide(); 隐藏输入框

var commentConfig = {
    sendcomments: 'http://site.proc.sina.cn/cmnt/post_ajax.php', //评论的接口（必须）
    user: {
        usernick: '' //用户的信息登录状态下出现  （登录状态下必须,未登录为空）
    },
    logout: {
        switchurl: 'http://passport.sina.cn/signin/signin?entry=wapsso&revalid=2&r=' + encodeURIComponent(__docConfig.__docUrl), //登出和切换的链接登录状态下出现 （登录状态下必须,未登录为空）
        logouturl: 'http://passport.sina.cn/sso/logout?entry=wapsso&r=' + encodeURIComponent(__docConfig.__docUrl) //登出和切换的链接登录状态下出现 （登录状态下必须,未登录为空）
    },
    login: {
        loginurl: 'http://passport.sina.cn/signin/signin?entry=wapsso&r=' + encodeURIComponent(__docConfig.__docUrl) + '&backTitle=' + encodeURIComponent(__docConfig.__title), //登录注册的链接 未登录的状态下出现(未登录状态下必须，登录为空)
        signup: 'http://passport.sina.cn/signup/signup?r=' + encodeURIComponent(__docConfig.__docUrl) //登录注册的链接 未登录的状态下出现(未登录状态下必须，登录为空)
    },
    // closefloatlayer : true, //如果不需要底部浮层为true,需要底部浮层false,默认为false(非必须)
    comt: { //评论按钮/跳页（除神短评外必须）
        show: true, //不需要到评论页的话给false url给空
        url: __docConfig.__cmntListUrl,
        comt_num: __docConfig.__cmntTotal //评论数
    },
    favor: {
        show: false

    },
    share: { //分享按钮/跳页  (非必须)
        show: true,
        url: 'http://share.sina.cn/callback?url=' + encodeURIComponent(__docConfig.__docUrl) + '&title=' + encodeURIComponent(__docConfig.__title) + '&pic=' + __docConfig.__mainPic + '&content=' + encodeURIComponent(__docConfig.__content) //分享页
    },
    suda: __docConfig.__suda || ''
};



function Comment(options) {
    //为了继承
    if (!arguments.length) return;
    window.ishare = window.ishare || false;
    this.shareBtn = window.ishare ? 'j_shareBtn' : 'j_share_btn';
    this.options = options || {};
    this.options.main = $('body');
    // this.options.main = options.main || $('body');
    this.options.closefloatlayer = commentConfig.closefloatlayer || false;
    this.options.commentCallBack = options.commentCallBack || null; //评论回调
    this.options.commentPageCallBack = options.commentPageCallBack || null; //跳页回调
    this.options.shareCallBack = options.shareCallBack || null; //分享回调
    this.options.cmtsmtCallBack = options.cmtsmtCallBack || null; //发评论回调
    this.options.cmtcancelCallBack = options.cmtcancelCallBack || null; //取消回调
    this.options.setTop = options.setTop || false;
    this.options.screenScroll = 0;
    commentConfig.dnick = '手机新浪网用户';
    commentConfig.dface = 'http://mjs.sinaimg.cn/wap/module/short_comment/201506041400/images/dface.gif';

    this.sending = 0;
    commentConfig.comt = commentConfig.comt || {};
    commentConfig.favor = commentConfig.favor || {};
    commentConfig.share = commentConfig.share || {};
    commentConfig.comt.comt_num = commentConfig.comt.comt_num || '0';
    commentConfig.comtTitle = commentConfig.comtTitle || '说说你的看法';
    commentConfig.closeComment = commentConfig.closeComment || false;
    if (window.__if_cmnt) {
        commentConfig.share.show = false;
        commentConfig.comt.show = false;
        commentConfig.favor.show = false;
    } else {
        commentConfig.comt.show = commentConfig.comt.show || false;
        commentConfig.favor.show = commentConfig.favor.show || false;
        commentConfig.share.show = commentConfig.share.show || false;
    }

    commentConfig.login = commentConfig.login || {};
    commentConfig.login.loginurl = commentConfig.login.loginurl || '';
    commentConfig.login.signup = commentConfig.login.signup || '';
    commentConfig.logout = commentConfig.logout || {};
    commentConfig.logout.switchurl = commentConfig.logout.switchurl || '';
    commentConfig.logout.logouturl = commentConfig.logout.logouturl || '';


    if (!window.__userConfig__) {

        __userConfig__ = {};
        __userConfig__.__isLogin = commentConfig.user.isLogin || globalConfig.islogin;

    }

    if (commentConfig.closeComment) return;

    commentConfig.suda = commentConfig.suda || 'comment';
    this.ua = window.navigator.userAgent.toLowerCase();

    // this._addcss();
    //生成元素
    this._createDOM();
    //添加事件
    this._addEvent();


    getUserInfo(function(rs) {

        if (rs.uid) {
            commentConfig.user = {
                isLogin: rs.uid,
                usernick: rs.uname || commentConfig.dnick,
                userface: rs.userface || commentConfig.dface
            }


        } else {
            commentConfig.user = {};
        }

        // console.log(commentConfig.user);
    })
}



var oMeta = document.getElementsByName('viewport')[0];
Comment.prototype._addcss = function() {
        // var oLink=document.createElement('link');
        // oLink.rel='stylesheet';
        // oLink.type='text/css';
        // // oLink.href='http://dpool.dev.sina.cn/yuanyuan/short_comment/css/addComment.css';
        // oLink.href='http://mjs.sinaimg.cn/wap/module/short_comment/201505220900/css/addComment.css';

        // document.getElementsByTagName('head')[0].appendChild(oLink);
    }
    // 创建dom
Comment.prototype._createDOM = function() {
    window._this = this;
    var arr = [];
    // 底部浮层

    if (!this.options.closefloatlayer) {
        arr.push('<aside>');
        arr.push('<div class="foot_comment">');
        arr.push('<div class="foot_commentcont">');
        arr.push('<div class="foot_cmt_input j_cmt_btn" data-sudaclick="' + commentConfig.suda + '_cmt_btn"><p>' + commentConfig.comtTitle + '</p>');
        arr.push('</div>');
        // 如果需要收藏
        if (commentConfig.favor.show) {
            arr.push('<div class="foot_cmt_favor j_iadd_btn"></div>');
        }
        // 如果需要评论跳页
        if (commentConfig.comt.show) {
            arr.push('<div class="foot_cmt_num j_p_comt">');
            arr.push('<a href="' + commentConfig.comt.url + '" title="" data-sudaclick="' + commentConfig.suda + '_comt">');
            arr.push('<span class="cmt_num_t">' + commentConfig.comt.comt_num + '</span></a></div>');
        }

        // 如果需要分享
        // if(commentConfig.user.isLogin){//未登录
        // 	if(commentConfig.share.show){
        // 		arr.push('<div class="foot_cmt_share '+ this.shareBtn +'">');
        // 		arr.push('<a href="'+ commentConfig.share.url +'" title="" data-sudaclick="'+ commentConfig.suda+'_share">');
        // 		arr.push('<span class="cmt_share">分享</span>');
        // 		arr.push('</a></div>');
        // 	}
        // }
        // else{
        if (commentConfig.share.show) {
            arr.push('<div class="foot_cmt_share ' + this.shareBtn + '"></div>');

        }

        // }
        // 如果右边都不要的话显示评论数
        if (!commentConfig.comt.show && !commentConfig.share.show && !commentConfig.favor.show) {
            arr.push('<div class="foot_cmt_num j_cmt_btn">');
            arr.push('<a href="javascript:;" title="">');
            arr.push('<span class="cmt_num_t" data-sudaclick="' + commentConfig.suda + '_cmt_btn">' + commentConfig.comt.comt_num + '</span></a></div>');
        }

        arr.push('</div></div></aside>');
    }
    // 登录评论页
    arr.push('<div class="cmnt_fixed" id="j_cmnt_pop"></div>');
    arr.push('<aside id="tipsCeng" class="tipsCeng">');
    arr.push('<div class="comment_remind animation_marker">');
    arr.push('<p class="marker_t">您已发送成功！</p>');
    arr.push('</div>');
    arr.push('</aside>');

    $('body').parent().append(arr.join(''));

}

Comment.prototype._addFloat = function() {
    if ($('#j_cmnt_input').length > 0) {
        return;
    }
    var arr = [];
    //black
    arr.push('<div class="th_td">');
    arr.push('<a href="javascript:void(0);" class="cmnt_cancel" id="j_cmnt_cancel" data-sudaclick="' + commentConfig.suda + '_send_cancel">取消</a>');
    arr.push('<a href="javascript:void(0);" class="cmnt_smt" id="j_cmnt_smt" data-sudaclick="' + commentConfig.suda + '_send_cmnt">发送</a>');
    arr.push('</div>');
    arr.push('<div class="cmnt_border">');
    arr.push('<textarea id="j_cmnt_input" class="cmnt_textarea" name="" placeholder="' + commentConfig.comtTitle + '"></textarea>');
    arr.push('<div class="cmnt_opbox">');
    arr.push('<span class="cmnt_tabbtn j_cmnt_tabbtn"></span>');
    arr.push('<label class="cmnt_sharebtn"><input type="checkbox" class="cmnt_checkbox">同时转发到微博</label>');
    arr.push('</div></div>');

    arr.push(' <div class="cmnt_tablist j_cmnt_tablist"><div class="cmnt_words j_cmnt_words">');
    arr.push('<div class="cmnt_word_th"><span class="word_tit">选择下面短评论可实现快速回复</span></div>');
    arr.push('<ul class="view_list"><li>加油哦!</li><li>我要抢沙发!</li><li>非常支持赞同你的观点!</li></ul>');
    arr.push('<ul class="view_list"><li>说的有道理!</li><li>楼上说的好!</li><li>支持赞同你的观点!</li></ul>');
    arr.push('<ul class="view_list"><li>么么哒!</li><li>好有道理的!</li><li>宝宝美的像诗一样!</li></ul>');
    arr.push('</div>');

    arr.push('<div class="cmnt_faces j_cmnt_faces"><div class="facewrapper swiper-container"><div class="scroller tab-face j_tab_face swiper-wrapper">');
    arr.push('<div class="content-tab-face swiper-slide">');
    arr.push('<i data-face="[→_→]" class="face_1 face icon_0"></i>');
    arr.push('<i data-face="[呵呵]" class="face_1 face icon_1"></i>');
    arr.push('<i data-face="[嘻嘻]" class="face_1 face icon_2"></i>');
    arr.push('<i data-face="[哈哈]" class="face_1 face icon_3"></i>');
    arr.push('<i data-face="[爱你]" class="face_1 face icon_4"></i>');
    arr.push('<i data-face="[挖鼻屎]" class="face_1 face icon_5"></i>');
    arr.push('<i data-face="[吃惊]" class="face_1 face icon_6"></i>');
    arr.push('<i data-face="[晕]" class="face_1 face icon_7"></i>');
    arr.push('<i data-face="[泪]" class="face_1 face icon_8"></i>');
    arr.push('<i data-face="[馋嘴]" class="face_1 face icon_9"></i>');
    arr.push('<i data-face="[抓狂]" class="face_1 face icon_10"></i>');
    arr.push('<i data-face="[哼]" class="face_1 face icon_11"></i>');
    arr.push('<i data-face="[可爱]" class="face_1 face icon_12"></i>');
    arr.push('<i data-face="[怒]" class="face_1 face icon_13"></i>');
    arr.push('<i data-face="[汗]" class="face_1 face icon_14"></i>');
    arr.push('<i data-face="[害羞]" class="face_1 face icon_15"></i>');
    arr.push('<i data-face="[睡觉]" class="face_1 face icon_16"></i>');
    arr.push('<i data-face="[钱]" class="face_1 face icon_17"></i>');
    arr.push('<i data-face="[偷笑]" class="face_1 face icon_18"></i>');
    arr.push('<i data-face="[笑cry]" class="face_1 face icon_19"></i>');
    arr.push('<i data-face="[doge]" class="face_1 face icon_20"></i>');
    arr.push('</div>');

    arr.push('<div class="content-tab-face swiper-slide">');
    arr.push('<i data-face="[喵喵]" class="face_1 face icon_21"></i>');
    arr.push('<i data-face="[酷]" class="face_1 face icon_22"></i>');
    arr.push('<i data-face="[衰]" class="face_1 face icon_23"></i>');
    arr.push('<i data-face="[闭嘴]" class="face_1 face icon_24"></i>');
    arr.push('<i data-face="[鄙视]" class="face_1 face icon_25"></i>');
    arr.push('<i data-face="[花心]" class="face_1 face icon_26"></i>');
    arr.push('<i data-face="[鼓掌]" class="face_1 face icon_27"></i>');
    arr.push('<i data-face="[悲伤]" class="face_2 face icon_0"></i>');
    arr.push('<i data-face="[思考]" class="face_2 face icon_1"></i>');
    arr.push('<i data-face="[生病]" class="face_2 face icon_2"></i>');
    arr.push('<i data-face="[亲亲]" class="face_2 face icon_3"></i>');
    arr.push('<i data-face="[怒骂]" class="face_2 face icon_4"></i>');
    arr.push('<i data-face="[太开心]" class="face_2 face icon_5"></i>');
    arr.push('<i data-face="[懒得理你]" class="face_2 face icon_6"></i>');
    arr.push('<i data-face="[右哼哼]" class="face_2 face icon_7"></i>');
    arr.push('<i data-face="[左哼哼]" class="face_2 face icon_8"></i>');
    arr.push('<i data-face="[嘘]" class="face_2 face icon_9"></i>');
    arr.push('<i data-face="[委屈]" class="face_2 face icon_10"></i>');
    arr.push('<i data-face="[吐]" class="face_2 face icon_11"></i>');
    arr.push('<i data-face="[可怜]" class="face_2 face icon_12"></i>');
    arr.push('<i data-face="[打哈气]" class="face_2 face icon_13"></i>');
    arr.push('</div>');

    arr.push('<div class="content-tab-face swiper-slide">');
    arr.push('<i data-face="[挤眼]" class="face_2 face icon_14"></i>');
    arr.push('<i data-face="[失望]" class="face_2 face icon_15"></i>');
    arr.push('<i data-face="[顶]" class="face_2 face icon_16"></i>');
    arr.push('<i data-face="[疑问]" class="face_2 face icon_17"></i>');
    arr.push('<i data-face="[困]" class="face_2 face icon_18"></i>');
    arr.push('<i data-face="[感冒]" class="face_2 face icon_19"></i>');
    arr.push('<i data-face="[拜拜]" class="face_2 face icon_20"></i>');
    arr.push('<i data-face="[黑线]" class="face_2 face icon_21"></i>');
    arr.push('<i data-face="[阴险]" class="face_2 face icon_22"></i>');
    arr.push('<i data-face="[互粉]" class="face_2 face icon_23"></i>');
    arr.push('<i data-face="[心]" class="face_2 face icon_24"></i>');
    arr.push('<i data-face="[伤心]" class="face_2 face icon_25"></i>');
    arr.push('<i data-face="[猪头]" class="face_2 face icon_26"></i>');
    arr.push('<i data-face="[熊猫]" class="face_2 face icon_27"></i>');
    arr.push('<i data-face="[兔子]" class="face_3 face icon_0"></i>');
    arr.push('<i data-face="[握手]" class="face_3 face icon_1"></i>');
    arr.push('<i data-face="[作揖]" class="face_3 face icon_2"></i>');
    arr.push('<i data-face="[赞]" class="face_3 face icon_3"></i>');
    arr.push('<i data-face="[耶]" class="face_3 face icon_4"></i>');
    arr.push('<i data-face="[good]" class="face_3 face icon_5"></i>');
    arr.push('<i data-face="[弱]" class="face_3 face icon_6"></i>');
    arr.push('</div>')


    arr.push('<div class="content-tab-face swiper-slide">');
    arr.push('<i data-face="[不要]" class="face_3 face icon_7"></i>');
    arr.push('<i data-face="[ok]" class="face_3 face icon_8"></i>');
    arr.push('<i data-face="[haha]" class="face_3 face icon_9"></i>');
    arr.push('<i data-face="[来]" class="face_3 face icon_10"></i>');
    arr.push('<i data-face="[威武]" class="face_3 face icon_11"></i>');
    arr.push('<i data-face="[鲜花]" class="face_3 face icon_12"></i>');
    arr.push('<i data-face="[钟]" class="face_3 face icon_13"></i>');
    arr.push('<i data-face="[浮云]" class="face_3 face icon_14"></i>');
    arr.push('<i data-face="[飞机]" class="face_3 face icon_15"></i>');
    arr.push('<i data-face="[月亮]" class="face_3 face icon_16"></i>');
    arr.push('<i data-face="[太阳]" class="face_3 face icon_17"></i>');
    arr.push('<i data-face="[微风]" class="face_3 face icon_18"></i>');
    arr.push('<i data-face="[下雨]" class="face_3 face icon_19"></i>');
    arr.push('<i data-face="[给力]" class="face_3 face icon_20"></i>');
    arr.push('<i data-face="[神马]" class="face_3 face icon_21"></i>');
    arr.push('<i data-face="[围观]" class="face_3 face icon_22"></i>');
    arr.push('<i data-face="[话筒]" class="face_3 face icon_23"></i>');
    arr.push('<i data-face="[奥特曼]" class="face_3 face icon_24"></i>');
    arr.push('<i data-face="[草泥马]" class="face_3 face icon_25"></i>');
    arr.push('<i data-face="[萌]" class="face_3 face icon_26"></i>');
    arr.push('<i data-face="[囧]" class="face_3 face icon_27"></i>');
    arr.push('</div>')

    arr.push('<div class="content-tab-face swiper-slide">');
    arr.push('<i data-face="[织]" class="face_4 face icon_0"></i>');
    arr.push('<i data-face="[礼物]" class="face_4 face icon_1"></i>');
    arr.push('<i data-face="[喜]" class="face_4 face icon_2"></i>');
    arr.push('<i data-face="[围脖]" class="face_4 face icon_3"></i>');
    arr.push('<i data-face="[音乐]" class="face_4 face icon_4"></i>');
    arr.push('<i data-face="[绿丝带]" class="face_4 face icon_5"></i>');
    arr.push('<i data-face="[蛋糕]" class="face_4 face icon_6"></i>');
    arr.push('<i data-face="[蜡烛]" class="face_4 face icon_7"></i>');
    arr.push('<i data-face="[干杯]" class="face_4 face icon_8"></i>');
    arr.push('<i data-face="[男孩儿]" class="face_4 face icon_9"></i>');
    arr.push('<i data-face="[女孩儿]" class="face_4 face icon_10"></i>');
    arr.push('<i data-face="[肥皂]" class="face_4 face icon_11"></i>');
    arr.push('<i data-face="[照相机]" class="face_4 face icon_12"></i>');
    arr.push('<i data-face="[浪]" class="face_4 face icon_13"></i>');
    arr.push('<i data-face="[沙尘暴]" class="face_4 face icon_14"></i>');
    arr.push('</div>');
    arr.push('</div></div>');
    arr.push('<ul class="nav-tab-face selfclear"><li class="current">1</li><li>2</li><li class="">3</li><li class="">4</li><li class="">5</li></ul>');
    arr.push('</div>');
    //end black
    this.oCmtArea.append(arr.join(''));

    this.oTextarea = $('#j_cmnt_input');
    this.oWb_sendcont = $('#j_wb_sendcont');
    var _this = this;
    //black
    _this.oCmtFace = [];
    setTimeout(function() {
        new Swiper('.swiper-container', {
        	onSlideChangeEnd:function(swiper){
        		$('.nav-tab-face li').removeClass('current');
        		$('.nav-tab-face').find('li').eq(swiper.activeIndex).addClass('current');
        	}
        });
    }, 0);

    $('.j_tab_face .content-tab-face i').forEach(function(item, index) {
            _this.oCmtFace.push($(item).attr('data-face'));
        })
        //end black
    if (_this.oWb_sendcont.length > 0) {

        if (getCookie('commentCheck') == '0') {


            _this.oWb_sendcont[0].checked = '';

        }


        if ($('#j_input_check').length > 0) {
            $('#j_input_check').on('click', function() {
                if (this.checked) {
                    setCookie('commentCheck', '1');
                    _this.oWb_sendcont[0].checked = 'checked';
                } else {
                    setCookie('commentCheck', '0');
                    _this.oWb_sendcont[0].checked = '';
                }
            })
        }

        _this.oWb_sendcont.on('click', function() {
            if (this.checked) {

                setCookie('commentCheck', '1', 999);
                if ($('#j_input_check').length > 0) {
                    $('#j_input_check')[0].checked = 'checked';
                }
            } else {

                setCookie('commentCheck', '0', 999);
                if ($('#j_input_check').length > 0) {
                    $('#j_input_check')[0].checked = '';
                }
            }
        })


        function setCookie(name, value, expires, path, domain, secure) {
            var oDate = new Date();

            oDate.setDate(oDate.getDate() + expires);


            document.cookie = name + "=" + escape(value) +
                ((expires) ? "; expires=" + oDate : "") +
                "; path=/" +
                "; domain=sina.cn";
        }

        function getCookie(ckName) {

            if (undefined == ckName || "" == ckName) {
                return false;
            }

            return stringSplice(document.cookie, ckName, ";", "");

        }

        function stringSplice(src, k, e, sp) {
            if (src == "") {
                return "";
            }
            sp = (sp == "") ? "=" : sp;
            k += sp;
            var ps = src.indexOf(k);
            if (ps < 0) {
                return "";
            }
            ps += k.length;
            var pe = src.indexOf(e, ps);
            if (pe < ps) {
                pe = src.length;
            }

            return src.substring(ps, pe);
        }

    }
}



Comment.prototype._addEvent = function() {
    this.oShare = $('.' + this.shareBtn),
        this.oComment = $('.j_p_comt'),
        this.oCmtText = $('.j_cmt_btn'),
        this.oCmtArea = $('#j_cmnt_pop'),
        this.oMainWrap = this.options.main,
        this.oSucTips = $('#tipsCeng'),
        this.oreplybtn = $('.replybtn'),
        this.owb_ico = $('.wb_ico');
    this.oFoot_comment = $('.foot_comment');
    this.oCmnt_login = $('.cmnt_login');
    this.oWb_sendcont = $('#j_wb_sendcont');
    this.focusStatus = 0;
    oViedo = $('video');
    var _this = this;
    //记录转发到微博

    addCommentlogin = (typeof(WapLogin) == 'function') ? (new WapLogin()) : this;
    //在window中判断有没有SINA_OUTLOGIN_LAYER来确定有没有浮层对象
    //black
    _this.commentShow();
    //end black


    //black
    $(window).on('click', '.j_add_cmt', showComment);
    this.oFoot_comment.on('click', '.j_cmt_btn', showComment);
    //点击评论，出现评论浮层
    function showComment() {
        if (__userConfig__.__isLogin || commentConfig.user.isLogin) {

            _this.commentShow();

        } else {

            addCommentlogin.login(false, function() {


                commentConfig.user.isLogin = true;
                commentConfig.user.usernick = __userConfig__.__unick || commentConfig.dnick;
                commentConfig.user.userface = __userface = __userConfig__.__uface || commentConfig.dface;


                _this._addFloat();
                _this._addEvent();

                if (window.loginActive == 'j_cmt_btn') {

                    _this.commentShow();
                }

            });

            window.loginActive = 'j_cmt_btn';
        }
    };
    //end black
    // 给目标元素绑定登录浮层
    if (!window.ishare) {
        this.oFoot_comment.on('click', '.' + _this.shareBtn, function(ev) {
            if (!commentConfig.user.isLogin) {
                addCommentlogin.login(false, function() {
                    if (window.loginActive == _this.shareBtn) {
                        window.location.href = $('.' + _this.shareBtn + ' a').data('href');
                    }
                    commentConfig.user.isLogin = true;
                    commentConfig.user.usernick = __userConfig__.__unick || commentConfig.dnick;
                    commentConfig.user.userface = __userface = __userConfig__.__uface || commentConfig.dface;


                    _this._addFloat();
                    _this._addEvent();
                });
                window.loginActive = _this.shareBtn;

                ev.preventDefault();
            } else {
                window.location.href = $('.' + _this.shareBtn + ' a').data('href');
            }
        });
    }

    if (commentConfig.user.isLogin && commentConfig.user.userface == '') {
        var url = 'http://passport.sina.cn/sso/islogin?entry=wapsso&';

        jsonp(url, {}, function(re) {

            _this.oCmnt_login.find('img').attr('src', re.data.portrait_url);
        });

    }

    if (commentConfig.user.isLogin) {
        var windowHeight = 223;
    } else {
        var windowHeight = 193;
    }

    if (!this.options.setTop) {
        if ($('#j_blankBox').length == 0) {
            //this.oCmtArea.prepend('<div id="j_blankBox" style="width:100%; height:' + (document.documentElement.clientHeight-windowHeight+10) + 'px;"></div>');
        }
    }



    if (window.navigator.userAgent.toLowerCase().indexOf('ucbrowser') == -1) {} else {
        this.oCmtArea.css('paddingBottom', 20 + 'px');
    }

    this.oShare_layer = $('#sharebox');
    if (this.oShare_layer.length > 0) {
        this.oShare_layer.on('click', function() {
            if (oViedo.length > 0) {
                if (oViedo[0].getBoundingClientRect().bottom > 0) {

                    window.scrollTo(0, document.body.scrollTop + oViedo[0].getBoundingClientRect().bottom);
                }
            }

            window.removeEventListener("touchmove", prevent, false);
            _this.oFoot_comment.hide();

        });
    }
    $(window).on('click tap', '#j_cmnt_smt', function() {
        //black
        if (!_this.sending) {
            _this.sending = 1;
            if (_this.options.cmtsmtCallBack) {
                _this.options.cmtsmtCallBack(_this.oTextarea[0].value, _this._commentSuccess, _this);
            } else {
                sendMessage(_this.oTextarea[0].value, _this._commentSuccess, _this);
            }

            setTimeout(function() {
                _this.sending = 0;
            }, 3000)
        }
    });


    //black
    //更换快速回复的表情或文字
    $(window).on('click tap', '.j_cmnt_tabbtn', function() {
        if ($(this).hasClass('cmnt_keyboard')) {
            $(this).removeClass('cmnt_keyboard');
            $('.j_cmnt_faces').addClass('hide');
        } else {
            $(this).addClass('cmnt_keyboard');
            $('.j_cmnt_faces').removeClass('hide');
        }
    });
    $(window).on('click tap', '.j_cmnt_words .view_list li', function() {
        _this.oTextarea[0].value += $(this).html();
        keepCmntValue();
    });
    $(window).on('click tap', '.j_tab_face', function(ev) {
        if ($(ev.target).attr('data-face')) {
            _this.oTextarea[0].value += $(ev.target).attr('data-face');
        }
        keepCmntValue();
    });
    $(window).on('input', '#j_cmnt_input', function() {
        keepCmntValue();
    });

    //本地存储保存评论框内容
    function keepCmntValue() {
        if ($('#j_cmnt_input').attr('char') > $('#j_cmnt_input').val().length) {
            console.log(1)

        }
        $('#j_cmnt_input').attr('char', $('#j_cmnt_input').val().length);
        try {
            localStorage.textarea = $('#j_cmnt_input').val();
        } catch (e) {

        }
    };
    //end black
    if (getCookie('commentCheck') == '0') {

        if ($('#j_input_check').length > 0) {
            $('#j_input_check')[0].checked = '';
        }

    } else {
        if ($('#j_input_check').length > 0) {

            $('#j_input_check')[0].checked = 'checked';
        }
    }

    if ($('#j_input_check').length > 0) {
        $('#j_input_check').on('click', function() {
            if (this.checked) {
                setCookie('commentCheck', '1');
                if ($('#j_wb_sendcont').length > 0) {
                    $('#j_wb_sendcont')[0].checked = 'checked';
                }


            } else {
                setCookie('commentCheck', '0');
                if ($('#j_wb_sendcont').length > 0) {
                    $('#j_wb_sendcont')[0].checked = '';
                }

            }
        })
    }

    $(window).on('click tap', '#j_cmnt_cancel', function() { //取消
        _this.commentHide();
        _this.options.cmtcancelCallBack && _this.options.cmtcancelCallBack();
    });

    setTimeout(function() {
        window.addEventListener("scroll", function() {

            if (_this.oFoot_comment.css('display') == 'none' && _this.oCmtArea.css('display') != 'block') {

                if ($('#showpic_box').length > 0) {

                    if ($('#showpic_box').hasClass('hide')) {
                        _this.oFoot_comment.show();
                    }
                } else if ($('.J-slider').length > 0) {

                } else {
                    _this.oFoot_comment.show();
                }

            }
        }, false)
    }, 500)

    function sendMessage(content, Success, _this) {

        if (content == '') {
            $('.j_op_remind').eq(0).show().html('请输入评论内容！').addClass('animate');
            setTimeout(function() {
                $('.j_op_remind').eq(0).html('').removeClass('animate').hide();
            }, 3000);
        } else {
            if (content.indexOf('script') == -1) {

                //对文章评论
                if ($('#j_wb_sendcont').is(":checked")) towb = 1;
                else towb = '';

                Success && Success.call(_this);
                $.ajax({
                    type: 'GET',
                    url: commentConfig.sendcomments,
                    // data to be added to query string:
                    data: { domain: CMNT.domain, product: CMNT.product, index: CMNT.index, vcode: CMNT.vcode, csrfcode: CMNT.csrfcode, csrftime: CMNT.csrftime, wburl: CMNT.wburl, vt: 4, cmntContent: content, towb: towb, jsoncallback: 'callbackComment' },
                    // type of data we are expecting in return:
                    dataType: 'jsonp',
                    async: false,
                    success: function(data) {

                    },
                    error: function(xhr, type) {

                    }
                });

            } else {
                $('.j_op_remind').eq(0).show().html('请您检查输入内容！').addClass('animate');
                setTimeout(function() {
                    $('.j_op_remind').eq(0).html('').removeClass('animate').hide();
                }, 3000);
            }
        }
    }

    function setCookie(name, value, expires, path, domain, secure) {
        var oDate = new Date();

        oDate.setDate(oDate.getDate() + expires);


        document.cookie = name + "=" + escape(value) +
            ((expires) ? "; expires=" + oDate : "") +
            "; path=/" +
            "; domain=sina.cn";
    }

    function getCookie(ckName) {

        if (undefined == ckName || "" == ckName) {
            return false;
        }

        return stringSplice(document.cookie, ckName, ";", "");

    }

    function stringSplice(src, k, e, sp) {
        if (src == "") {
            return "";
        }
        sp = (sp == "") ? "=" : sp;
        k += sp;
        var ps = src.indexOf(k);
        if (ps < 0) {
            return "";
        }
        ps += k.length;
        var pe = src.indexOf(e, ps);
        if (pe < ps) {
            pe = src.length;
        }

        return src.substring(ps, pe);
    }



}

window.callbackComment = function() {}

// 改变屏幕宽高适应图片大小
function changSize() {
    var docHeight = document.documentElement.clientHeight;
    var commentH = 223;
    $('#j_cmnt_pop').css('paddingTop', docHeight - commentH);
}

function prevent(e) {
    //引导浮层存在时禁止页面滚动
    e.preventDefault();
    return;
}
Comment.prototype.commentShow = function() {
    // 记录当时屏幕位置

    if ($('.cmnt_wrap').length == 0) {
        _this._addFloat();
    }
    // window.removeEventListener("scroll", footComment, false);
    this.options.commentCallBack && this.options.commentCallBack();
    this.options.screenScroll = document.body.scrollTop || document.documentElement.scrollTop;


    if (this.oMainWrap.length > 1) {
        for (var i = 0; i < this.oMainWrap.length; i++) {
            this.oMainWrap[i].hide();
        }
    } else if (this.oMainWrap.length == 1) {
        this.oMainWrap.hide();
    } else {
        return;
    }


    this.oFoot_comment.hide();
    this.oCmtArea.show();


    this.oTextarea.focus();


    oMeta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui";
    window.scrollTo(0, 1);

    if (this.ua.indexOf('os') != -1 && this.ua.indexOf('safari') != -1 && this.ua.indexOf('8') != -1) {
        var oTop = this.oCmtArea.find('.cmnt_wrap')[0].offsetTop;

        window.scrollTo(0, oTop);

    }

    try {
        localStorage.test = '1';
        if (localStorage.textarea) {
            this.oTextarea[0].value = localStorage.textarea;
        }

    } catch (e) {

    }
}

Comment.prototype._commentSuccess = function() {

    this.oTextarea[0].value = '';
    this.oTextarea[0].placeholder = commentConfig.comtTitle;
    this.oSucTips.show();
    _this = this;
    window.scrollTo(0, 12);

    setTimeout(function() {
        _this.oSucTips.hide();
        _this.oCmtArea.hide();
        if (_this.oMainWrap.length > 1) {
            for (var i = 0; i < _this.oMainWrap.length; i++) {
                _this.oMainWrap[i].show();
            }
        } else if (_this.oMainWrap.length == 1) {
            _this.oMainWrap.show();
        } else {
            return;
        }
        _this.oFoot_comment.show();
        window.scrollTo(0, _this.options.screenScroll);
        oMeta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no";
        // window.addEventListener("scroll", footComment, false);
    }, 1500)
    try {
        localStorage.textarea = '';
    } catch (e) {

    }
}

Comment.prototype.commentHide = function() {
    // window.addEventListener("scroll", footComment, false);
    this.oCmtArea.hide();
    if (this.oMainWrap.length > 1) {
        for (var i = 0; i < this.oMainWrap.length; i++) {
            this.oMainWrap[i].show();
        }
    } else if (this.oMainWrap.length == 1) {
        this.oMainWrap.show();
    } else {
        return;
    }
    try {
        localStorage.textarea = '';
    } catch (e) {

    }
    this.oFoot_comment.show();
    this.oTextarea[0].value = '';
    window.scrollTo(0, this.options.screenScroll);
    oMeta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no";
}

// 公共函数

function jsonp(url, data, fnSucc) {
    var fnName = 'jsonp_' + Math.random();
    fnName = fnName.replace('.', '');

    window[fnName] = function(arg) {
        fnSucc && fnSucc(arg);

        //清理
        oHead.removeChild(oS);
        window[fnName] = null;
    };

    data.callback = fnName;
    var arr = [];
    for (var i in data) {
        arr.push(i + '=' + encodeURIComponent(data[i]));
    }
    var sData = arr.join('&');

    var oS = document.createElement('script');
    oS.src = url + sData;

    var oHead = document.getElementsByTagName('head')[0];
    oHead.appendChild(oS);
}
