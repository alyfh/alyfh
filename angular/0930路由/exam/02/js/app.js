angular.module("app",["ui.router"])
.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.when("","/0");
	$stateProvider
	.state("home",{
		url:"/0",
		templateUrl:"view/home.html"
	})
	.state("home.login",{
		url:"/login",
		template:"<span>1111111</span>"
	})
	.state("home.regsiter",{
		url:"/regsiter",
		template:"<span>222222</span>"
	}) 
	.state("product",{
		url:"/1",
		templateUrl:"view/product.html"
	})
})