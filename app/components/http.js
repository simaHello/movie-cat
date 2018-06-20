'use strict';

(function(angular){
	//由于默认angular提供的异步请求对象不支持自定义回调函数名称
	//angular随机分配的回调函数名称不被豆瓣支持，
	var http=angular.module('moviecat.services.http',[]);
	http.service('HttpService',['$window','$document',function($window,$document){
		this.jsonp=function(url,data,callback){


            //1.挂载回调函数
            var cbFuncName='my_json_cb_'+Math.random().toString().replace('.','');

            // window.my_json_cb_0167382684=callback;


            //2.将data转换成字符串的形式
            //{id=1;name='nihao'}=>id=1&name=nihao
		var querystring=url.indexOf('?')==-1?'?':'&';
		//判断第二个参数类型，如果为function（即只传入两个参数，则另callback=data）
		if(typeof data=='function'){
			callback=data;
		}else{
			// querystring=?id=1&name=nihao&
			for(var key in data){
				querystring+= key + '=' + data[key] + '&';
					//    id    =      1          &
			};
		}


            //3.处理url中的回调参数
            //url+=callback

            querystring+='callback='+cbFuncName;
            // querystring=?id=1&name=nihao&cb=my_json_cb_0167382684

            //4.创建一个script标签
            var scriptElement=$document[0].createElement('script');
            scriptElement.src=url+querystring;
            //注意此时还不能讲其append到页面上


		$window[cbFuncName]=function(data){
			callback(data);
			$document[0].body.removeChild(scriptElement);
		}

            //5.将script标签放到页面中
		$document[0].body.appendChild(scriptElement);

            //append过后页面会自动对这个地址发送请求，请求完成以后自动执行
		};

	}]);
})(angular);
