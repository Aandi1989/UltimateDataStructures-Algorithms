export class Search {
    public linearSearch(array: number[], target: number): number{
        for(let i = 0; i < array.length; i++){
            if(array[i] == target) return i;
        }
        return -1;
    }

    public binarySearchRec(array: number[], target: number): number{
        return this.binarySearchRecInner(array, target, 0, array.length -1)
    }

    private binarySearchRecInner(array: number[], target: number, left: number, right: number): number{
        if(right < left) return -1;

        const middle = Math.floor((left + right) / 2);

        if(array[middle] === target) return middle;

        if(target < array[middle]){
            return this.binarySearchRecInner(array, target, left, middle - 1);
        }

        return this.binarySearchRecInner(array, target, middle + 1, right);
    }

    public binarySearchIter(array: number[], target: number): number{
        let left = 0;
        let right = array.length - 1;

        while(left <= right){
            const middle = (left + right) / 2;

            if(array[middle] === target) return middle;

            if(target < array[middle]){
                right = middle - 1;
            }else{
                left = middle + 1;
            }
        }
        return -1;
    }

    public ternarySearch(array: number[], target: number): number{
        return this.ternarySearchInner(array, target, 0, array.length - 1);
    }

    private ternarySearchInner(array: number[], target: number, left: number, right: number): number{
        if(left > right) return -1;

        const partitionSize = (right - left) / 3;
        const mid1 = left + partitionSize;
        const mid2 = right - partitionSize;

        if(array[mid1] == target) return mid1;
        if(array[mid2] == target) return mid2;

        if(target < array[mid1]){
            return this.ternarySearchInner(array, target, left, mid1 - 1);
        };

        if(target > array[mid2]){
            return this.ternarySearchInner(array, target, mid2 + 1, right);
        };

        return this.ternarySearchInner(array, target, mid1, mid2 - 1);
    }

    public jumpSearch(array: number[], target: number){
        const blockSize = Math.floor(Math.sqrt(array.length));        
        let start = 0;
        let next = blockSize;

        while(start < array.length && array[next - 1] < target){
            start = next;
            next += blockSize;
            if(next > array.length){
                next = array.length;
            }
        }

        for( let i = start; i < next; i++){
            if(array[i] == target) return i;
        }
        return -1;
    }

    public exponentialSearch(array: number[], target: number){
        if (array.length === 0) return -1;
        if (array[0] === target) return 0;

        let bound = 1;
        while(bound < array.length && array[bound] < target){
            bound = bound * 2;
        }

        let left = bound / 2;
        let right = Math.min(bound, array.length - 1);

        return this.binarySearchRecInner(array, target, left, right);
    }
}