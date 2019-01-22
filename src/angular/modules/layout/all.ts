import * as ng from "angular";
import {TodoResource} from "../../../rm/angular/resources/TodoResource";
import {TodoService} from "../../../rm/services/TodoService";
import {RmTodosDirective} from "./rm-todos/RmTodosDirective";
import {NavigationService} from "../../../rm/services/NavigationService/NavigationService";
import {PromiseRejectionHandler} from "../../../rm/promises/PromiseRejectionHandler";

export class PageModuleConfig {

    static configure() {
        let module = ng.module('rmLayout', []);

        PageModuleConfig.configureComponents(module);
        PageModuleConfig.configureResources(module);
        PageModuleConfig.configureServices(module);
        PageModuleConfig.configureDirectives(module);
    }

    static configureComponents(module: ng.IModule) {
        module
            .service('RejectionHandler', ['ErrorHandler', PromiseRejectionHandler]);
    }

    static configureResources(module: ng.IModule) {
        module
            .service('TodoResource', ['$http', 'TodoResourceBaseUrl', 'RejectionHandler', TodoResource]);
    }

    static configureServices(module: ng.IModule) {
        module
            .service('NavigationService', ['$location', NavigationService])
            .service('TodoService', ['TodoResource', TodoService]);
    }

    static configureDirectives(module: ng.IModule) {
        module
             .directive('rmTodos', [RmTodosDirective]);
    }

}
