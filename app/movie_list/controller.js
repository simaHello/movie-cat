(function(angular){
	'use strict';

	var module=angular.module('moviecat.movie_list', ['ngRoute','moviecat.services.http']);

	//配置模块路由
	module.config(['$routeProvider', function($routeProvider) {
		//

		$routeProvider.when('/:category/:page', {
			templateUrl: 'movie_list/view.html',
			controller: 'MovieListController'
		});
	}]);

//分页操作
//1.在路由的配置中加上分页的参数
// 2.在控制器中提取page参数
//$routeParams的数据来源：1.路由匹配出来的 2.?参数
	module.controller('MovieListController', ['$scope','$route','$routeParams','HttpService','AppConfig',function($scope,$route,$routeParams,HttpService,AppConfig) {
		var count=AppConfig.pageSize;//每一页的条数
		var page=parseInt($routeParams.page);//当前页码
		var start=(page-1)*count;//当前页从哪开始
		$scope.totalCount=0;//总共多少条数据
		$scope.totalpages=0;
		$scope.currentPage=page;
		//控制器 分为两步：1.设计暴露数据，2.设计暴露的行为
		$scope.loading=true;
		$scope.subjects=[];
		$scope.message="";
		$scope.title="Loading";
		$scope.totalCount=0;

		HttpService.jsonp(AppConfig.listApiAddress+$routeParams.category,{start:start,count:count,q:$routeParams.q},function(data){
			$scope.title=data.title;
			$scope.subjects=data.subjects;
			$scope.totalCount=data.total;
			$scope.totalpages=Math.ceil($scope.totalCount/count);
			$scope.loading=false;
			//$apply的作用就是让指定的表达式重新同步
			$scope.$apply();

		})

		//暴露一个更改上一页下一页的行为
		$scope.goPage=function(page){
			//传过来的是第几页我就跳第几页
			//一定要做一个合法范围校验
			if(page>=1&&page<=$scope.totalpages){
				$route.updateParams({page:page});
			}

		}


		// var adress='http://api.douban.com/v2/movie/in_theaters';
		// //测试http服务
		// //在angular中使用JSONP的方式做跨域请求，就必须给当前地址加上一个参数 callback=JSON_CALLBACK;
		// $http.jsonp(adress+'callback=JSON_CALLBACK').then(function(res){
		// 	//此处的代码是在异步请求完成过后才执行(需要等一段时间)
		// 	if(res.status==200){
		// 		$scope.subjects=res.data.subjects;
		// 	}else{
		// 		$scope.message="获取数据错误，错误信息："+res.statusText;
		// 	}
		// },function(err){
		// 	console.log(err);
		// 	$scope.message="获取数据错误，错误信息："+err.statusText;
		// });

	}]);
})(angular);
