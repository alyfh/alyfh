var num=0;
angular.module("myApp",[])
.controller("ctrl",function($scope,$http){
	$scope.page="10";
	$scope.numArr=[10,9,8,7,6,5];
	$scope.indexArr=[];
	$scope.ostyle={
		height:$scope.page*42+"px"
	}
	$http({
		url:"datatables.standard.json"
	}).success(function(res){
		console.log(res);
		$scope.data=res;
		num=Math.ceil($scope.data.length/10)
		for (var i = 0; i < num; i++) {
			$scope.indexArr[i]=i+1;
		};
	})
	$scope.$watch("page",function(newV,oldV){
		if(newV==oldV) return false;
		$scope.ostyle={
			height:$scope.page*42+"px"
		}
		num=Math.ceil($scope.data.length/$scope.page)
		$scope.indexArr=[];
		for (var i = 0; i < num; i++) {
			$scope.indexArr[i]=i+1;
		};
	})
})

$(function(){
	var n=0;
	$("button").eq(1).click(function(){
		if(n==num-1) return false;
		n++;
		$("ul").animate({
			top:-n*$(".outer").height()+"px"
		},500);
		$("ol li").eq(n).addClass('select').siblings().removeClass('select');
	})
	$("button").eq(0).click(function(){
		if(n==0) return false;
		n--;
		$("ul").animate({
			top:-n*$(".outer").height()+"px"
		},500);
		$("ol li").eq(n).addClass('select').siblings().removeClass('select');
	})
	$("ol").on("click","li",function(){
		$(this).addClass('select').siblings().removeClass('select');
		n=$(this).index();
		$("ul").animate({
			top:-n*$(".outer").height()+"px"
		},500)
	})
})