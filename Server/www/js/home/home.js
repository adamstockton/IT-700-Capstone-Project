var app = angular.module('dashboard-app', []);

app.controller('dashboard-controller', function ($scope, $http, $q) {
    $scope.user = {
        id: _userData.id,
        first_name: _userData.first_name,
        last_name: _userData.last_name,
        type: _userData.type
    };
    $scope.courses = [];
    $scope.subjects = [];
    $scope.loading = true;

    $scope.openCourse = function (id) {        
        window.location.href = "/course/" + id;
    }

    $scope.openSubject = function (subject) {
        window.location.href = "/subject/" + subject;
    };

    $scope.init = function () {
        $q.all([
            $http.get("/api/courses/registered", {cache:false}),
            $http.get("/api/subjects", {cache:false})
        ]).then(function ([courses, subjects]) {
            $scope.courses = courses.data;
            $scope.subjects = subjects.data;
            $scope.loading = false;
        }).catch(function () {
            $scope.loading = false;
            alert("an error occured");
        });
    }

    // Initialize
    $scope.init();
});