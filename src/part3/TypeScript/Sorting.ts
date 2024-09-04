import { LinkedList } from "../../part1/TypeScript/LinkedLists";

export class Sorter {
    public bubbleSort(array: number[]) {
        let isSorted: boolean;
        for(let i = 0; i < array.length; i++){
            isSorted = true;
            for(let j = 1; j < array.length - i; j++){
                if(array[j] < array[j - 1]){
                    this.swap(array, j, j-1);
                    isSorted = false;
                }
                if(isSorted) return;  
            }
        }
    }

    public selectionSort(array: number[]){
        for(let i = 0; i < array.length; i++){
            let minIndex = i;
            for(let j = i; j < array.length; j++){
                if(array[j] < array[minIndex]){
                    minIndex = j;
                }
            }
            this.swap(array, minIndex, i);
        }
    }

    public insertionSort(array: number[]){
        for(let i = 1; i < array.length; i++){
            let current = array[i];
            let j = i - 1;
            while(j >= 0 && array[j] > current){
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = current;
        }
    }

    public mergeSort(array: number[]){
        if(array.length < 2) return; // base condition of recursion

        const middle = Math.floor(array.length / 2);
        const left: number[] = new Array(middle);
        for(let i = 0; i < middle; i++){
            left[i] = array[i]; 
        };

        const right: number[] = new Array(array.length - middle);
        for(let i = middle; i < array.length; i++){
            right[i - middle] = array[i];
        };

        // Sort each half
        this.mergeSort(left);
        this.mergeSort(right);

        // Merge the result
        this.mergeMerge(left, right, array);
    };

    private mergeMerge(left: number[], right: number[], result: number[]) {
        let i = 0, j = 0, k = 0;
    
        // Main merge logic
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result[k++] = left[i++];
            } else {
                result[k++] = right[j++];
            }
        }
    
        // Append the remaining elements from left array
        while (i < left.length) {
            result[k++] = left[i++];
        }
    
        // Append the remaining elements from right array
        while (j < right.length) {
            result[k++] = right[j++];
        }
    }

    public quickSort(array: number[]){
        this.innerQuickSort(array, 0, array.length -1);
    }

    private innerQuickSort(array: number[], start: number, end: number){
        if(start >= end) return; //  base condition of recursion
        // Partition
        const boundary = this.partition(array, start, end);
        // Sort left
        this.innerQuickSort(array, start, boundary - 1);
        // Sort right
        this.innerQuickSort(array, boundary + 1, end);
    }

    private partition(array: number[], start: number, end: number){
        const pivot = array[end];
        let boundary = start - 1;
        for(let i = start; i <= end; i++){
            if(array[i] <= pivot) {
                this.swap(array, i, ++boundary)
            };
        }
        return boundary;
    }

    public countingSort(array: number[], max: number){
        const counts = new Array<number>(max + 1).fill(0);
        for(let item of array){
            counts[item]++;
        }

        let k = 0;
        for(let i = 0; i < counts.length; i++){
            for(let j = 0; j < counts[i]; j++){
                array[k++] = i;
            }
        }
    }

    public bucketSort(array: number[], bucketSize: number = 5) {
        if (array.length <= 1) {
            return;
        }

        // Find the minimum and maximum values to help calculate bucket index
        let minValue = array[0];
        let maxValue = array[0];
        for (let i = 1; i < array.length; i++) {
            if (array[i] < minValue) {
                minValue = array[i];
            } else if (array[i] > maxValue) {
                maxValue = array[i];
            }
        }

        // Calculate bucket count and initialize each bucket as a LinkedList
        const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
        const buckets: LinkedList<number>[] = Array.from({ length: bucketCount }, () => new LinkedList<number>());

        // Distribute input array elements into buckets
        for (let i = 0; i < array.length; i++) {
            const bucketIndex = Math.floor((array[i] - minValue) / bucketSize);
            buckets[bucketIndex].addLast(array[i]);
        }

        // Sort each bucket and merge back to the original array
        let arrayIndex = 0;
        for (let bucket of buckets) {
            const bucketArray = bucket.toArray();
            this.insertionSort(bucketArray);
            for (let i = 0; i < bucketArray.length; i++) {
                array[arrayIndex++] = bucketArray[i];
            }
        }
    }

    private swap(array: number[], index1: number, index2: number){
        let temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    }
}