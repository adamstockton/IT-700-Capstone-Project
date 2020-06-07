var app = angular.module('dashboard-app', []);

app.controller('dashboard-controller', function ($scope, $http) {
    $scope.user = {
        id: _userData.id,
        first_name: _userData.first_name,
        last_name: _userData.last_name,
        type: _userData.type
    };
    $scope.courses = [];
    $scope.subjects = [];
    $scope.loading = true;

    /*$scope.login = function () {
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
    }*/
    $scope.openCourse = function (id) {
        alert(id);
    }

    $scope.init = function () {
        $scope.courses.push({
            id: 0,
            name: "Chemistry"
        });

        $scope.subjects.push({
            id: 0,
            name: "English"
        }, {
            id: 1,
            name: "Math"
        }, {
            id: 3,
            name: "Science"
        });
        
        $scope.loading = false;
        
    }

    // Initialize
    $scope.init();
});