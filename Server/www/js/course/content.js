var app = angular.module('content-app', []);

app.controller('content-controller', function ($scope, $http, $q) {
    $scope.user = {
        id: _userData.id,
        first_name: _userData.first_name,
        last_name: _userData.last_name,
        type: _userData.type
    };
    $scope.course_id = _course;
    $scope.course = {};
    $scope.announcements = [];
    $scope.content = [];
    $scope.loading = true;

    $scope.download = function (id, file_name) {
        window.location.href = "/files/" + id + "/" + file_name;
    }

    $scope.init = function () {
        $q.all([
            $http.get("/api/course/" + $scope.course_id, { cache: false }),
            $http.get("/api/course/" + $scope.course_id + "/announcements", { cache: false }),
            $http.get("/api/course/" + $scope.course_id + "/content", { cache: false })
        ]).then(function ([course, announcements, content]) {
            $scope.course = course.data;
            $scope.announcements = announcements.data;
            $scope.content = content.data;

            $scope.loading = false;
        }).catch(function () {
            $scope.loading = false;
            alert("an error occured");
        });
    }

    // Initialize
    $scope.init();
});