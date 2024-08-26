class MyNode<T> {
    public static readonly AlphabetSize: number = 26;
    public value: T | null;
    public children: Map<string, MyNode<T>>;
    public isEndOfWord: boolean = false;


    constructor(value: T | null = null) {
        this.value = value;
        this.children = new Map<string, MyNode<T>>();
    }

    public getChildrenNodes(): Array<MyNode<T>> {
        return Array.from(this.children.values());
    }

    public removeChild(ch: string){
        this.children.delete(ch);
    }

    public toString(): string {
        return `Value: ${this.value}`;
    }
}

export class Trie {
    private root: MyNode<string> = new MyNode(' ');

    public insert(word: string) {
        let current = this.root;
        for (let char of word) {
            if (!current.children.has(char)) {
                current.children.set(char, new MyNode(char));
            }
            current = current.children.get(char)!;
        }
        current.isEndOfWord = true;
    }

    public contains(word: string): boolean{
        let current = this.root;
        for(let ch of word){
            if(!current.children.has(ch)){
                return false;
            }
            current = current.children.get(ch)!;
        }
        return current.isEndOfWord;
    }

    public traverse(){
        this.innerTraverse(this.root);
    }

    private innerTraverse(root: MyNode<string>){
        // Pre-order: visit the root first
        console.log(root.value);

        for(let child of root.getChildrenNodes()){
            this.innerTraverse(child);
        }

        // Post-order
        // console.log(root.value);
    }

    public remove(word: string){
        this.innerRemove(this.root, word, 0);
    }

    private innerRemove(root: MyNode<string>, word: string, index: number){
        if(index == word.length){
            root.isEndOfWord = false;
            return;
        }
        
        let ch = word[index];
        let child = root.children.get(ch);
        if(child == null) return;

        this.innerRemove(child, word, index + 1);

        if(child.children.size === 0 && !child.isEndOfWord){
            root.removeChild(ch);
        }
    }

    public printStructure(): void {
        console.log("Root");
        this.printNode(this.root, "");
    }

    private printNode(node: MyNode<string>, indent: string): void {
        node.children.forEach((child, char) => {
            console.log(`${indent}--(${char})${child.isEndOfWord ? '*' : ''}`);
            this.printNode(child, indent + "  ");
        })
    }

    public findWords(prefix: string): string[] {
        const words: string[] = [];
        const lastNode = this.findLastNodeOf(prefix);
        if (lastNode !== null) {
            this.innerFindWords(lastNode, prefix, words);
        }
        return words;
    }

    private innerFindWords(node: MyNode<string> | null, prefix: string, words: string[]): void {
        if (node === null) return;

        if (node.isEndOfWord) {
            words.push(prefix);
        }

        node.children.forEach((child, char) => {
            this.innerFindWords(child, prefix + char, words);
        });
    }

    private findLastNodeOf(prefix: string): MyNode<string> | null {
        let current = this.root;
        for (let i = 0; i < prefix.length; i++) {
            const char = prefix[i];
            if (!current.children.has(char)) {
                return null;
            }
            current = current.children.get(char)!;
        }
        return current;
    }
}