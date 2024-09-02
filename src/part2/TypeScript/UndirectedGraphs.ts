import { LinkedList } from "../../part1/TypeScript/LinkedLists";

class MyNode {
    public value: string;
    public edges: LinkedList<Edge>

    constructor(value: string) {
        this.value = value;
        this.edges = new LinkedList<Edge>();
    }

    public addEdge(to: MyNode, weight: number) {
        this.edges.addLast(new Edge(this, to, weight));
    }

    public toString(): string {
        return `Label: ${this.value}`;
    }
}

class Edge {
    public from: MyNode;
    public to: MyNode;
    public weight: number;

    constructor(from: MyNode, to: MyNode, weight: number) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }

    public toString(): string {
        return `{from: ${this.from.value}, to: ${this.to.value}, weight: ${this.weight}}`;
    }
}

// need for implementation of PriorityQueue
interface PriorityItem<T> {
    value: T;
    priority: number;
}

// need for implementation of getShortestPath in UndirectedGraph
export class PriorityQueue<T> {
    private queue: Array<PriorityItem<T> | undefined>;
    private size: number;
    private count: number;

    constructor(length: number) {
        this.queue = new Array<PriorityItem<T> | undefined>(length).fill(undefined);
        this.size = length;
        this.count = 0;
    }

    public enqueue(item: PriorityItem<T>) {
        if (this.isFull()) {
            console.log('The queue is full.');
            return;
        }

        const i = this.shiftItemsToInsert(item);
        this.queue[i] = item;
        this.count++;
    }

    private shiftItemsToInsert(item: PriorityItem<T>): number {
        let i;
        for (i = this.count - 1; i >= 0; i--) {
            // Compare based on priority instead of value
            if (this.queue[i]!.priority > item.priority) {
                this.queue[i + 1] = this.queue[i];
            } else {
                break;
            }
        }
        return i + 1;
    }

    public dequeue(): PriorityItem<T> | undefined {
        if (this.isEmpty()) {
            console.log('The queue is empty.');
            return undefined;
        }
        return this.queue[--this.count];
    }

    public isEmpty(): boolean {
        return this.count === 0;
    }

    public isFull(): boolean {
        return this.count >= this.size;
    }

    public toString() {
        return this.queue
            .filter(x => x !== undefined)
            .map(x => `${x!.value}: ${x!.priority}`)
            .join(", ");
    }
}


export class UndirectedGraph {
    private nodes = new Map<string, MyNode>();

    public addNode(label: string) {
        if (!this.nodes.has(label)) {
            this.nodes.set(label, new MyNode(label));
            // console.log(`Node with label '${label}' added.`);
        } else {
            console.log(`Node with label '${label}' already exists.`);
        }
    }

    public addEdge(from: string, to: string, weight: number) {
        const fromNode = this.nodes.get(from);
        const toNode = this.nodes.get(to);
        if (fromNode && toNode) {
            fromNode.addEdge(toNode, weight);
            toNode.addEdge(fromNode, weight);
            // console.log(`Edge added from '${from}' to '${to}' with weight ${weight}`);
        } else {
            console.log(`One or both nodes not found: '${from}', '${to}'`);
        }
    }

    public getShortestDistance(startLabel: string): Map<string, number> {
        const distances = new Map<string, number>();
        const previousNodes = new Map<string, MyNode | null>();
        const priorityQueue = new PriorityQueue<MyNode>(this.nodes.size);

        // Initialize distances and queue
        this.nodes.forEach((node, value) => {
            distances.set(value, Infinity);
            previousNodes.set(value, null);
        });

        // Set the start node distance to 0 and enqueue it
        const startNode = this.nodes.get(startLabel);
        if (!startNode) {
            console.log(`Node with label '${startLabel}' does not exist.`);
            return distances;
        }
        distances.set(startLabel, 0);
        priorityQueue.enqueue({ value: startNode, priority: 0 });

        while (!priorityQueue.isEmpty()) {
            const current = priorityQueue.dequeue();
            if (!current) continue;

            const currentNode = current.value;
            const currentDist = distances.get(currentNode.value)!;

            currentNode.edges.toArray().forEach(edge => {
                const neighbour = edge.to;
                const newDist = currentDist + edge.weight;
                if (newDist < distances.get(neighbour.value)!) {
                    distances.set(neighbour.value, newDist);
                    priorityQueue.enqueue({ value: neighbour, priority: newDist });
                }
            });
        }
        return distances;
    }

    // Method to reconstruct the path from the start node to a given end node
    private reconstructPath(endLabel: string, previousNodes: Map<string, MyNode | null>): string[] {
        const path = [];
        let currentLabel: string | null = endLabel;

        while (currentLabel !== null) {
            path.unshift(currentLabel);  // Add to the front of the path array
            const prevNode = previousNodes.get(currentLabel);
            currentLabel = prevNode ? prevNode.value : null;  // Move to the previous node
        }

        return path;
    }

    public getShortestPath(startLabel: string): Map<string, string[]> {
        const shortestDistances = this.getShortestDistance(startLabel);
        const previousNodes = new Map<string, MyNode | null>();
        const paths = new Map<string, string[]>();

        // Initialize distances and previous nodes
        this.nodes.forEach((node, value) => {
            previousNodes.set(value, null);
        });

        // Set the start node distance to 0 and process it
        const startNode = this.nodes.get(startLabel);
        if (!startNode) {
            console.log(`Node with label '${startLabel}' does not exist.`);
            return paths;
        }

        const priorityQueue = new PriorityQueue<MyNode>(this.nodes.size);
        priorityQueue.enqueue({ value: startNode, priority: 0 });

        while (!priorityQueue.isEmpty()) {
            const current = priorityQueue.dequeue();
            if (!current) continue;
            

            const currentNode = current.value;
            const currentDist = shortestDistances.get(currentNode.value)!;

            currentNode.edges.toArray().forEach(edge => {
                const neighbor = edge.to;
                const newDist = currentDist + edge.weight;

                if (newDist <= shortestDistances.get(neighbor.value)!) {
                    if (newDist < shortestDistances.get(neighbor.value)! || previousNodes.get(neighbor.value) === null) {
                        shortestDistances.set(neighbor.value, newDist);
                        previousNodes.set(neighbor.value, currentNode);
                        priorityQueue.enqueue({ value: neighbor, priority: newDist });
                    }
                }
            });
        }

        // Reconstruct paths for all nodes
        this.nodes.forEach((_, label) => {
            const path = this.reconstructPath(label, previousNodes);
            paths.set(label, path);
        });

        return paths;
    }

    public printPaths(startLabel: string) {
        const paths = this.getShortestPath(startLabel);
        paths.forEach((path, label) => {
            console.log(`Path from ${startLabel} to ${label}: ${path.join(" -> ")}`);
        });
    }

    public hasCycle(): boolean{
        const visited = new Set<MyNode>();
        for(const node of this.nodes.values()){
            if(!visited.has(node) && this.innerHasCycle(node, null, visited)) return true;
        }
        return false;
    }

    public innerHasCycle(node: MyNode, parent: MyNode | null, visited: Set<MyNode>): boolean{
        visited.add(node);

        for(const edge of node.edges.toArray()){
            if(edge.to == parent) continue;

            if(visited.has(edge.to) || this.innerHasCycle(edge.to, node, visited)) return true;

        }

        return false;
    }

    public getMinimumSpanningTree(){
        // was super long method which demanded to implementation of another PriorityQueue
    }

    public print() {
        for (let node of this.nodes.values()) {
            const connections = node.edges.toArray().map(edge => `${edge.to.value} (weight ${edge.weight})`);
            console.log(`${node.value} -> ${connections.join(', ')}`);
        }
    }
}