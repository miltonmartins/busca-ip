var app = angular.module('buscaIp', []);

app.controller('buscaIpController', function($scope,$http){
    $scope.buscaLocalizacao = function(ip){
                $scope.todosDados = (localStorage.getItem('todosDados') !== null)?
                JSON.parse(localStorage.getItem('todosDados')) : {};
        $http({method: 'GET', url:'http://api.ipinfodb.com/v3/ip-city/?key=3d8ab80ef644b6b0687849e3e078a61c466260d4828e783c0301391a8d2ff347&ip='+ip+'&format=json'})
            .success(function(data){
                $scope.dados = data;
                $scope.todosDados.push(dados);
                localStorage.setItem('todosDados', angular.toJson($scope.todosDados));
                $scope.dados = {};
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
    
    $scope.initMap = function(lat, long) {
        var mapDiv = document.getElementById('map');
        var map = new google.maps.Map(mapDiv, {
            center: {lat: lat, lng: long},
            zoom: 8
        });
    };
});
