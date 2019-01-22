import ILocationService = angular.ILocationService;

export interface IOptionalRefreshLocationService extends ILocationService {
    performSearch(search: string, paramValue: string|number|string[]|boolean, refresh: boolean): ILocationService;
}
