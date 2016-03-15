var app = angular.module('buscaIp', ['ngMap']);

app.controller('buscaIpController', function($scope,$http){
    
    $scope.ips = (localStorage.getItem('ips') !== null) ? JSON.parse(localStorage.getItem('ips')) : [];
    
    $scope.addIp = function (ip) {
        var existe = false;
        for(var i = 0; i < $scope.ips.length; i++) {
            if($scope.ips[i].ipAddress === ip.ipAddress) {
                existe = true;
                break;
            }
        }
        if(!existe) {
            $scope.ips.push(ip);
            localStorage.setItem('ips', angular.toJson($scope.ips));
        }
    };
    
    $scope.buscaLocalizacao = function(ip){
        if (!($scope.validarIp(ip))) {
            
        }
        $http({method: 'GET', url:'http://api.ipinfodb.com/v3/ip-city/?key=3d8ab80ef644b6b0687849e3e078a61c466260d4828e783c0301391a8d2ff347&ip='+ip+'&format=json'})
            .success(function(data){
                $scope.dados = data;
                $scope.addIp(data);
                $scope.ip = null;
            })
            .error(function(){
                alert("Não foi possível obter a localização!");
            });
    };
    
    $scope.meuIp = function(){
        $http({method: 'GET', url:'https://api.ipify.org?format=json'})
                .success(function(data){
                $scope.buscaLocalizacao(data.ip);  
        })
        .error(function(){
            alert("Não foi possível obter seu IP!");
        });
    };
    
    $scope.apagaIp = function(index){
        $scope.ips.splice(index,1);
        localStorage.setItem('ips', angular.toJson($scope.ips));
    };
    
    $scope.pressEnter = function (event, ip) {
        var keyCode = event.which || event.keyCode;
        if (keyCode === 13) {
            $scope.buscaLocalizacao(ip);
        }
    };
    
    $scope.validarIp = function (ip) {
      var REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      if (REGEX.test(ip))  
        {  
          return true;
        }  
      return false;
    };
});