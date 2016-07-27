var app = angular.module('myApp', []);
app.factory("service", ['$http', function ($http) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
        for (name in obj) {
            value = obj[name];
            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };
    // Override $http service's default transformRequest
    $http.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
    var baseurl = "http://localhost:34254/api/User"
    return {
        userpost: function (obj) {
            return $http.post(baseurl + "/Login",{Account:obj});
        }
    }
}])
app.controller("LoginController", function ($scope, service) {

    $scope.login = function () {
        var data = {
            UserName: $scope.UserName,
            Password: $scope.Password
        }
        service.userpost(data).then(function (response) {
            // console.log('Success!!!!');
        }, function (response) {
            //Second function handles error
            // console.log('Error!!!!');
        });
    }
})