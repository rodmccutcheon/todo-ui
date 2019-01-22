import {IResource} from "../api/IResource";
import {SavedEntity} from "../api/SavedEntity";
import {PromiseUtils} from "./promises/PromiseUtils";
import {PromiseRejectionHandler} from "../promises/PromiseRejectionHandler";

export class Resource<I, K> implements IResource<I, K> {

    constructor(
        protected $http: ng.IHttpService,
        protected baseUrl: string,
        protected rejectionHandler: PromiseRejectionHandler,
        protected baserUrlGenerator?: (id:K)=>string
    ) {}

    public add(item:I):Promise<SavedEntity<I,K>> {
        return PromiseUtils.wrapSingle(this.$http.post(this.baseUrl, item), this.rejectionHandler);
    }

    public retrieveAll(): Promise<I[]> {
        return PromiseUtils.wrapSingle(this.$http.get(this.baseUrl), this.rejectionHandler);
    }

    public retrieve(id:K):Promise<I> {
        return PromiseUtils.wrapSingle(this.$http.get(this.generateBaseUrl(id)), this.rejectionHandler);
    }

    public retrieveMany(ids:K[]):Promise<I[]> {
        return PromiseUtils.wrapMultiple(ids.map(id => this.$http.get(this.generateBaseUrl(id))), this.rejectionHandler);
    }

    public update(id:K, item:I):Promise<{}> {
        return PromiseUtils.wrapSingle(this.$http.put(this.generateBaseUrl(id), item), this.rejectionHandler);
    }

    public delete(id:K):Promise<{}> {
        return PromiseUtils.wrapSingle(this.$http.delete(this.generateBaseUrl(id)), this.rejectionHandler);
    }

    public deleteByValue(item:I):Promise<{}> {
        return PromiseUtils.wrapSingle(this.$http.delete(this.baseUrl, PromiseUtils.wrapData(item)), this.rejectionHandler);
    }

    public deleteMany(ids:K[]):Promise<{}> {
        return PromiseUtils.wrapSingle(this.$http.delete(this.baseUrl, ids), this.rejectionHandler);
    }

    protected generateBaseUrl(id:K):string {
        return this.baserUrlGenerator ? this.baserUrlGenerator(id) : (this.baseUrl + "/" + id);
    }
}
