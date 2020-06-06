var app = angular.module('login-app', []);

app.controller('login-controller', function ($scope, $http) {
    $scope.username = "";
    $scope.password = "";
    $scope.error = false;

    $scope.login = function () {
        // Authenticate
        $http.post("/login/authenticate", {username: $scope.username, password: $scope.password}).then(
            function successCallback(response) {
                if(response.data.token) {
                    $scope.error = false;
                    document.cookie = "user_session=" + response.data.token;
                    window.location.href = "/";
                }
            }, function errorCallback(response) {
                $scope.password = "";
                $scope.error = true;
            }
        )
    }
});