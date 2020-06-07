var app = angular.module('subject-app', []);

app.controller('subject-controller', function ($scope, $http, $q) {
    $scope.user = {
        id: _userData.id,
        first_name: _userData.first_name,
        last_name: _userData.last_name,
        type: _userData.type
    };
    $scope.course_id = _course;
    $scope.course = {};
    $scope.loading = true;

    $scope.init = function () {
        $q.all([
            $http.get("/api/course/" + $scope.course_id, { cache: false })
        ]).then(function ([course]) {
            $scope.course = course.data;

            $scope.loading = false;
        }).catch(function () {
            $scope.loading = false;
            alert("an error occured");
        });
    }

    // Initialize
    $scope.init();
});