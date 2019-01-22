import * as ng from "angular";

import {TodosController} from "./TodosController";
import {NavigationService} from "../../../../../rm/services/NavigationService/NavigationService";
import {NavigationSection} from "../../../../../rm/services/NavigationService/NavigationSection";
import {NavigationSectionInfo} from "../../../../../rm/services/NavigationService/NavigationSectionInfo";

export class TodosConfig {

    private static ROUTE:string;

    private static routeProvider($routeProvider: ng.route.IRouteProvider) {
        $routeProvider.when(TodosConfig.ROUTE, {
            templateUrl: '/todos/todos.html',
            controller: [
                '$scope',
                'TodoService',
                'TodosNavigationInfo',
                TodosController
            ],
            controllerAs: 'todos'
        });
    }

    static run(navigationService:NavigationService, navigationServiceInfo:NavigationSectionInfo) {
        navigationService.addSectionToSiteMap(new NavigationSection(
            navigationServiceInfo
        ));
    }

    static configure(route: string) {
        this.ROUTE = route;
        ng.module('todo')
        .config([
            '$routeProvider',
            this.routeProvider
        ])
        .run([
            'NavigationService',
            'TodosNavigationInfo',
            this.run
        ]);
    }
}