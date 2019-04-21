angular.module("app",['ui.router'])
	.config(function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.when("","/home")
		$stateProvider
		.state("home",{
			url:"/home",
			templateUrl:'view/home.html',
			controller:"home"
		})
		.state("home.nav",{
			url:"/nav?id",
			templateUrl:"view/1.html",
			controller:function($scope,$state,$rootScope){
				if(num){
					$scope.id=$state.params.id;
					$scope.data=$rootScope.data[$scope.id.toString()];
					console.log($scope.data)
				}
				
			}	
		})
	})
//控制器
	.controller("home",function($rootScope,$http){
		$http({
			url:"data.json"
		}).success(function(d){
			num=1;
			$rootScope.data=d;
			console.log($rootScope.data)
		})
	})
var num=0;
