import * as ng from "angular";
import "angular-mocks";

import {IResource} from "../../../src/rm/api/IResource";
import {PromiseRejectionHandler} from "../../../src/rm/promises/PromiseRejectionHandler";
import {Todo} from "../../../src/rm/api/Todo";
import {SavedEntity} from "../../../src/rm/api/SavedEntity";
import {Resource} from "../../../src/rm/angular/Resource";

describe('Resource', () => {

    var httpBackend: ng.IHttpBackendService;
    var resource: IResource<any, number>;

    let rejectionHandler = new PromiseRejectionHandler(() => true);
    let item = new Todo(1, "Foobar", false, "UTC");
    let savedEntity = new SavedEntity(1, "1");
    let itemId = 10;
    let baseUrl = "test";

    beforeEach(() => {
        ng.mock.inject(($httpBackend: ng.IHttpBackendService, $http: ng.IHttpService) => {
            httpBackend = $httpBackend;
            resource = new Resource($http, baseUrl, rejectionHandler);
        });
    });

    it('should retrieve all correctly', (done) => {
        httpBackend.expectGET(baseUrl).respond(item);
        resource.retrieveAll().then(result => {
            expect(result).toEqual(item);
            done();
        });
        httpBackend.flush();
    });

    it('should retrieve correctly', (done) => {
        httpBackend.expectGET(baseUrl + "/" + itemId).respond(item);
        resource.retrieve(itemId).then(result => {
            expect(result).toEqual(item);
            done();
        });
        httpBackend.flush();
    });

    it('should add correctly', (done) => {
        httpBackend.expectPOST(baseUrl, item).respond(savedEntity);
        resource.add(item).then(result => {
            expect(result).toEqual(savedEntity);
            done();
        });
        httpBackend.flush();
    });

    it('should update correctly', () => {
        httpBackend.expectPUT(baseUrl + "/" + itemId, item).respond(null);
        resource.update(itemId, item);
        httpBackend.flush();
    });

    it('should delete correctly', () => {
        httpBackend.expectDELETE(baseUrl + "/" + itemId).respond(null);
        resource.delete(itemId);
        httpBackend.flush();
    });

});
