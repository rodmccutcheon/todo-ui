import * as ng from "angular";

import {NavigationService} from "../../../rm/services/NavigationService/NavigationService";
import {NavigationSection} from "../../../rm/services/NavigationService/NavigationSection";
import {NavigationSectionInfo} from "../../../rm/services/NavigationService/NavigationSectionInfo";

export class TodoConfig {

    routeProvider($routeProvider:ng.route.IRouteProvider) {
        console.log("redirecting to /todos");
        $routeProvider.otherwise({redirectTo: '/todos'});
    }

    locationProvider($locationProvider:ng.ILocationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });
    }

    run(navigationService:NavigationService, navigationSectionInfo:NavigationSectionInfo) {
        navigationService.addRootSection(new NavigationSection(
            navigationSectionInfo
        ));
    }
}
