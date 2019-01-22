export class Pair<K, V> {

    constructor(
        public key: K,
        public value: V
    ) {}

    public static of<K, V>(key: K, value: V): Pair<K, V> {
        return new Pair<K, V>(key, value);
    }

}
