/*
 * @date :      2016-05-05
 * @changeBy : shaopeng
 */

$(function() {
    function loadMoreApply(complete) {

        var oLoader = $('#j_pullLoader'),
            page = oLoader.data('page') || 2,
            list = oLoader.data('type'),
            oWrap = $('#j_newslist');


        $.ajax({
            type: 'GET',
            url: 'http://cmnt.sina.cn/aj/cmnt/list?',
            // data to be added to query string:
            /*data: { product: "comos",group:"1", index: "awzuney4946469",page: 2},*/


            data: { product: CMNT.product, group: CMNT.group, index: CMNT.index, page: page },
            // type of data we are expecting in return:
            dataType: 'jsonp',
            timeout: 10000,
            success: function(rs) {

                if (rs.status) {
                    var list = oWrap.html(),
                        total = Math.ceil(rs.data.total / 20),
                        _list = rs.data.data;


                    if (!_list) return;
                    var len = _list.length,
                        str = '',
                        section = '';
                    for (var i = 0; i < len; i++) {
                        var main = _list[i].main,
                            reply = _list[i].reply || [],
                            sub_sec = [],
                            wbuser = main.is_wb,
                            stitle = '',
                            tstitlecon = '';

                        str += '<div class="cmnt_item" data-mid="' + main.mid + '" data-wbuser="' + wbuser + '" data-wbname="' + main.wbname + '"><img src="' + main.face + '" alt="" class="cmnt_pic"><div class="cmnt_info"><span class="cmnt_name cmnt_nick">' + main.nick + '</span><span class="cmnt_location"><i class="icon_location2"></i>' + main.source + '</span><span class="cmnt_time">' + main.time + '</span></div>';
                        if (reply.length < 4) {
                            for (var j = 0, section = '', cnt = ''; j < reply.length; j++) {
                                if (j == 0) {
                                    section = '<div class="cmnt_floor">';
                                }
                                //
                                if (reply[j].content.length > 200) cnt = reply[j].content.substring(0, 199) + '<a class="j_cmnt_more">查看全文>></a><span class="hide">' + reply[j].content.substr(200) + '</span>';
                                else cnt = reply[j].content;
                                //
                                section = section + '<div class="floor_item"><div class="floor_info"><span class="floor_name">' + reply[j].nick + '</span><span class="floor_num">F' + (j + 1) + '</span></div><div class="floor_text">' + cnt + '</div></div>';
                                if (j == reply.length - 1) {
                                    section += '</div>';
                                }
                                /*
                                if (reply[j].surl && !!reply[j].surl) {
                                    if (reply[j].stitle && !!reply[j].stitle) {
                                        tstitlecon = '<p class="cmnt_quote"><a href="' + reply[j].surl + '">' + reply[j].stitle + '</a></p>';

                                    }
                                }
                                if (reply[j].content.length > 200) cnt = reply[j].content.substring(0, 199) + '<a class="j_cmnt_more">查看全文>></a><span class="hide">' + reply[j].content.substr(200) + '</span>';
                                else cnt = reply[j].content;
                                section = '<div class="cmnt_base">' + section + '<p class="cmnt_top"><span>' + reply[j].nick + '</span><span class="cmnt_source">' + reply[j].time + '&nbsp;&nbsp;' + reply[j].source + '</span><code>' + (j + 1) + '</code></p><p class="cmnt_text">' + cnt + '</p>' + tstitlecon + '</div>';
                                */
                            }
                        } else {
                            for (var j = 0, cnt = ''; j < reply.length; j++) {
                                /*
                                if (reply[j].surl && !!reply[j].surl) {
                                    if (reply[j].stitle && !!reply[j].stitle) {
                                        tstitlecon = '<p class="cmnt_quote"><a href="' + reply[j].surl + '">' + reply[j].stitle + '</a></p>';

                                    }
                                }
                                if (reply[j].content.length > 200) cnt = reply[j].content.substring(0, 199) + '<a class="j_cmnt_more">查看全文>></a><span class="hide">' + reply[j].content.substr(200) + '</span>';
                                else cnt = reply[j].content;
                                sub_sec[j] = '<p class="cmnt_top"><span>' + reply[j].nick + '</span><span class="cmnt_source">' + reply[j].time + '&nbsp;&nbsp;' + reply[j].source + '</span><code>' + (j + 1) + '</code></p><p class="cmnt_text">' + cnt + '</p>' + tstitlecon + '</div>';
                                */
                            }
                            for (var j = 0, section = '', cnt = ''; j < reply.length; j++) {
                                /*
                                if (reply[j].surl && !!reply[j].surl) {
                                    if (reply[j].stitle && !!reply[j].stitle) {
                                        tstitlecon = '<p class="cmnt_quote"><a href="' + reply[j].surl + '">' + reply[j].stitle + '</a></p>';

                                    }
                                }
                                if (reply[j].content.length > 200) cnt = reply[j].content.substring(0, 199) + '<a class="j_cmnt_more">查看全文>></a><span class="hide">' + reply[j].content.substr(200) + '</span>';
                                else cnt = reply[j].content;
                                */
                                //if (j == 0) section = '<div class="cmnt_floor"><div class="floor_item"><div class="floor_info"><span class="floor_name">陌生的路西法</span><span class="floor_num">F' + (j + 1) + '</span></div><div class="floor_text">是啊，我如果没特别提到同行的人，都是自己一个人走</div></div>';
                                //else if (j == 1 || j > reply.length - 2) section = '<div class="floor_item"><div class="floor_info"><span class="floor_name">陌生的路西法</span><span class="floor_num">F9</span></div><div class="floor_text">是啊，我如果没特别提到同行的人，都是自己一个人走</div></div>';
                                // else if (j == 2) section += '<div class="cmnt_unfold"><span class="unfold_text">显示隐藏的评论</span></div>';
                                //else section += '<div class="hide"><p class="cmnt_top"><span>' + reply[j].nick + '</span><span class="cmnt_source">' + reply[j].time + '&nbsp;&nbsp;' + reply[j].source + '</span><code>' + (j + 1) + '</code></p><p class="cmnt_text">' + cnt + '</p>' + tstitlecon + '</div>';

                                if (j == 0) {
                                    section = '<div class="cmnt_floor">';
                                }
                                //
                                if (reply[j].content.length > 100) cnt = reply[j].content.substring(0, 199) + '<a class="j_cmnt_more">查看全文>></a><span class="hide">' + reply[j].content.substr(200) + '</span>';
                                else cnt = reply[j].content;
                                //
                                if (j < 2) {
                                    section = section + '<div class="floor_item"><div class="floor_info"><span class="floor_name">' + reply[j].nick + '</span><span class="floor_num">F' + (j + 1) + '</span></div><div class="floor_text">' + cnt + '</div></div>';
                                } else if (j == 2) {
                                    section = section + '<div class="cmnt_unfold"><span class="unfold_text">显示隐藏的评论</span></div><div class="floor_item hide"><div class="floor_info"><span class="floor_name">' + reply[j].nick + '</span><span class="floor_num">F' + (j + 1) + '</span></div><div class="floor_text">' + cnt + '</div></div>';
                                } else if (j != reply.length - 1) {
                                    section = section + '<div class="floor_item hide"><div class="floor_info"><span class="floor_name">' + reply[j].nick + '</span><span class="floor_num">F' + (j + 1) + '</span></div><div class="floor_text">' + cnt + '</div></div>';
                                } else {
                                    section = section + '<div class="floor_item"><div class="floor_info"><span class="floor_name">' + reply[j].nick + '</span><span class="floor_num">F' + (j + 1) + '</span></div><div class="floor_text">' + cnt + '</div></div>';
                                }

                                if (j == reply.length - 1) {
                                    section += '</div>';
                                }

                            }
                        }

                        if (reply.length == 0) {
                            if (main.surl && !!main.surl) {
                                if (main.stitle && !!main.stitle) {

                                    stitle = '<p class="cmnt_quote"><a href="' + main.surl + '">' + main.stitle + '</a></p>';
                                }
                            }
                        }
                        str += section + '<div class="cmnt_text">' + main.content + '</div><div class="cmnt_op"><span class="cmnt_report j_report">举报</span><div class="cmnt_num"><a href="javascript:;" class="cmnt_good j_favor_single" data-agree="' + main.agree + '"><i class="icon_ding"></i>' + main.agree + '</a><a href="javascript:;" class="reply j_cmnt_single">回复</a></div></div></div>';
                    }

                    oWrap.html(list + str);

                    if (page >= total) {
                        $('.cmnt_more p').html('已加载全部评论');
                        window.removeEventListener('scroll', addcomment, false);
                    }

                    oLoader.data('page', page + 1);
                }
                complete && complete();
            },
            error: function(xhr, type) {
                alert('亲，网络出现错误，请重试')
                complete && complete();
            }
        })
    }

    function moreList() {

        $(document).on('click tap', '.j_cmnt_more', function() {
            var that = $(this),
                more = that.next();
            that.remove();
            more.removeClass('hide');
        });
    }

    function prevent(e) {
        //弹出评论框状态下禁止页面滚动

        if (!$('#j_cmnt_pop').css()) e.preventDefault();
        return;
    }

    function initPopInput() {

        var oComment = new Comment({
            main: $('#mainpage'),
            cmtsmtCallBack: function(content, Success, _this) { //发评论的回调
                sendMessage(content, Success, _this);
            }
        });


        var pop = $('#j_cmnt_pop'),
            input = $('#j_cmnt_input'),
            entrance = $('#j_cmnt_entrance'),
            defaultCnt = input.attr('placeholder'),
            newslist = $('#j_newslist');


        $('#j_input_top').on('focus', function(ev) {
            if (!checkLogin()) {
                $('#j_input_top').blur();
            }
        })


        $('#j_input_top').on('click', function(ev) {
            // if($('.foot_comment').length>0){
            //  $('.foot_comment').hide();
            // }
            $('.foot_comment').hide();
            if (checkLogin()) {

            } else {


                commentlogin = (typeof(WapLogin) == 'function') ? (new WapLogin()) : this;

                commentlogin.login(false, function() {

                    // logsuccess();
                    oComment._addFloat();
                    oComment._addEvent();
                    pop = $('#j_cmnt_pop'),
                        input = $('#j_cmnt_input');
                    $('#j_input_top').focus();

                });

                ev.preventDefault();

            }
        })

        $(document).on('click tap', '#j_input_smt', function() {

            onSmt.call(this);

        });
        window.logsuccess = function(rs) {

            $('#loginImg img').attr('src', (userInfo.portrait_url || userInfo.userface));
            $('#logoutImg').hide();
            $('#loginImg').show();


        }

        function onSmt() {
            var _input = $('#j_input_top'),
                _check = $('#j_input_check'),
                _wrap = _input.parent(),
                that = $(this);

            if (_input.val() == '' || _input.val() == _input.attr('placeholder')) {
                $('.j_op_remind').eq(0).show().html('请输入评论内容！').addClass('animate');
                setTimeout(function() {
                    $('.j_op_remind').eq(0).html('').removeClass('animate').hide();
                }, 3000);

            } else {

                if (_input.val().indexOf('script') == -1) {
                    _wrap.removeClass('_unfold');
                    //对文章评论
                    var nick = userInfo.nick || userInfo.uname || '手机新浪网用户';
                    var append = '<div class="cmnt_item"><p class="cmnt_top"><span><img src="' + __userface + '" /><i class="cmnt_nick">' + nick + '</i><i class="cmnt_time">刚刚</i></span></p><p class="cmnt_text">' + _input.val() + '</p></div>',
                        str = newslist.html(),
                        towb;
                    if (_check.is(":checked")) towb = 1;
                    else towb = '';
                    var content = _input.val();
                    _input.val('');
                    $('#j_newslist').prepend('<div class="cmnt_item"><p class="cmnt_top"><span><img src="' + (userInfo.portrait_url || userInfo.userface) + '" /><i class="cmnt_nick">' + nick + '</i></span></p><p class="cmnt_text">' + content + '</p><div class="cmnt_op_bottom"><p class="cmnt_op_bottom_times">刚刚</p></div></div>');
                    if ($('.cmnt_title').length > 1) window.scrollTo(0, $('.cmnt_title').eq(1).offset().top - 10);
                    if ($('#tipsCeng').length > 0) {
                        $('#tipsCeng').show();
                        setTimeout(function() {
                            $('#tipsCeng').hide();
                        }, 1500)
                    }

                    $.ajax({
                        type: 'POST',
                        url: 'aj/cmnt/post?',
                        // data to be added to query string:
                        data: { product: CMNT.product, index: CMNT.index, vcode: CMNT.vcode, csrfcode: CMNT.csrfcode, csrftime: CMNT.csrftime, wburl: CMNT.wburl, vt: 4, cmntContent: content, towb: towb },
                        // type of data we are expecting in return:
                        dataType: 'json',
                        timeout: 10000,
                        success: function(data) {
                            if (data.status) {
                                if (towb == 1) {

                                    $('.j_op_remind').eq(0).show().html('操作成功，正在发往微博...').addClass('animate');
                                    setTimeout(function() {
                                        $('.j_op_remind').eq(0).html('').removeClass('animate').hide();
                                    }, 3000);
                                    // if(data.url && data.url != '' && data.url != null)window.location.href = data.url;

                                    // else{
                                    //  $('.j_op_remind').eq(0).show().html(data.msg).addClass('animate');
                                    //  setTimeout(function(){
                                    //      $('.j_op_remind').eq(0).html('').removeClass('animate').hide();
                                    //  }, 3000);
                                    // }
                                }
                            }
                        },
                        error: function(xhr, type) {
                            _input.val('');
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

        $(document).on('click tap', '.j_cmnt_single', function() {
            var _this = this;
            if (checkLogin()) {
                onCmnt.call(this);
            } else {
                singlelogin = (typeof(WapLogin) == 'function') ? (new WapLogin()) : this;

                singlelogin.login(false, function(rs) {

                    // logsuccess(rs);

                    oComment._addFloat();
                    oComment._addEvent();
                    onCmnt.call(_this);
                });

            }

        });

        function onCmnt() {
            pop = $('#j_cmnt_pop'),
                input = $('#j_cmnt_input');
            var that = $(this),
                nick = '回复' + that.parent().parent().parent().find('.cmnt_nick').eq(0).html().split('<')[0] + '：',
                mid = that.parent().parent().parent().data('mid');

            // window.removeEventListener('scroll', addcomment, false);

            oComment.commentShow();
            if (pop) {
                input.attr('placeholder', nick);
                pop.data('mid', mid);
            }
        }
        // window.addEventListener("touchmove", prevent, false);





        function sendMessage(content, Success, _this) {
            pop = $('#j_cmnt_pop'),
                input = $('#j_cmnt_input');
            if (content == '') {
                var str = '请输入评论内容！';
                
                if ($('#tipsEmpty').length == 0) {
                    $('body').parent().append('<aside id="tipsEmpty"  style="display: block;"><div class="comment_remind animation_marker" style="z-index:9999999;"><p class="marker_t">请输入评论内容！</p></div></aside>')
                    setTimeout(function() {
                        $('#tipsEmpty').hide();
                    }, 3000);
                } else {
                    $('#tipsEmpty').show();
                    setTimeout(function() {
                        $('#tipsEmpty').hide();
                    }, 3000);
                }


            } else {
                if (content.indexOf('script') == -1) {
                    //表情字符替换为表情
                    oComment.oCmtFace.forEach(function(item, index) {
                        var re = new RegExp('\\[' + item.substring(1, item.length - 1) + '\\]', 'g');
                        content = content.replace(re, '<i class="face face_' + (parseInt(index / 28) + 1) + ' icon_' + index % 28 + '">' + item + '</i>')
                    })
                    entrance.css('opacity', 1);
                    $('.articleHead').css('opacity', 1);
                    $('.cmnt_article').css('opacity', 1);
                    $('footer').css('opacity', 1);
                    $('.j_float_remind').show();

                    //black if(pop.data('mid') && pop.data('mid') != ''){
                    if (pop.data('mid') && pop.data('mid') != '') {
                        //对评论的评论
                        var items = $('.cmnt_item'),
                            index;
                        for (i = 0; i < items.length; i++) {
                            if (items.eq(i).data('mid') == pop.data('mid')) {
                                index = i;
                                break;
                            }
                        }

                        var item = items.eq(index),
                            floors = item.find('code').length + 1,
                            mid = item.data('mid'),
                            wbname = item.data('wbname'),
                            oCmnt = item.find('.cmnt_nick').eq(0).html(),
                            cmnt_nick = oCmnt.split('<')[0];
                        cmnt_sourse = item.find('.cmnt_nick').eq(0).find('em').html();
                        cmnt_time = item.find('.cmnt_op_bottom_times').eq(0).html(),
                            base = item.find('.cmnt_floor').eq(0), //base = item.find('.cmnt_base').eq(0),//
                            text = item.find('.cmnt_text').last(),
                            wb_content = text.html(),
                            _base = item.find('.cmnt_floor').length > 0 ? base.html() : '',
                            _top = '<p class="cmnt_top"><span>' + cmnt_nick + '</span><span class="cmnt_source">' + cmnt_time + '&nbsp;&nbsp;' + cmnt_sourse + '</span><code>' + floors + '</code></p>',
                            _text = '<p class="cmnt_text">' + text.html() + '</p>';
                        if (index > 9) item.remove();

                        var append = '<div class="cmnt_floor">' + _base + _top + _text + '</div>';
                        var nick = userInfo.nick || userInfo.uname || '手机新浪网用户';
                        var old_list = $('#j_newslist').html();

                        // $('#j_newslist').prepend('<div class="cmnt_item"><p class="cmnt_top"><span><img src="' + (userInfo.portrait_url || userInfo.userface)+ '" /><i class="cmnt_nick">' + nick + '</i></span></p>' + append + '<p class="cmnt_text">' + content + '</p><div class="cmnt_op_bottom"><p class="cmnt_op_bottom_times">刚刚</p></div></div>');
                        $('#j_newslist').prepend('<div class="cmnt_item"><img src="' + (userInfo.portrait_url || userInfo.userface) + '" alt="" class="cmnt_pic"><div class="cmnt_info"><span class="cmnt_name cmnt_nick">' + nick + '</span><span class="cmnt_location"  style="visibility:hidden;"><i class="icon_location2"></i>北京</span><span class="cmnt_time">刚刚</span></div>' + append + '<div class="cmnt_text">' + content + '</div><div class="cmnt_op"><span class="cmnt_report" style="visibility:hidden;">举报</span><div class="cmnt_num"  style="visibility:hidden;"><a href="javascript:;" class="cmnt_good"><i class="icon_ding"></i>3万</a><a href="javascript:;" class="reply">回复</a></div></div></div>');

                        if ($('.cmnt_list').length > 1) window.scrollTo(0, $('.cmnt_list').eq(1).offset().top - 10);
                        var towb;
                        if ($('#j_wb_sendcont').is(":checked")) towb = 1;
                        else towb = '';
                        pop.data('mid', '');
                        if (item.data('wbuser') == 1) {

                            Success && Success.call(_this);

                            $.ajax({
                                type: 'POST',
                                url: 'aj/cmnt/post?',
                                // data to be added to query string:
                                data: { product: CMNT.product, index: CMNT.index, vcode: CMNT.vcode, csrfcode: CMNT.csrfcode, csrftime: CMNT.csrftime, wburl: CMNT.wburl, vt: 4, cmntContent: content, mid: mid, nick: wbname, wb_content: wb_content, towb: towb },
                                // type of data we are expecting in return:
                                dataType: 'json',
                                timeout: 10000,
                                success: function(data) {


                                    if (data.status) {
                                        if (towb == 1) {

                                            $('.j_op_remind').eq(0).show().html('操作成功，正在发往微博...').addClass('animate');
                                            setTimeout(function() {
                                                $('.j_op_remind').eq(0).html('').removeClass('animate').hide();
                                            }, 3000);
                                            // if(data.url && data.url != '' && data.url != null)window.location.href = data.url;

                                            // else{
                                            //  $('.j_op_remind').eq(0).show().html(data.msg).addClass('animate');
                                            //  setTimeout(function(){
                                            //      $('.j_op_remind').eq(0).html('').removeClass('animate').hide();
                                            //  }, 3000);
                                            // }
                                        }
                                    }
                                },
                                error: function(xhr, type) {

                                }
                            });
                        } else {
                            Success && Success.call(_this);
                            $.ajax({
                                type: 'POST',
                                url: 'aj/cmnt/post?',
                                // data to be added to query string:
                                data: { product: CMNT.product, index: CMNT.index, vcode: CMNT.vcode, csrfcode: CMNT.csrfcode, csrftime: CMNT.csrftime, wburl: CMNT.wburl, vt: 4, cmntContent: content, mid: mid, towb: towb, wb_content: wb_content },
                                // type of data we are expecting in return:
                                dataType: 'json',
                                timeout: 10000,
                                success: function(data) {


                                    if (data.status) {
                                        if (towb == 1) {

                                            $('.j_op_remind').eq(0).show().html('操作成功，正在发往微博...').addClass('animate');
                                            setTimeout(function() {
                                                $('.j_op_remind').eq(0).html('').removeClass('animate').hide();
                                            }, 3000);
                                            // if(data.url && data.url != '' && data.url != null)window.location.href = data.url;

                                            // else{
                                            //  $('.j_op_remind').eq(0).show().html(data.msg).addClass('animate');
                                            //  setTimeout(function(){
                                            //      $('.j_op_remind').eq(0).html('').removeClass('animate').hide();
                                            //  }, 3000);
                                            // }
                                        }
                                    }
                                },
                                error: function(xhr, type) {

                                }
                            });
                        }
                    } else {
                        //对文章评论
                        var nick = userInfo.nick || userInfo.uname || '手机新浪网用户';
                        var append = '<div class="cmnt_item"><img src="' + (userInfo.portrait_url || userInfo.userface) + '" alt="" class="cmnt_pic"><div class="cmnt_info"><span class="cmnt_name cmnt_nick">' + nick + '</span><span class="cmnt_location"  style="visibility:hidden;"><i class="icon_location2"></i>山东济南</span><span class="cmnt_time">刚刚</span></div><div class="cmnt_text">' + content + '</div><div class="cmnt_op"><span class="cmnt_report j_report"  style="visibility:hidden;">举报</span><div class="cmnt_num"  style="visibility:hidden;"><a href="javascript:;" class="cmnt_good j_favor_single" data-agree="0"><i class="icon_ding"></i>0</a><a href="javascript:;" class="reply j_cmnt_single">回复</a></div></div></div>';
                        str = newslist.html(),
                            towb;
                        if ($('#j_wb_sendcont').is(":checked")) towb = 1;
                        else towb = '';
                        newslist.html(append + str);
                        if ($('.cmnt_list').length > 1) window.scrollTo(0, $('.cmnt_list').eq(1).offset().top - 10);
                        Success && Success.call(_this);
                        $.ajax({
                            type: 'POST',
                            url: 'aj/cmnt/post?',
                            // data to be added to query string:
                            data: { product: CMNT.product, index: CMNT.index, vcode: CMNT.vcode, csrfcode: CMNT.csrfcode, csrftime: CMNT.csrftime, wburl: CMNT.wburl, vt: 4, cmntContent: content, towb: towb },
                            // type of data we are expecting in return:
                            dataType: 'json',
                            timeout: 10000,
                            success: function(data) {


                                if (data.status) {
                                    if (towb == 1) {

                                        $('.j_op_remind').eq(0).show().html('操作成功，正在发往微博...').addClass('animate');
                                        setTimeout(function() {
                                            $('.j_op_remind').eq(0).html('').removeClass('animate').hide();
                                        }, 3000);
                                        // if(data.url && data.url != '' && data.url != null)window.location.href = data.url;

                                        // else{
                                        //  $('.j_op_remind').eq(0).show().html(data.msg).addClass('animate');
                                        //  setTimeout(function(){
                                        //      $('.j_op_remind').eq(0).html('').removeClass('animate').hide();
                                        //  }, 3000);
                                        // }
                                    }
                                }
                            },
                            error: function(xhr, type) {

                            }
                        });
                    }
                } else {
                    $('.j_op_remind').eq(0).show().html('请您检查输入内容！').addClass('animate');
                    setTimeout(function() {
                        $('.j_op_remind').eq(0).html('').removeClass('animate').hide();
                    }, 3000);
                }
            }
        }

    }

    function initUnfold() {
        $(document).on('click tap', '.j_cmnt_unfold', function() {

            var wrap = $(this).parent(),
                pre = $(this).prev(),
                sections = $(this).parent().find('.hide'),
                top = wrap.find('.cmnt_top').last(),
                text = wrap.find('.cmnt_text').last(),
                quote = wrap.find('.cmnt_quote').last(),
                str = '<div class="cmnt_base">' + pre.html() + '</div>';

            if (sections.length < 8) {
                for (i = 0; i < sections.length; i++) {
                    str = '<div class="cmnt_base">' + str + sections.eq(i).html() + '</div>';
                }
                if (!!quote.html()) {
                    quote = '<p class="cmnt_quote">' + quote.html() + '</p>';
                } else {
                    quote = '';
                }
                str += '<div class="cmnt_top">' + top.html() + '</div>' + '<div class="cmnt_text">' + text.html() + '</div>' + quote;
                wrap.html(str);
            } else {
                for (i = 0; i < sections.length; i++) {
                    if (i < 7) str = '<div class="cmnt_base">' + str + sections.eq(i).html() + '</div>';
                    else if (sections.length == 7) '<div class="cmnt_base">' + str + sections.eq(i).html() + '</div>';
                    else if (sections.length > 9) {
                        if (i == 8) str = '<div class="cmnt_base">' + str + '<div class="cmnt_extra">' + sections.eq(i).html() + '</div>';
                        else if (i < sections.length - 1) str += '<div class="cmnt_extra">' + sections.eq(i).html() + '</div>';
                        else str += '<div class="cmnt_extra">' + sections.eq(i).html() + '</div></div>';
                    } else if (sections.length == 8) {
                        str = '<div class="cmnt_base">' + str + '<div class="cmnt_extra">' + sections.eq(i).html() + '</div></div>';
                    } else {
                        if (i == 8) str = '<div class="cmnt_base">' + str + '<div class="cmnt_extra">' + sections.eq(i).html() + '</div>';
                        else str += '<div class="cmnt_extra">' + sections.eq(i).html() + '</div></div>';
                    }
                }

                if (!!quote.html()) {
                    quote = '<p class="cmnt_quote">' + quote.html() + '</p>';
                } else {
                    quote = '';
                }
                str += '<div class="cmnt_extra"><div class="cmnt_top">' + top.html() + '</div>' + '<div class="cmnt_text">' + text.html() + '</div>' + quote + '</div></div>';
                wrap.html(str).addClass('nobd');
                wrap.find('.cmnt_base').eq(0).addClass('nobd');
                wrap.find('.cmnt_base').eq(1).addClass('nomg');
            }
        });
    }

    function initFavor() {
        $(document).on('click tap', '.j_favor_single', function() {

            if ((!$(this).data('loading') || $(this).data('loading') == 'no') && !$(this).hasClass('on')) {

                $(this).data('loading', 'yes');
                var mid, op;
                //if ($(this).parent().hasClass('cmnt_op')) {
                mid = $(this).parent().parent().parent().data('mid');
                op = $(this).parent().parent().parent().find('.j_favor_single').eq(0);
                //} else {
                //  mid = $(this).parent().parent().data('mid');
                //op = $(this).parent().parent().find('.j_favor_single').eq(1);
                //}

                if (mid == '') {
                    return false;
                }
                var voteNum = parseInt($(this).attr('data-agree'));
                voteNum += 1;
                $(this).html('<i class="icon_ding"></i>' + voteNum); //.addClass('on');
                //op.html(voteNum).addClass('on');
                //$(this).append($('<i class="fly"></i>'));
                $(this).addClass('cmnt_fly');
                $.ajax({
                    type: 'POST',
                    data: {
                        'mid': mid,
                        'product': CMNT.product,
                        'index': CMNT.index,
                        'csrfcode': CMNT.csrfcode,
                        'csrftime': CMNT.csrftime

                    },
                    url: 'aj/cmnt/vote?tj_ch=' + __tj_ch,
                    success: function(data) {
                        $(this).data('loading', 'no');
                    },
                    error: function(xhr, type) {
                        $(this).data('loading', 'no');
                        /*$('.j_op_remind').eq(0).html('操作失败！').addClass('animate');
                        setTimeout(function(){
                            $('.j_op_remind').eq(0).html('').removeClass('animate').hide();
                        }, 3000);*/
                    }
                });
            }

        });
    }

    function checkItem(e) {
        //利用循环查找符合CSS样式名字的对象
        while (e.className != "cmnt_item") {
            //如果这个对象的标签名字是HTML就停止,然后让事件对象不存在,用做后面的判断
            if (e.tagName == "HTML" || e.tagName == "A" || (e.className == 'cmnt_top' && e.parentNode.className == 'cmnt_item')) {
                e = false;
                break;
            } else {
                //否则继续下个对象,即他的父对象
                e = e.parentNode;
            }
        }
        //返回事件对象,如果事件对象不存在返回假
        return e;
    }

    // function initOp(){

    //  var done = false;
    //  $(document).on('click tap', '.j_op_unfold', function(){

    //            var timer,
    //                ops = $('.cmnt_op_all'),
    //                op = $(this).parent().parent().parent().find(".cmnt_op_all").eq(0);

    //            ops.removeClass('fadeIn').removeClass('fadeOut');
    //      op.removeClass('fadeOut').addClass('fadeIn');
    //  });

    //  $(document).on('click tap', '.j_op_fold', function(){

    //            var timer,
    //                op = $(this).parent();
    //      op.removeClass('fadeIn').addClass('fadeOut');

    //  });

    //  $(document).on('touchstart', function (e){
    //      done = false;
    //            if(!e)e = window.event;
    //      var Event = e.target?e.target:e.srcElement;
    //      timer = setTimeout(function(){
    //                if(checkItem(Event) && !done){
    //                 var item = $(checkItem(Event)),
    //                  ops = $('.cmnt_op_all'),
    //                  op = item.find('.cmnt_op_all').eq(0);
    //              if(op.hasClass('fadeOut')){
    //                  ops.removeClass('fadeIn').removeClass('fadeOut');
    //                  op.addClass('fadeIn');
    //              }
    //              else if(op.hasClass('fadeIn')){
    //                  op.removeClass('fadeIn').addClass('fadeOut');
    //              }
    //              else{
    //                  ops.removeClass('fadeIn').removeClass('fadeOut');
    //                  op.addClass('fadeIn');
    //              }
    //          }
    //      },200);
    //  });
    //  $(document).on('touchmove', function (){
    //      done = true;
    //            var ops = $('.cmnt_op_all');
    //      ops.removeClass('fadeIn').removeClass('fadeOut');
    //  });
    // }

    function getWinHeight() {
        var wHeight = 640;

        if (window.innerHeight) {
            wHeight = window.innerHeight;
        } else if (document.body && document.body.clientHeight) {
            wHeight = document.body.clientHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) {
            wHeight = document.documentElement.clientHeight;
        }

        return wHeight;
    }

    function initEntrance() {
        clearInterval(timer);
        var timer = setInterval(function() {
            var _top = $('.footer').eq(0).offset().top,
                wHeight = getWinHeight(),
                scrollY = document.body.scrollTop || document.documentElement.scrollTop,
                entrance = $('#j_cmnt_entrance');

            if (scrollY + wHeight >= _top && scrollY > 0) entrance.hide();
            else entrance.show();
        }, 200);
    }

    var loading = 0;
    var isload = 0;

    function pullLoader() {
        var oMainpage = $('#mainpage');

        window.onresize = function() {
            oMainpage.css('minHeight', document.documentElement.clientHeight + 'px');
        };

        window.addEventListener('scroll', addcomment, false);

    }

    function addcomment(ev) {
        var oPullLoaderContent = $('#pullLoaderContent');
        var oRe = $('.pullLoader')[0];
        var oLoader = $('#j_pullLoader');

        if (loading == 0) {

            var sTop = document.body.scrollTop || document.documentElement.scrollTop,
                dHeight = $(document).height(),
                cHeight = document.documentElement.clientHeight;

            if (sTop + cHeight >= dHeight - cHeight) {

                loading = 1;
                // oImg.className='rotate_forever';

                oLoader.removeClass('hide');
                // ajax加载 结束后执行下面代码
                if (!isload) {
                    setTimeout(function() {
                        loadMoreApply(complete);
                    }, 100)

                    isload = 1;
                } else {
                    loadMoreApply(complete);
                }

                function complete() {

                    oLoader.addClass('hide');

                    loading = 0;

                }

                if (window.suda) {
                    var sudaName = oLoader.data('sudaclick');
                    if (sudaName) {
                        var clickInfo = {
                            'type': 'loaderMore',
                            'name': sudaName,
                            'title': '评论上拉加载统计',
                            'index': 0
                        }
                    }
                    if (window.suds_count) {
                        window.suds_count(clickInfo);
                    }
                };
            }
        }
    }

    // $('#j_input_top').on('focus',function(){
    //  $(this).addClass('on');
    // })

    // $('#j_input_top').on('blur',function(){
    //  $(this).removeClass('on');
    // })


    setTimeout(function() {
        // initOp();                 //评论操作区
        //itemInit();             //评论点击弹出操作区
        initPopInput(); //文章评论弹出
        //initPopSingleInput();   //单条评论弹出
        initUnfold(); //展开评论楼层
        initFavor(); //评论赞
        moreList(); //加载更多评论
        initEntrance(); //评论入口
        pullLoader(); //上拉加载

    }, 300);



})


/*
 * 评论举报
 * @author :    袁远(yuanyuan23)
 * @date :      2014-10-13
 * @changeBy : tingling
 */

$(function() {

    var sendData = {},
        $curReportBox = null;

    function insertReportList() {
        var arr = [];
        arr.push('<div id ="j_report" class="hide">');
        arr.push('<div class="comment_report animation_marker hide" id="j_tipsReport"><p class="marker_t">举报成功</p></div>');
        arr.push('<div class="report_box" id="j_report_box">');
        arr.push('<h2 class="report_title">举报</h2>');
        arr.push('<span class="report_reason">请您选择举报的原因</span>');
        arr.push('<div class="report_select_box" id="j_select_box">');
        arr.push('<a class="report_select" href="javascript:;" >反动言论</a><a class="report_select" href="javascript:;" >广告营销</a><a class="report_select" href="javascript:;" >淫秽色情</a><a class="report_select" href="javascript:;" >人身攻击</a><a class="report_select" href="javascript:;" >虚假中奖</a>');
        arr.push('</div>');
        arr.push('<div class="report_btn_box">');
        arr.push('<span class="fl"><a href="javascript:;" class="report_cancel" id="j_report_cancel" >取消</a></span><span class="fr"><a href="javascript:;" class="report_smt off" id="j_report_smt" >确定</a></span>');
        arr.push('</div></div>');
        arr.push('<div class="report_bg" id="j_report_bg"></div>');
        arr.push('</div>');

        $('body').append(arr.join(''));
        addEvent();
    }

    function chooseReason() {
        var aA = $('#j_select_box a');
        var oSmt = $('#j_report_smt');
        var oCancel = $('#j_report_cancel');
        var oMainpage = $('#mainpage');
        var oBg = $('#j_report_bg');
        var oTipsReport = $('#j_tipsReport');
        var oReportbox = $('#j_report_box');
        var oReport = $('#j_report');
        var obj = $(this).parents('.cmnt_item');
        var that = this;

        if (oReport.length == 0) {
            insertReportList();
        };

        sendData = {
            mid: obj.data('mid'),
            charge_uid: obj.data('chargeuid') || '',
            content: obj.parents('.com_cont_op').prev().html(),
            charge_ip: obj.data('chargeip') || '',
            ch: $('#cmnt_channel').val() || '',
            newsid: obj.data('newsid') || '',
            url: window.location.href || '',
            jsoncallback: 'changeFunction'

        };
        $curReportBox = $(this);
        if ($(this).hasClass('on')) {
            return;

            if ($(this).hasClass('off')) {
                return;
            }
            aA.removeClass('on');
            oReport.removeClass('hide');
            oTipsReport.removeClass('hide');
            oReportbox.addClass('hide');
            oBg.addClass('hide');
            window.removeEventListener("touchmove", prevent, false);
            $curReportBox && ($curReportBox.addClass('on'));
            $curReportBox && ($curReportBox.text('已举报'));
            setTimeout(function() {
                oReport.addClass('hide');
                oTipsReport.addClass('hide');
            }, 1000)

            $curReportBox && ($curReportBox = null);
            return false;
        }
        window.addEventListener("touchmove", prevent, false);

        oReport.removeClass('hide');
        oReport.removeClass('hide');
        oReportbox.removeClass('hide');
        oBg.removeClass('hide');

        return false;
    }

    function addEvent() {

        var aA = $('#j_select_box a');
        var oSmt = $('#j_report_smt');
        var oCancel = $('#j_report_cancel');
        var oMainpage = $('#mainpage');
        var oBg = $('#j_report_bg');
        var oTipsReport = $('#j_tipsReport');
        var oReportbox = $('#j_report_box');
        var that = '.j_report';
        var oReport = $('#j_report');

        aA.on('click', function() {
            aA.removeClass('on');
            $(this).addClass('on');
            oSmt.removeClass('off');
            sendData.type = $(this).index();
        });

        oCancel.on('click', function() {
            oReport.addClass('hide');
            window.removeEventListener("touchmove", prevent, false);
        });

        oBg.on('click', function() {
            oReport.addClass('hide');
            window.removeEventListener("touchmove", prevent, false);
        });

        oSmt.on('click', function() {
            if ($(this).hasClass('off')) {
                return;
            }
            aA.removeClass('on');
            oTipsReport.removeClass('hide');
            oReportbox.addClass('hide');
            oBg.addClass('hide');
            window.removeEventListener("touchmove", prevent, false);
            $curReportBox && ($curReportBox.addClass('on'));
            $curReportBox && ($curReportBox.text('已举报'));
            setTimeout(function() {
                oReport.addClass('hide');
                oTipsReport.addClass('hide');
            }, 1000)

            sendReport(sendData);
            $curReportBox && ($curReportBox = null);
        });
    }

    function report() {
        if ($('.j_report').length > 0) {
            $('body').on('click tap', '.j_report', function() {
                checkLogin(chooseReason.bind(this));
                return false;
            })
        }
    }

    function checkLogin(nextFun, closeFun) {

        var waplogin = (typeof(WapLogin) == 'function') ? (new WapLogin()) : this;

        if (!userInfo || typeof(userInfo) == 'undefined') {
            waplogin.login(false, function() {
                nextFun && nextFun();
            });
        } else {
            nextFun && nextFun();
        }
    }

    function updateUserInfo(re) {
        if (typeof(re) != 'undefined' && typeof(re.nick) != 'undefined') {
            window.userInfo = {};
            window.userInfo.uname = re.nick;
            window.userInfo.userface = re.portrait;
            window.userInfo.uid = re.uid;
            window.userInfo.islogin = 1;
        }

    }

    function sendReport(data) {

        $.ajax({
            type: 'GET',
            data: data,
            url: 'http://o.cmnt.sina.cn/v2/charge',
            dataType: 'jsonp',
            async: false
        });
    }
    window.changeFunction = function(rs) {
        console.log(re);
    }

    function prevent(e) {
        //引导浮层存在时禁止页面滚动
        e.preventDefault();
        return;
    }
    setTimeout(function() {
        insertReportList();
        report();
    }, 300)
})
