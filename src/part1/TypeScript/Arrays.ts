export class MyArray<T> {
    private array: T[];
    private count: number;

    constructor(length: number){
        this.array = new Array<T>(length);
        this.count = 0;
    }

    public insert(item: T): void {
        if(this.array.length == this.count){
            const newArray = new Array<T>(this.count * 2);
            for(let i = 0; i < this.count; i++ ){
                newArray[i] = this.array[i];
            }
            this.array = newArray;
        }
        this.array[this.count++] = item;
    }

    public removeAt(index: number): void{
        if(index < 0 || index >= this.count){
            console.error('Illegal argument exception');
        };
        for(let i = index; i < this.count; i++){
            this.array[i] = this.array[i + 1];
        };
        this.count--;
    }

    public indexOf(item: number): number{
        for(let i = 0; i < this.count; i++){
            if(this.array[i] == item){
                return i;
            }
        }
        return -1;
    }

    public print(): void{
        for(let i = 0; i < this.count; i++){
            console.log(this.array[i])
        }
    }
}