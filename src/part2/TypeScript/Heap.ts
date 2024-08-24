export class Heap {
    public items: number[];
    public size: number;

    constructor(){
        this.items = new Array<number>(10);
        this.size = 0;
    }

    public insert(value: number){
        if(this.isFull()){
            console.log('IllegalStateException');
            return;
        }

        this.items[this.size++] = value;

        this.bubbleUp();
    }

    public remove(): number | undefined{
        if(this.isEmpty()){
            console.log('IllegalStateException');
            return;
        }
        let root = this.items[0];
        this.items[0] = this.items[--this.size];
        
        this.bubbleDown();
        return root;
    }
    
    private bubbleDown(){
        let index = 0;
        while(index <= this.size && !this.isValidParent(index)){
            let largerChildIndex = this.largeChildIndex(index);
            
            this.swap(index, largerChildIndex);
            index = largerChildIndex;
        }
    }

    public isEmpty(): boolean{
        return this.size == 0;
    }

    private largeChildIndex(index: number): number{
        if(!this.hasLeftChild(index)) return index;

        if(!this.hasRightChild(index)) return this.leftChildIndex(index);

        return (this.leftChild(index) > this.rightChild(index)) 
                ? this.leftChildIndex(index) 
                : this.rightChildIndex(index);
    }

    private hasLeftChild(index: number): boolean{
        return this.leftChildIndex(index) <= this.size;
    }

    private hasRightChild(index: number): boolean{
        return this.rightChildIndex(index) <= this.size;
    }

    private isValidParent(index: number){
        if(!this.hasLeftChild(index)) return true;

        let isValid = this.items[index] >= this.leftChild(index);

        if(this.hasRightChild(index)){ 
            isValid = isValid && this.items[index] >= this.rightChild(index);
        };

        return isValid;
    }

    private leftChild(index: number): number{
        return this.items[this.leftChildIndex(index)]
    }

    private rightChild(index: number): number{
        return this.items[this.rightChildIndex(index)]
    }

    private leftChildIndex(index: number): number{
        return index * 2 + 1;
    }

    private rightChildIndex(index: number): number{
        return index * 2 + 2;
    }

    public isFull(): boolean{
        return this.size == this.items.length;
    }
    
    private bubbleUp(){
        let index = this.size -1;
        while (index > 0 && this.items[index] > this.items[this.parent(index)]){
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    private parent(index: number): number{
        return Math.floor((index - 1) / 2);
    }

    private swap(first: number, second: number){
        let temp = this.items[first];
        this.items[first] = this.items[second];
        this.items[second] = temp;
    }

    public max(): number{
        if(this.isEmpty()){
            console.log('IllegalStateException');
            return -1;
        };
        return this.items[0];
    }
}

export class PriorityQueueWithHeap {
    // time compexity of inserting element O(log n)
    //                of removing element O(log n)  
    private heap: Heap = new Heap();

    public enqueue(item: number){
        this.heap.insert(item);
    }

    public dequeue(){
        return this.heap.remove();
    }

    public isEmpty(): boolean{
        return this.heap.isEmpty();
    }
}
 // class make heap from array of numbers
export class MaxHeap {
    public static heapify(array: number[]){
        let lastParentIndex = array.length / 2 - 1;
        for(let i = lastParentIndex; i >= 0; i--){ 
            this.innerHeapify(array, i);
        }
    }

    private static innerHeapify(array: number[], index: number){
        let largerIndex = index;

        let leftIndex = index * 2 + 1;
        if(leftIndex < array.length && array[leftIndex] > array[largerIndex]){
            largerIndex = leftIndex;
        }

        let rightIndex = index * 2 + 2;
        if(rightIndex < array.length && array[rightIndex] > array[largerIndex]){
            largerIndex = rightIndex;
        }

        if(index == largerIndex) return;

        this.swap(array, index, largerIndex);
        this.innerHeapify(array, largerIndex);
    }

    private static swap(array: number[], first: number, second: number){
        let temp = array[first];
        array[first] = array[second];
        array[second] = temp;
    }

    public static getKthLargest(array: number[], k: number): number{
        if(k < 1 || k > array.length){
            console.log('IllegalArgumentException');
            return -1;
        };

        let heap = new Heap();
        for (let elem of array){
            heap.insert(elem);
        };

        for(let i = 0; i < k -1; i++){
            heap.remove();
        };

        return heap.max();
    }
}