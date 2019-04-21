/**
 * Created by Administrator on 2017/9/11.
 */
var app=angular.module("app",[])

app.controller("indexCtrl",function ($scope,$http,$rootScope) {
    $scope.ind=[];
    $rootScope.data={};
    $http({
        "url":"data/data.json",
        "method":"GET"
    }).success(function (d) {
        $rootScope.data=d.data;
        num=Math.ceil($scope.data.length/10);
        for(var i=0;i<num;i++){
            $scope.ind[i]=i+1;
        }
    })
})

