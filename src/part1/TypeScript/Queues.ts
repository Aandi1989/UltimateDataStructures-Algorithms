import { Stack } from "./Stacks";

export class QueueWithArray<T> {
    private queue: T[];
    private size: number;
    private count: number;
    private head: number;   
    private tail: number;

    constructor(length: number){
        this.queue = new Array<T>(length);
        this.size = length;
        this.count = 0;
        this.head = 0;  // указывает на начало очереди
        this.tail = 0; //  указывает на конец очередт
    }

    public enqueue(item: T){
        if(this.isFull()) {
            console.log('The queue is full');
            return;
        }
        this.queue[this.tail] = item;
        this.tail = (this.tail + 1) % this.size;  // циклически перемещаем tail
        this.count++;
    }

    public dequeue(){
        if(this.isEmpty()) {
            console.log('The queue is empty');
            return;
        }
        /*1*/ const item = this.queue[this.head];  
        this.head = (this.head + 1) % this.size;  // циклически перемещаем head
        this.count--;
        /*2*/ return item;                         // строки 1 и 2 нужны для метода reverse()
    }

    public peek(){
        if(this.isEmpty()) {
            console.log('The queue is empty');
            return;
        }
        return this.queue[this.head];
    }

    public reverse(){
        if (this.isEmpty()) {
            return;
        }
        const stack: T[] = [];
        while (!this.isEmpty()){
            stack.push(this.dequeue()!);
        }
        while (stack.length > 0){
            this.enqueue(stack.pop()!);
        }
    }

    public reverseByRecursion(){
        if (this.isEmpty()) {
            return;  // Base condition for recursion
        }

        // Step 1: Remove front element
        let front = this.dequeue();

        // Step 2: Reverse the remaining queue
        this.reverseByRecursion();

        // Step 3: Add the front element to the back of the queue
        if (front !== undefined) {
            this.enqueue(front);
        }
    }

    public reverseFirstKElements(K: number): void {
        if (K > this.count) {
            console.log('K is greater than the number of elements in the queue');
            return;
        }
    
        const stack: T[] = [];
        // Step 1: Dequeue first K elements and push them onto the stack
        for (let i = 0; i < K; i++) {
            const item = this.dequeue();
            if (item !== undefined) {
                stack.push(item);
            }
        }
    
        // Step 2: Pop from stack and enqueue back to reverse these K elements
        while (stack.length !== 0) {
            this.enqueue(stack.pop()!);
        }
    
        // Step 3: Move the remaining elements to the back of the queue to maintain original order
        const remainingCount = this.count - K;
        for (let i = 0; i < remainingCount; i++) {
            const item = this.dequeue();
            if (item !== undefined) {
                this.enqueue(item);
            }
        }
    }

    public isEmpty(): boolean{
        return this.count === 0;
    }

    public isFull(): boolean{
        return this.count >= this.size;
    }

    public print(): void {
        if (this.isEmpty()) {
            console.log('The queue is empty');
            return;
        }
        const result = [];
        for (let i = 0; i < this.count; i++){
            result.push(this.queue[(this.head + i) % this.size]);
        }
        console.log(result.join(", "));
    }
}

export class QueueWithTwoStacks<T>{
    private stack1 = new Stack<T>(); 
    private stack2 = new Stack<T>();

    public enqueue(item: T){
        this.stack1.push(item);
    }

    public dequeue(){
        if(this.isEmpty()){
            console.log('The queue is empty.');
            return;
        }

        this.moveStack1ToStack2();
        return this.stack2.pop();
    }

    public peek(){
        if(this.isEmpty()){
            console.log('The queue is empty.');
            return;
        }

        this.moveStack1ToStack2();
        return this.stack2.peek();
    }

    private moveStack1ToStack2(){
        if(this.stack2.isEmpty()){
            while(!this.stack1.isEmpty()){
                // Перемещаем элементы из stack1 в stack2
                const poppedItem = this.stack1.pop();
                if(poppedItem !== undefined){
                    this.stack2.push(poppedItem);
                }
            }
        }
    }

    public isEmpty(): boolean{
        return this.stack1.isEmpty() && this.stack2.isEmpty();
    }
}

export class PriorityQueue<T> {
    private queue: Array<T | undefined>;
    private size: number;
    private count: number;

    constructor(length: number){
        this.queue = new Array<T | undefined>(length).fill(undefined);
        this.size = length;
        this.count = 0;
    }

    public enqueue(item: T){
        if(this.isFull()){
            console.log('The queue is full.');
            return;
        }

        const i = this.shiftItemsToInsert(item);
        this.queue[i] = item;
        this.count++;
    }

    public dequeue(){
        if(this.isEmpty()){
            console.log('The queue is empty.');
            return;
        }
        return this.queue[--this.count];
    }

    public shiftItemsToInsert(item: T): number{
        let i;
        for ( i = this.count - 1; i >= 0; i--){
            if(this.queue[i]! > item){
                this.queue[i + 1] = this.queue[i]
            }else{
                break;
            }
        }
        return i + 1;
    }

    public isEmpty(): boolean{
        return this.count === 0;
    }

    public isFull(): boolean{
        return this.count >= this.size;
    }

    public toString(){
        return this.queue.filter(x => x !== undefined).join(", ")
    }
}