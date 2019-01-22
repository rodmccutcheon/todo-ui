import {Map} from "gulp-typescript/release/utils";
import {Pair} from "./Pair";

export class MapUtils {

    public static toMap<K, V>(pairs: Pair<K, V>[]): Map<V> {
        let mapping = <Map<V>>{};
        pairs.forEach(pair => mapping[pair.key.toString()] = pair.value);
        return mapping;
    }

    public static toPairs<V>(map: Map<V>): Pair<string, V>[] {
        let pairs = [];

        for (var key in map) {
            pairs.push(new Pair<string, V>(key, map[key]));
        }

        return pairs;
    }

}
