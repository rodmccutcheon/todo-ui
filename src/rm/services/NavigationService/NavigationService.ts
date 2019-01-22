import {NavigationSection} from "./NavigationSection";
import {IOptionalRefreshLocationService} from "../../angular/IOptionalRefreshLocationService";
import {MapUtils} from "../../util/MapUtils";

export class NavigationService {

    public buildingId:number;
    public floorId:number;
    private siteMap:NavigationSection;

    constructor(
        private $location: IOptionalRefreshLocationService
    ) {}

    public applyContext(locationUrl:string, routeParams?:Object) {
        this.applyRouteParams(routeParams);
        this.applyLocation(locationUrl);
    }

    public applyLocation(locationUrl:string) {
        this.siteMap.applyLocation(locationUrl);
    }

    public applyRouteParams(routeParams:Object) {
        this.siteMap.applyRouteParams(routeParams);
    }

    public addRootSection(section:NavigationSection) {
        if (!section.hasParent()) {
            this.siteMap = section;
        }
    }

    public addSectionToSiteMap(section:NavigationSection) {
        let routeToSection = NavigationSection.getRouteToSection(section.info.Route);
        this.siteMap.addSubSection(section, routeToSection);
    }

    public getRootSection():NavigationSection {
        return this.siteMap;
    }

    public getActiveSection() {
        this.applyLocation(this.$location.path());
        return this.siteMap.getActiveSection();
    }

    public getSectionById(id:string):NavigationSection {
        let found = this.siteMap.getSubSection(id);
        return found || this.siteMap;
    }

    public getParentFor(id:string):NavigationSection {
        return this.getSectionById(id).getParent();
    }

    public getChildrenFor(id:string):NavigationSection[] {
        return this.getSectionById(id).getChildren();
    }

    public getSiblingsFor(id:string):NavigationSection[] {
        return this.getParentFor(id).getChildren();
    }

    public navigateToSection(section:NavigationSection, buildingId?:number, floorId?:number) {
        let route = section.getRoute(buildingId ? buildingId : this.buildingId, floorId ? floorId : this.floorId);
        this.$location.path(route);
    }

    // public navigateToSectionWithQueryString(section:NavigationSection, buildingId?:number, floorId?:number, queryParams?:Map<string|number|string[]|boolean>) {
    //     this.navigateToSection(section, buildingId, floorId);
    //     MapUtils.toPairs(queryParams).forEach((pair) => {
    //         this.$location.performSearch(pair.key, pair.value, false);
    //     });
    // }

    public navigateToActiveSection(buildingId?:number, floorId?:number) {
        let section = this.siteMap.getActiveSection() || this.siteMap;
        this.navigateToSection(section, buildingId, floorId);
    }
}
