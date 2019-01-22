export class SavedEntity<I,K> {

    constructor(public id:K,
                public url:string,
                public value?:I) {
    }

}
