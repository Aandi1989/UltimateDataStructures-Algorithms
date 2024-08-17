class MyNode<T> {
    public value: T;
    public next: MyNode<T> | null = null;

    constructor(value: T){
        this.value = value;
    }

    public toString(): string {
        return `Value: ${this.value}, Next: ${this.next ? this.next.value : 'null'}`;
    }
}

export class LinkedList<T>{
    private first: MyNode<T> | null = null;
    private last: MyNode<T> | null = null;
    private size: number = 0;

    public addLast(item: T): void{
        const node = new MyNode(item);
        
        if(this.isEmpty()){
            this.first = this.last = node;
        }else{
            this.last!.next = node;
            this.last = node;
        }

        this.size++;
    }

    public addFirst(item: T): void{
        const node = new MyNode(item);

        if(this.isEmpty()){
            this.first = this.last = node;
        }else{
            node.next = this.first;
            this.first = node;
        }

        this.size++;
    }

    public indexOf(item: T): number{
        let index = 0;
        let current = this.first;
        while(current != null){
            if(current.value == item) return index;
            current = current.next;
            index++;
        }
        return -1;
    }

    public contains(item: T): boolean{
        return this.indexOf(item) != -1;
    }

    public removeFirst(){
        if(this.isEmpty()){
            console.log("No such element exception!");
            return;
        }

        if(this.first == this.last){
            this.first = this.last = null;
        }else{
            let second = this.first!.next;
            this.first!.next = null;
            this.first = second;
        }
        
        this.size--;
    }

    public removeLast(){
        if(this.isEmpty()){
            console.log('No such element exception.');
            return;
        }

        if(this.first == this.last){
            this.first = this.last = null;
        }else{
            const previous = this.getPrevious(this.last!);
            this.last = previous;
            this.last!.next = null;
        }
            
        this.size--;
    }

    public getSize(): number{
        return this.size;
    }

    public toArray(): T[]{
        let array: T[] = new Array(this.size);
        let current = this.first;
        let index = 0;
        while(current != null){
            array[index++] = current.value;
            current = current.next;
        }
        return array;
    }

    public reverse(): void {
        if(this.isEmpty()) return;

        let previous = this.first;
        let current = this.first?.next;
        while(current != null){
            let next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }

        this.last = this.first;
        this.last!.next = null;
        this.first = previous;
    }

    public getKthFromTheEnd(k: number){
        if(this.isEmpty()) {
            console.log('The list is empty!');
            return;
        };

        let a = this.first;
        let b = this.first;
        for (let i = 0; i < k - 1; i++){
            b = b!.next;
            if(b == null){
                console.log('IllegalArgumentException');
                return;
            }
        }
        while (b != this.last){
            a = a!.next;
            b = b!.next;
        }
        return a!.value;
    }

    public findTheMiddle(){
        if(this.isEmpty()) {
            console.log('The list is empty!');
            return;
        };
        
        let a = this.first;
        let b = this.first;
        while (b != this.last && b!.next != this.last){
            a = a!.next;
            b = b!.next!.next;
        }

        if(b == this.last){
            return a!.value;
        }else{
            return [a!.value, a!.next!.value]
        }
    }

    public hasLoop(){
        let slow = this.first;
        let fast = this.first;

        while(fast != null && fast.next != null){
            slow = slow!.next;
            fast = fast!.next!.next;

            if(slow == fast) return true;
        }

        return false;
    }

    private isEmpty(): boolean{
        return this.first == null;
    }

    private getPrevious(node: MyNode<T>){
        let current = this.first;
        while(current != null){
            if(current.next == node) return current;
            current = current.next;
        }
        return null;
    }

    public print(): void {
        let current = this.first;
        const elements: string[] = [];
        while(current !== null){
            elements.push(current.toString());
            current = current.next;
        }
        console.log(`LinkedList: [${elements.join(' -> ')}]`);
    }
}
