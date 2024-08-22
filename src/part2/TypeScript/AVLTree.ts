class AVLNode<T> {
    public value: number;
    public height: number;
    public leftChild: AVLNode<number> | null = null;
    public rightChild: AVLNode<number> | null = null;

    constructor(value: number){
        this.value = value;
        this.height = 0;
    }

    public toString(): string {
        return `Node Value: ${this.value}, Height: ${this.height}, LeftChild: ${this.leftChild ? this.leftChild.value : 'null'}, RighChild: ${this.rightChild ? this.rightChild.value : 'null'}`;
    }
}

export class AVLTree<T>{
    private root: AVLNode<T>;

    constructor(value: number){
        this.root = new AVLNode<number>(value);
    }

    public insert(value: number){
        let root = this.privateInsert(this.root, value);
    }

    private privateInsert(root: AVLNode<number> | null, value: number): AVLNode<number>{
        if(root == null){
            return new AVLNode(value)
        }

        if(value < root.value){
            root.leftChild = this.privateInsert(root.leftChild, value);
        }else{
            root.rightChild = this.privateInsert(root.rightChild, value);
        }
        this.setHeight(root);

        return this.balance(root);
    }


    private balance(root: AVLNode<number>): AVLNode<number>{
        // Calculate the balance factor to determine if rotations are needed
        let balanceFactor = this.balanceFactor(root);

        // Left heavy scenario
        if (balanceFactor > 1) {
            // Check for left-right case
            if (root.leftChild && this.balanceFactor(root.leftChild) < 0) {
                root.leftChild = this.rotateLeft(root.leftChild); 
            }
            return this.rotateRight(root);
        }

        // Right heavy scenario
        if (balanceFactor < -1) {
            // Check for right-left case
            if (root.rightChild && this.balanceFactor(root.rightChild) > 0) {
                root.rightChild = this.rotateRight(root.rightChild); 
            }
            return this.rotateLeft(root);
        }

        return root; // Return the unmodified root if no rotations are needed
    }

    private balanceFactor(node: AVLNode<number> | null): number{
        if(!node) return 0;
        return this.getHeight(node.leftChild) - this.getHeight(node.rightChild);
    }

    private rotateLeft(root: AVLNode<number>): AVLNode<number>{
        let newRoot = root.rightChild; // the new root will be the right child of the current root
        if(!newRoot) throw new Error('rotateLeft called on a node with no right child');

        root.rightChild = newRoot.leftChild; // the current root's right child becomes the new root's left child
        newRoot.leftChild = root; // the current root becomes the left child of the new root

        this.setHeight(root); // update the height of the old root
        this.setHeight(newRoot); // update the height of the new root

        return newRoot; // the new root is returned to link it correctly in the tree
    }

    private rotateRight(root: AVLNode<number>): AVLNode<number> {
        const newRoot = root.leftChild; // the new root will be the left child of the current root
        if (!newRoot) throw new Error("rotateRight called on a node with no left child");
    
        root.leftChild = newRoot.rightChild; // the current root's left child becomes the new root's right child
        newRoot.rightChild = root; // the current root becomes the right child of the new root
    
        this.setHeight(root); // update the height of the old root
        this.setHeight(newRoot); // update the height of the new root
    
        return newRoot; // the new root is returned to link it correctly in the tree
    }
    
    
    private setHeight(node: AVLNode<number>){
        node.height = Math.max(this.getHeight(node.leftChild), this.getHeight(node.rightChild)) + 1;
    }

    private isLeftHeavy(node: AVLNode<number>): boolean {
        return this.balanceFactor(node) > 1;
    }
    
    private isRightHeavy(node: AVLNode<number>): boolean {
        return this.balanceFactor(node) < -1;
    }

    private getHeight(node: AVLNode<T> | null): number{
        if(node == null) return -1;
        return node.height;
    }

    public printInOrder() {
        this.inOrder(this.root);
    }

    private inOrder(node: AVLNode<number> | null) {
        if (node !== null) {
            this.inOrder(node.leftChild);
            console.log(node.toString());
            this.inOrder(node.rightChild);
        }
    }
}