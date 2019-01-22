export class NavigationSectionInfo {
    constructor(private id:string,
                private name:string,
                private route:string,
                private iconClass?:string) {
    }

    get Id():string {
        return this.id;
    }

    get Name():string {
        return this.name;
    }

    get Route():string {
        return this.route;
    }

    get IconClass():string {
        return this.iconClass;
    }
}
