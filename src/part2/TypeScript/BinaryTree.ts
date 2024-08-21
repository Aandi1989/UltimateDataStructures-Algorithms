class MyNode<T> {
    public value: T;
    public leftChild: MyNode<T> | null = null;
    public rightChild: MyNode<T> | null = null;

    constructor(value: T){
        this.value = value;
    }

    public toString(): string {
        return `Value: ${this.value}, LeftChild: ${this.leftChild ? this.leftChild.value : 'null'}, RighChild: ${this.rightChild ? this.rightChild.value : 'null'}`;
    }
}

 // extends number добавили чтобы избежать ts ошибок в методе min()
export class BinaryTree<T extends number> {
    private root: MyNode<T>;

    constructor(value: T){
        this.root = new MyNode<T>(value);
    }

    public insert(value: T){
        const node = new MyNode(value);
        let current = this.root;
        while(true){
            if(value < current.value){
                if(current.leftChild == null){
                    current.leftChild = node;
                    break;
                }
                current = current.leftChild;
            }else{
                if(current.rightChild == null){
                    current.rightChild = node;
                    break;
                }
                current = current.rightChild!;
            }
        }
    }

    public find(value: T): boolean{
        let current = this.root;
        while(current != null){
            if(value < current.value){
                if(current.leftChild == null){
                    return false;
                }
                current = current.leftChild;
            }else if(value > current.value){
                if(current.rightChild == null){
                    return false;
                }
                current = current.rightChild;
            }else{
                return true;
            }
        }
        return false;
    }

    public traversePreOrder(root: MyNode<T> | null = this.root){
        if(root == null) return;

        console.log(root.value);
        this.traversePreOrder(root.leftChild);
        this.traversePreOrder(root.rightChild);
    }

    public traverseInOrder(root: MyNode<T> | null = this.root){
        if(root == null) return;

        this.traverseInOrder(root.leftChild);
        console.log(root.value);
        this.traverseInOrder(root.rightChild);
    }

    public traversePostOrder(root: MyNode<T> | null = this.root){
        if(root == null) return;

        this.traversePostOrder(root.leftChild);
        this.traversePostOrder(root.rightChild);
        console.log(root.value);
    }

    public height(root: MyNode<T> | null = this.root): number{
        if(root === null) return 0;

        return 1 + Math.max(this.height(root.leftChild), this.height(root.rightChild))
    }

    // this method works for binary tree;  for binary search tree the left leaf always would be the smallest number
    public min(root: MyNode<number> | null = this.root): T{
        if(root === null) {
            return Number.POSITIVE_INFINITY as T;
        }

        let minValue = root.value;
        let leftMin = this.min(root.leftChild);
        let rightMin = this.min(root.rightChild);

        return Math.min(minValue, leftMin, rightMin) as T;
    }

    public minForBinaryTree(root: MyNode<number> | null = this.root): T{
        let current = root;
        let last = current;
        while(current != null){
            last = current;
            current = current.leftChild
        }
        return last!.value as T;
    }

    public isEqualTree(other: BinaryTree<T>): boolean{
        return this.equals(this.root, other.root);
    }    

    private equals(first: MyNode<T> | null, second: MyNode<T> | null): boolean{
        if(first == null && second == null) return true;
        if(first != null && second != null){
            return first.value === second.value 
                && this.equals(first.leftChild, second.leftChild)
                && this.equals(first.rightChild, second.rightChild);
        }
        return false;
    }

    public isBinarySearchTree(): boolean{
        return this.binary(this.root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    }

    private binary(root: MyNode<T> | null, min: number, max: number): boolean{
        if(root == null) return true;
        if(root.value < min || root.value > max){
            return false;
        }
        return this.binary(root.leftChild, min, root.value - 1) &&  this.binary(root.rightChild, root.value + 1, max);
    }

    public getNodesAtDistance(distance: number): Array<T>{
        const arrOfNodes: T[] = [];
        this.nodesAtDistance(this.root, distance, arrOfNodes);
        return arrOfNodes;
    }

    private nodesAtDistance(root: MyNode<T> | null, distance: number, arr: T[]){
        if(root == null) return;
        if (distance == 0){
            arr.push(root.value);
            return;
        }
        this.nodesAtDistance(root.leftChild, distance - 1, arr);
        this.nodesAtDistance(root.rightChild, distance - 1, arr);
    }

    public traverseLevelOrder(){
        for(let i = 0; i <= this.height(); i++){
            let list = this.getNodesAtDistance(i);
            for(let elem of list){
                console.log(elem);
            }
        }
    }
}