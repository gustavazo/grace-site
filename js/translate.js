var angularLoaded = false;

while (!angularLoaded) {
    console.log(angular, 'angular');

    if (angular !== undefined) {
        console.log('hey!', angular, )
        angularLoaded = true;
        
    }
}

if (angular !== undefined) {
    console.log
}

angular.module('translate', [])
    .controller('MainController', function($scope, $http) {
        $scope.current = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'spanish';
        $scope.translate = {};

        $('body').css('display', 'block')

        $scope.getLanguage = function() {
            $http.get($scope.current + '.json').
                then(function(res) {
                    console.log(res);
                    $scope.translate = res.data;
                });
        }

        $scope.selectLanguage = function(lang) {
            console.log('select language', lang, 'set item');
            $scope.current = lang;
            localStorage.setItem('lang', lang);
            $scope.getLanguage();
        }

        $scope.getLanguage();
    })
    .directive('compile', function($compile) {
        return {
            restrict: 'EA',
            link: function(scope, element, attrs) {
                console.log('linked', element[0].innerHTML)
                attrs.$observe('compile', function() {
                    console.log(element[0].attributes.compile.nodeValue);
                    var template = '<span>' + element[0].attributes.compile.nodeValue + '</span>';
                    var linkFn = $compile(template);
                    var content = linkFn(scope);
                    console.log('asd', attrs);
                    element.empty();
                    element.append(content);
                });
            }
        }
    })