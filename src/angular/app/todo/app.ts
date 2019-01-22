import * as ng from "angular";
import "angular-route";

import {PageModuleConfig} from "../../modules/layout/all";
import {TodoConfig} from "./TodoConfig";
import IRouteService = angular.route.IRouteService;
import IScope = angular.IScope;
import {NavigationSectionInfo} from "../../../rm/services/NavigationService/NavigationSectionInfo";
import {IOptionalRefreshLocationService} from "../../../rm/angular/IOptionalRefreshLocationService";
import {TodosConfig} from "./routes/todos/TodosConfig";

const MAIN_ROUTE = '/';
const TODOS_ROUTE = '/todos';

PageModuleConfig.configure();

let todoConfig = new TodoConfig();

ng.module('todo', [
        'ngRoute',
        'rmLayout'
    ])
    .config([
        '$locationProvider',
        todoConfig.locationProvider
    ])
    .config([
        '$routeProvider',
        todoConfig.routeProvider
    ])
    .run([
        'NavigationService',
        'MainNavigationInfo',
        todoConfig.run
    ])
    .run([
        '$route',
        '$rootScope',
        '$location',
        ($route: IRouteService, $scope: IScope, $location: IOptionalRefreshLocationService) => {
            $scope.$on('$routeChangeSuccess', function(e, current, previous) {
                if (previous && previous.params['admin'] == true) {
                    $location.search('admin', true);
                }
            });

            $location.performSearch = (search: string, paramValue: string|number|string[]|boolean, reload: boolean = true) => {
                if (!reload) {
                    let lastRoute = $route.current;
                    let unregister = $scope.$on('$locationChangeSuccess', (event:ng.IAngularEvent, before:string, after:string) => {
                        let regex = new RegExp("^[^?]+");
                        let afterPath = regex.exec(after)[0];
                        let beforePath = regex.exec(before)[0];
                        if(afterPath === beforePath) {
                            $route.current = lastRoute;
                        }
                        unregister();
                    });
                }

                return $location.search(search, paramValue);
            };
        }
    ])
    .value('MainNavigationInfo', new NavigationSectionInfo('main', 'Main', MAIN_ROUTE))
    .value('TodosNavigationInfo', new NavigationSectionInfo('todos', 'Todos', TODOS_ROUTE))
    .value('BaseUrl', 'http://' + window.location.host)
    .value('TodoResourceBaseUrl', '/api/v1/todo')

    .service('ErrorHandler', ['$window', '$location', '$routeParams', 'BaseUrl', ($window, $location, $routeParams, baseUrl) => {
        let isAlreadyHandlingError = false;

        return (reason => {
            let isHandlingRequired = reason == 401 || reason == 403;
            let urlToEncode = $location.url();
            let toIgnore = new RegExp("^\/assets\/");

            if (isHandlingRequired && !isAlreadyHandlingError && !toIgnore.test(urlToEncode)) {
                let alreadyHandledAuthError = false;
                if($routeParams['attemptAuthorization']) {
                    alreadyHandledAuthError = true;
                } else {
                    if(urlToEncode.indexOf('?') == -1){
                        urlToEncode += '?attemptAuthorization=true'
                    } else {
                        urlToEncode += '&attemptAuthorization=true'
                    }
                }
                let newUrl = '/login?redirectUrl=' + encodeURIComponent(urlToEncode) +
                    (alreadyHandledAuthError ? '&alreadyHandledAuthError=true' : '');
                console.log("ErrorHandler is setting the location.url", newUrl);
                //$window.location = baseUrl + newUrl;
                $location.url(newUrl);
                isAlreadyHandlingError = true;
            }

            return isHandlingRequired;
        });
    }]);

TodosConfig.configure(TODOS_ROUTE);
