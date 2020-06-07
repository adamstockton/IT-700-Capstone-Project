var app = angular.module('meeting-app', []);

app.controller('meeting-controller', function ($scope, $http, $q) {
    $scope.user = {
        id: _userData.id,
        first_name: _userData.first_name,
        last_name: _userData.last_name,
        type: _userData.type
    };
    $scope.course_id = _course;
    $scope.course = {};
    $scope.announcements = [];
    $scope.meetings = [];
    $scope.loading = true;

    $scope.init = function () {
        $q.all([
            $http.get("/api/course/" + $scope.course_id, { cache: false }),
            $http.get("/api/course/" + $scope.course_id + "/announcements", { cache: false }),
            $http.get("/api/course/" + $scope.course_id + "/meetings", { cache: false })
        ]).then(function ([course, announcements, meetings]) {
            $scope.course = course.data;
            $scope.announcements = announcements.data;
            $scope.meetings = meetings.data;

            $scope.meetings.forEach(n => {
                n.start = (new Date(n.start)).toLocaleString();
                n.end = (new Date(n.end)).toLocaleString();
            });

            $scope.loading = false;
        }).catch(function () {
            $scope.loading = false;
            alert("an error occured");
        });
    }

    // Initialize
    $scope.init();
});