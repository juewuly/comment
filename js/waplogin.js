
function WapLogin()
{
	var self = this;

	this.login = function ( login, callback, cbparam, cbparam1)	//登录状态、回调函数、回调参数1、回调参数2
	{
		var argsnum = arguments.length;


		//在window中判断有没有SINA_OUTLOGIN_LAYER来确定有没有浮层对象及是否登录
		if( window["SINA_OUTLOGIN_LAYER"] && !login )
		{
			//获取登录对象
			_loginLayer = window["SINA_OUTLOGIN_LAYER"];
			//初始化浮层
			_loginLayer.set('sso',{
			entry : 'wapsso'
			}).init();
			//将呼出浮层绑定到相应的目标元素上


         	_loginLayer.show();

			//登陆成功后的回调事件注册多个login_success事件来对应不同按钮的登陆行为
			_loginLayer.register("login_success", function(re){

				//表示登陆成功
				self.updateUserInfo( re );

				switch( argsnum )
				{
					case 2:
						callback();
						break;
					case 3:
						callback( cbparam );
						break;
					case 4:
						callback( cbparam , cbparam1);
						break;
					default:
						window.location.href = window.location.href;
						break;
				}
			});

			//关闭浮层触发的事件
			_loginLayer.register("layer_hide", function(){
			});
		}

		return;
    }

    this.updateUserInfo = function(re)
    {
    		//cms config
		if(!window.__userConfig__)
		{
			window.__userConfig__ = {};
		}
		__userConfig__.__isLogin = true;
		__userConfig__.__unick = re.nick,
		__userConfig__.__uface = re.portrait


		//global config
		if(  !window.globalConfig || typeof(globalConfig) != 'undefined' )
		{
			globalConfig = {};
		}
		globalConfig.isLogin = true;

		//update userface
		if( $('#loginImg').find('img').length>0 ){
			$('#loginImg').find('img').attr('src',re.portrait);
			$('#loginImg').show();
			$('#loginImg').prev().hide();
		}
		if($('#loginImg').length>0){
			$('#loginImg').append('<img src="'+re.portrait+'">');
		}

    		return;
    }
}