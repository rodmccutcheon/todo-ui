import {NavigationSectionInfo} from "./NavigationSectionInfo";
import {ITyped} from "../../util/ITyped";

export class NavigationSection implements ITyped {

    public getType(): string {
        return "NavigationSection";
    }

    public routeParams:Object = {};
    public children:NavigationSection[] = [];

    public url:string;
    private active:boolean = false;
    private parent:NavigationSection = null;

    private levelInRouteTree:string;

    constructor(public info:NavigationSectionInfo,
                private routeGenerator?:(buildingId?:number, floorId?:number) => string) {
        this.levelInRouteTree = NavigationSection.getCurrentLevel(info.Route);
    }

    private static getCurrentLevel(route:string):string {
        let regex = new RegExp("(?:\\/(?:\\w|\\/|:)+?)*\\/(\\w+?)\\b");
        let level = regex.exec(route);
        return level ? level[1] : null;
    }

    get LevelInRouteTree():string {
        return this.levelInRouteTree;
    }

    public isActive():boolean {
        return this.active;
    }

    public addSubSection(section:NavigationSection, routeToSection:string[]):boolean {
        if (routeToSection.length === 1) {
            this.addChild(section);
            return true;
        }
        for (let child of this.children) {
            if (child.levelInRouteTree === routeToSection[0]) {
                routeToSection.splice(0, 1);
                return child.addSubSection(section, routeToSection);
            }
        }
        return false;
    }

    public getSubSection(id:string) {
        if (this.info.Id === id) {
            return this;
        } else {
            for (let child of this.children) {
                let found = child.getSubSection(id);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }

    public getRoute(buildingId?:number, floorId?:number):string {
        if (this.routeGenerator) {
            return this.routeGenerator(buildingId, floorId);
        } else {
            return null;
        }
    }

    public static getRouteToSection(route:string):string[] {
        let regex = new RegExp("\\/(\\w+?)\\b", 'g');
        let chain:string[] = [];
        let result = regex.exec(route);
        while (result) {
            chain.push(result[1]);
            result = regex.exec(route);
        }
        return chain;
    }

    private setParent(parent:NavigationSection = null) {
        this.parent = parent;
    }

    private toggleActiveState(active:boolean) {
        this.active = (typeof active === 'boolean') ? active : !this.active;
    }

    public getParent():NavigationSection {
        return this.parent;
    }

    public hasParent():boolean {
        return this.parent && (this.parent instanceof NavigationSection);
    }

    public getChild(sectionId):NavigationSection {
        for (let child of this.children) {
            if (child.info.Id === sectionId) {
                return child;
            }
        }
    }

    public getActiveSection():NavigationSection {
        if (this.active) {
            if (!this.hasChildren()) {
                return this;
            } else {
                for (let child of this.children) {
                    let childsActive = child.getActiveSection();
                    if (childsActive) {
                        return childsActive;
                    }
                }
                return this;
            }
        }
        return null;
    }

    public getChildren():NavigationSection[] {
        return this.children;
    }

    public hasChildren():boolean {
        return this.children && (this.children.length > 0);
    }

    public addChildren(children:NavigationSection[] = []) {
        if (!children || !children.length) {
            return;
        }
        for (let idx = 0; idx < children.length; idx += 1) {
            this.addChild(children[idx]);
        }
    }

    public addChild(section:NavigationSection) {
        section.setParent(this);
        this.children.push(section);
    }

    public addSection(section:NavigationSection) {

    }

    public setActive() {
        this.toggleActiveState(true);
    }

    public setInactive() {
        this.toggleActiveState(false);
    }

    public applyLocation(locationUrl:string) {
        this.applyRouteParams(this.routeParams);
        let isMatchingUrl = new RegExp(this.url).test(locationUrl);
        this.toggleActiveState(isMatchingUrl);
        if (this.hasChildren()) {
            for (let idx = 0; idx < this.children.length; idx += 1) {
                this.children[idx].applyLocation(locationUrl);
            }
        }
    }

    public applyRouteParams(routeParams:Object) {
        this.url = this.info.Route
        if (!routeParams) {
            return;
        }
        for (let routeParam in routeParams) {
            if (routeParams.hasOwnProperty(routeParam)) {
                this.routeParams[routeParam] = routeParams[routeParam];
                this.url = this.url.replace(new RegExp(`:${routeParam}\\b`, 'g'), this.routeParams[routeParam]);
            }
        }
        if (this.hasChildren()) {
            for (let idx = 0; idx < this.children.length; idx += 1) {
                this.children[idx].applyRouteParams(routeParams);
            }
        }
    }
}
