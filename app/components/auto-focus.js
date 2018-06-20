(function(angular){
	'use strict';
	angular.module('moviecat.directives.aoto_focus',[])
	.directive('autoFocus',['$location',function($location){
		var path=$location.path();
		return{
			template:'',
			restrict:'A',
			link:function($scope,iElm,iAttrs,controller){
				$scope.$location=$location;
				$scope.$watch('$location.path()',function(now){

					//当path发生变化后执行，now是变化后的值
					var aLink=iElm.children().attr('href');
					var type=aLink.replace(/#(\/.+?)\/\d+/,'$1');

					if(now.startsWith(type)){
						iElm.parent().children().removeClass('active');
						iElm.addClass('active');
					}
				});

				// iElm.on('click',function(){
				// 	iElm.parent().children().removeClass('active');
				// 	iElm.addClass('active');
				// });
			}
		};
	}]);

})(angular)
