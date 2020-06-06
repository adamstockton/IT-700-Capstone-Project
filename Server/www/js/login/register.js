var app = angular.module('register-app', []);

app.controller('register-controller', function ($scope, $http) {
    $scope.username = "";
    $scope.first_name = "";
    $scope.last_name = "";
    $scope.age = "";
    $scope.password = "";
    $scope.confirm_password = "";
    $scope.error = false;
    $scope.error_message = "";

    $scope.register = function () {
        // Validate Form
        var valid = true;
        $scope.error = false;
        
        // Validate mandatory fields
        if($scope.username == "" || $scope.first_name == "" || $scope.last_name == "" || $scope.password == "" || $scope.age == "" || $scope.confirm_password == "") {
            $scope.error_message = "Please ensure that all fields are filled in before registering";
            valid = false;
        }

        // Validate Age
        if(!isNaN($scope.age) && valid) {
            if(parseInt($scope.age) < 13) {
                $scope.error_message = "You must be at least 13 years old in order to register";
                valid = false;
            }
        } else {
            $scope.error_message = "Please enter a valid age";
            valid = false;
        }

        // Validate Passwords
        if($scope.password != $scope.confirm_password && valid) {
            $scope.error_message = "Passwords do not match";
            valid = false;
        }

        // Stop if form is not valid
        if(valid == false) {
            $scope.error = true;
            return;
        }

        // Process Registration
        $http.post("/login/register", {username: $scope.username, first_name: $scope.first_name, last_name: $scope.last_name, password: $scope.password}).then(
            function successCallback(response) {
                if(response.data.token) {
                    document.cookie = "user_session=" + response.data.token + ";path=/";
                    window.location.href = "/";
                }
            }, function errorCallback(response) {
                $scope.password = "";
                $scope.error = true;
                $scope.error_message = "An error occurred creating your account"
            }
        )
        alert("Processing Registration");
    }
});