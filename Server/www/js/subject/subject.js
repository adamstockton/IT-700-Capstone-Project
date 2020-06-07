var app = angular.module('subject-app', []);

app.controller('subject-controller', function ($scope, $http, $q) {
    $scope.user = {
        id: _userData.id,
        first_name: _userData.first_name,
        last_name: _userData.last_name,
        type: _userData.type
    };
    $scope.subject = _subject;
    $scope.courses = [];
    $scope.loading = true;

    $scope.register = function (id) {
        $http.post("/api/courses/register/" + id).then(
            function (response) {
                $scope.courses.forEach(n => {
                    if(n.course_id == id) {
                        n.registered = true;
                    }
                });
            }).catch(function () {
                alert("An error occured during registration");
            });
    }

    $scope.init = function () {
        $q.all([
            $http.get("/api/courses/registered", { cache: false }),
            $http.get("/api/courses/" + $scope.subject, { cache: false })
        ]).then(function ([registered, courses]) {
            $scope.courses = courses.data;

            // Check if student is already registered for the course
            $scope.courses.forEach(n => {
                n.registered = registered.data.some(r => n.course_id == r.course_id);
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