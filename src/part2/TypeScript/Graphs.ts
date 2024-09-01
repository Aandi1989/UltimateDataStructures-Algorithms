import { LinkedList } from "../../part1/TypeScript/LinkedLists";
import { QueueWithArray } from "../../part1/TypeScript/Queues";
import { Stack } from "../../part1/TypeScript/Stacks";

class MyNode {
    public label: string;

    constructor(label: string) {
        this.label = label;
    }

    public toString(): string {
        return `Label: ${this.label}}`;
    }
}

export class Graph {
    private nodes: Map<String, MyNode>;
    private adjacencyList: Map<string, Set<MyNode>>;

    constructor() {
        this.nodes = new Map<string, MyNode>();
        this.adjacencyList = new Map<string, Set<MyNode>>();
    };

    public addNode(label: string) {
        if (!this.nodes.has(label)) {
            const node = new MyNode(label);
            this.nodes.set(label, node);
            this.adjacencyList.set(label, new Set<MyNode>());
            console.log(`Node with label '${label}' added.`);
        } else {
            console.log(`Node with label '${label}' already exists.`);
        }
    }

    public addEdge(from: string, to: string) {
        const fromNode = this.nodes.get(from);
        const toNode = this.nodes.get(to);
        if (fromNode && toNode) {
            this.adjacencyList.get(from)?.add(toNode);
            console.log(`Edge added from '${from}' to '${to}'`);
        } else {
            console.log(`One or both nodes not found: '${from}', '${to}'`);
        }
    }

    public removeNode(label: string) {
        const node = this.nodes.get(label);
        if (node == null) return;

        // Remove the node from all adjacency lists
        this.adjacencyList.forEach((connections) => {
            connections.delete(node);
        });

        // Remove the node's own entry in the adjacency list
        this.adjacencyList.delete(label);

        // Remove the node from the nodes map
        this.nodes.delete(label);

        console.log(`Node with label '${label}' removed.`);
    }

    public removeEdge(from: string, to: string){
        const fromNode = this.nodes.get(from);
        const toNode = this.nodes.get(to);

        if (fromNode && toNode) {
            this.adjacencyList.get(from)?.delete(toNode);
        }
    }

    public traverseDepthFirst(root: string){
        const node = this.nodes.get(root);
        if(node == null){
            console.log('There is no such node in the graph.');
            return;
        }

        this.innerTraverseDepthFirst(node, new Set<MyNode>());
    }

    private innerTraverseDepthFirst(root: MyNode, visited: Set<MyNode>){
        console.log(root.label);
        visited.add(root);

        for(let node of this.adjacencyList.get(root.label)!){
            if(!visited.has(node)){
                this.innerTraverseDepthFirst(node, visited);
            }
        }
    }

    public traverseDepthFirstIterative(root: string){
        const node = this.nodes.get(root);
        if(node == null){
            console.log('There is no such node in the graph.');
            return;
        };

        const visited = new Set<MyNode>();

        const stack = new Stack<MyNode>();
        stack.push(node);

        while(!stack.isEmpty()){
            let current = stack.pop();

            if(visited.has(current!)) continue;

            console.log(current!.label);
            visited.add(current!);

            for(const neighbour of this.adjacencyList.get(current!.label)!){
                if(!visited.has(neighbour)){
                    stack.push(neighbour);
                }
            }
        }
    }

    public traverseBreadthFirst(root: string){
        const node = this.nodes.get(root);
        if(node == null){
            console.log('There is no such node in the graph.');
            return;
        };

        const visited = new Set<MyNode>();

        const queue = new QueueWithArray<MyNode>(50);
        queue.enqueue(node);

        while(!queue.isEmpty()){
            let current = queue.dequeue();

            if(visited.has(current!)) continue;

            console.log(current!.label);
            visited.add(current!);

            for(const neighbour of this.adjacencyList.get(current!.label)!){
                if(!visited.has(neighbour)){
                    queue.enqueue(neighbour);
                }
            }
        }
    }

    public topologicalSort(){
        const stack = new Stack<MyNode>();
        const visited = new Set<MyNode>();

        for(const node of this.nodes.values()){
            this.innerTopologicalSort(node, visited, stack);
            };

            const sorted = new LinkedList<String>();
            while(!stack.isEmpty()){
                sorted.addFirst(stack.pop()!.label);
            };
        return sorted;
    }

    public innerTopologicalSort(node: MyNode, visited: Set<MyNode>, stack: Stack<MyNode>){
        if(visited.has(node)) return;

        visited.add(node);

        for(const neighbour of this.adjacencyList.get(node.label)!){
            this.innerTopologicalSort(neighbour, visited, stack);
        }

        stack.push(node);
    }

    public hasCycle(): boolean{
        const all = new Set<MyNode>();
        for(let node of this.nodes.values()){
            all.add(node);
        };

        const visiting = new Set<MyNode>();
        const visited = new Set<MyNode>();

        while(all.size > 0){
            let current = Array.from(all)[0];
            if(this.innerHasCycle(current, all, visiting, visited)) return true;
        }
        return false;
    }

    private innerHasCycle(node: MyNode, all: Set<MyNode>, visiting: Set<MyNode>, visited: Set<MyNode>): boolean{
        all.delete(node);
        visiting.add(node);

        for(const neighbour of this.adjacencyList.get(node.label)!){
            if(visited.has(neighbour)) continue;

            if(visiting.has(neighbour)) return true;

            if(this.innerHasCycle(neighbour, all, visiting, visited)) return true;
        }

        visiting.delete(node);
        visited.add(node);

        return false;
    }

    public print() {
        for (let [key, values] of this.adjacencyList) {
            const connections = Array.from(values).map(node => node.label).join(', ');
            console.log(`${key} -> ${connections}`);
        }
    }
}