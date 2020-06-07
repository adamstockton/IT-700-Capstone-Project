var app = angular.module('course-app', []);

app.controller('course-controller', function ($scope, $http, $q) {
    $scope.user = {
        id: _userData.id,
        first_name: _userData.first_name,
        last_name: _userData.last_name,
        type: _userData.type
    };
    $scope.course_id = _course;
    $scope.course = {};
    $scope.announcements = [];
    $scope.loading = true;

    $scope.init = function () {
        $q.all([
            $http.get("/api/course/" + $scope.course_id, { cache: false }),
            $http.get("/api/course/" + $scope.course_id + "/announcements", { cache: false })
        ]).then(function ([course, announcements]) {
            $scope.course = course.data;
            $scope.announcements = announcements.data;
            $scope.loading = false;
        }).catch(function () {
            $scope.loading = false;
            alert("an error occured");
        });
    }

    // Initialize
    $scope.init();
});