export interface Action {
    (): void;
}

export interface Producer<O> {
    (): O;
}

export interface Consumer<I> {
    (I): void;
}

export interface DoubleConsumer<A, B> {
    (A, B?): void;
}

export interface Func<I, O> {
    (I): O;
}

export interface Predicate<I> {
    (I): boolean;
}

export interface Comparator<A,B> {
    (A,B): boolean;
}

export let EmptyAction = () => {};
export let EmptyConsumer = i => {};
export let AlwaysTrue = i => true;
export let AlwaysFalse = i => false;