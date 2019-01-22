import {SavedEntity} from "./SavedEntity";

export interface IResource<I, K>
    extends
        ICreateResource<I, K>,
        IReadResource<I, K>,
        IUpdateResource<I, K>,
        IDeleteResource<I, K> {}

export interface ICreateResource<I, K> {
    add(item: I): Promise<SavedEntity<I,K>>;
}

export interface IReadResource<I, K> extends IReadMultipleResource<I, K> {
    retrieveAll(): Promise<I[]>;
    retrieve(id: K): Promise<I>;
}

export interface IReadMultipleResource<I, K> {
    retrieveMany(ids: K[]): Promise<I[]>;
}

export interface IUpdateResource<I, K> {
    update(id: K, item: I): Promise<{}>;
}

export interface IDeleteResource<I, K> {
    delete(id: K): Promise<{}>;
    deleteMany(ids: K[]): Promise<{}>;
    deleteByValue(item: I): Promise<{}>;
}