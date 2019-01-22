import {MapUtils} from "../../src/rm/util/MapUtils";
import {Pair} from "../../src/rm/util/Pair";

describe('MapUtils', () => {

    it('generates map from a collection of pairs', () => {
        expect(MapUtils.toMap([new Pair("a", 1), new Pair("b", 2)])).toEqual({
            "a": 1,
            "b": 2
        });
    });

    it('generates collection of pairs from a map', () => {
        expect(MapUtils.toPairs({
            "a": 1,
            "b": 2
        })).toEqual([new Pair("a", 1), new Pair("b", 2)]);
    });

});
