(function(angular){
	'use strict';

	var module=angular.module('moviecat.movie_detail', ['ngRoute','moviecat.services.http']);

	//配置模块路由
	module.config(['$routeProvider', function($routeProvider) {
		//

		$routeProvider.when('/detail/:id', {
			templateUrl: 'movie_detail/view.html',
			controller: 'MovieDetailController'
		});
	}]);

//分页操作
//1.在路由的配置中加上分页的参数
// 2.在控制器中提取page参数
//$routeParams的数据来源：1.路由匹配出来的 2.?参数
	module.controller('MovieDetailController', ['$scope','$route','$routeParams','HttpService','AppConfig',function($scope,$route,$routeParams,HttpService,AppConfig) {
		$scope.movie={};
		var id=$routeParams.id;
		var apiAddress=AppConfig.detailApiAddress+id;
		HttpService.jsonp(apiAddress,{},function(data){
			$scope.movie=data;
			$scope.$apply();
		})

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

