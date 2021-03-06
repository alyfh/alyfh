var myModule=angular.module("myApp",["ui.router"]);
myModule.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state("0",{
		url:"/0",
		templateUrl:"view/0.html",
		controller:"0"
	})
	.state("1",{
		url:"/1",
		templateUrl:"view/0.html",
		controller:"1"
	})
	.state("2",{
		url:"/2",
		templateUrl:"view/2.html",
		controller:"2"
	})
})
myModule.controller("ctrl",function($http,$rootScope){
	$http({
		url:"data/data.json"
	}).success(function(res){
		console.log(res)
		$rootScope.data=res.subjects;
	})
})
myModule.controller("0",function($scope,$rootScope){
	$scope.data=$rootScope.data["课程中心"];
	console.log($scope.data)
})
myModule.controller("1",function($scope,$rootScope){
	$scope.data=$rootScope.data["互动图书"];
})
myModule.controller("2",function($scope,$rootScope){
	$scope.data=$rootScope.data["API手册"];
})