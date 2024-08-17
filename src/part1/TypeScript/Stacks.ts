export class Stack<T>{
    private items: T[] = new Array<T>();
    private leftCharArr  = ['(', '<', '[', '{'];
    private rightCharArr = [')', '>', ']', '}']; 

    public push(item: T): void{
        this.items.push(item);
    }

    public pop(): T | undefined{
        if(this.isEmpty()){
            console.log('Stack is empty');
            return undefined;
        }
        return this.items.pop();
    }

    public peek(): T | undefined {
        if(this.isEmpty()){
            console.log('Stack is empty');
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    public isEmpty(): boolean{
        return this.items.length === 0;
    }

    public reverse(input: string): string{
        for (let char of input){
            this.push(char as unknown as T);
        }

        let reversed = '';
        for(let i = 0; i < input.length; i++){
            reversed += this.pop();
        }
        return reversed;
    }

    public isBalances(input: string): boolean{
        // stuck must be empty before we call this method otherwise we got incorrect answer
        for (let char of input){
            if(this.isLeftBracket(char)){
                this.push(char as unknown as T);
            };

            if(this.isRightBracket(char)){
                if(this.isEmpty()) return false;

                let top = this.pop();
                if(!this.bracketsMatch(top as string, char)) return false;
            }
        };
        return this.isEmpty();
    };

    private isLeftBracket(char: string): boolean{
        return this.leftCharArr.includes(char); 
    };

    private isRightBracket(char: string): boolean{
        return this.rightCharArr.includes(char); 
    };

    private bracketsMatch(left: string, right: string): boolean{
        return this.leftCharArr.indexOf(left) == this.rightCharArr.indexOf(right); 
    };

    public print(): void {
        console.log(this.items.join(' '));
    };
}

/*
Exercise: 
    design a stack that supports push, pop and retrieving the minimum
    value in constant time.
    For example, we populate our stack with [5, 2, 10, 1] (from left to right).
    stack.min() // 1
    stack.pop()
    stack.min() // 2
*/
class MinStack {
    private stack: number[] = [];
    private minStack: number[] = [];

    public push(item: number): void {
        this.stack.push(item);
        // Push the new min onto the minStack
        if (this.minStack.length === 0 || item <= this.getMin()) {
            this.minStack.push(item);
        }
    }

    public pop(): number | undefined {
        if (this.stack.length === 0) {
            return undefined;
        }
        const item = this.stack.pop();
        // If the popped item is the minimum, pop it from the minStack as well
        if (item === this.getMin()) {
            this.minStack.pop();
        }
        return item;
    }

    public getMin(): number {
        return this.minStack[this.minStack.length - 1];
    }
}
