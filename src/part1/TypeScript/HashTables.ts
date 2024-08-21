// first variant of realization
type Bucket<K, V> = Array<[K, V]>;

export class HashTable<K, V> {
    private buckets: Array<Bucket<K, V> | undefined>;
    private size: number;

    constructor(size: number = 20) {
        this.buckets = new Array<Bucket<K, V> | undefined>(size);
        this.size = size;
    }

    private hash(key: K): number {
        let hash = 0;
        const keyStr = String(key);
        for (let char of keyStr) {
            hash = (hash + char.charCodeAt(0) % this.size);
        }
        return hash;
    }

    public put(key: K, value: V): void{
        const index = this.hash(key);
        const bucket = this.buckets[index] || [];

        // check if the key already exists and update
        for (let i = 0; i < bucket.length; i++){
            if(bucket[i][0] === key){
                bucket[i][1] = value;
                return;
            }
        }

        // if the key does not exist, add it
        bucket.push([key, value]);
        this.buckets[index] = bucket;
    }

    public get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if(bucket){
            for (let [k, v] of bucket){
                if (k === key){
                    return v;
                }
            }
        }
        return undefined;
    }

    public remove(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.buckets[index]; 

        if(bucket){
            for (let i = 0; i < bucket.length; i++){
                if(bucket[i][0] === key){
                    bucket.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }

    public getFirstRepetitiveChar(input: string): K | undefined {
        for (let i = 0; i < input.length; i++) {
            const char = input[i].toLowerCase() as unknown as K;  // Приведение типа для обработки символов как ключей
            if (this.get(char) !== undefined) {
                return char;
            } else {
                this.put(char, 1 as unknown as V);  // Приведение типа, значение здесь не важно
            }
        }
        return undefined;
    }

    public print(): void {
        this.buckets.forEach(bucket => {
            if(bucket){
                console.log(bucket.map(([key, value]) => `${String(key)}: ${value}`).join(', '))
            }
        });
    }
}

// second variant of realization
export class MapHashTable<K, V> {
    private map: Map<K, V>;

    constructor() {
        this.map = new Map<K, V>();
    }

    public put(key: K, value: V): void {
        this.map.set(key, value);
    }

    public get(key: K): V | undefined {
        return this.map.get(key);
    }

    public remove(key: K): boolean {
        return this.map.delete(key);
    }

    public getFirstRepetitiveChar(input: string): string | undefined {
        for (let i = 0; i < input.length; i++) {
            const char = input[i].toLowerCase() as unknown as K; // Casting to the generic type K, assuming K can be string
            if (this.map.has(char)) {
                return char as unknown as string; // Casting back to string for return
            }
            this.map.set(char, undefined as unknown as V); // We only care about the keys in this case
        }
        

        return undefined;
    }

    public print(): void {
        this.map.forEach((value, key) => {
            console.log(`${String(key)}: ${value}`);
        });
    }
}
