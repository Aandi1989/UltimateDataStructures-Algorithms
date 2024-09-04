export class StringUtils {
    public countVowels(str: string){
        let count = 0;
        let vowels = new Set(['a', 'e', 'i', 'o', 'u'])
        for(let ch of str){
            if(vowels.has(ch.toLowerCase())){
                count++;
            }
        }
        return count;
    }

    public reverse(str: string): string {
        let reversedArray = [];
        for (let i = str.length - 1; i >= 0; i--) {
            reversedArray.push(str[i]);
        }
        return reversedArray.join('');
    }

    public reverseSentence(sentence: string): string {
        let words = sentence.split(' ');
        words.reverse();
        return words.join(' ');
    }

    public removeDuplicates(str: string): string {
        let seen = new Set<string>();
        let result = '';
    
        for (let char of str) {
            if (!seen.has(char)) {
                seen.add(char);
                result += char;
            }
        }
    
        return result;
    }

    public getMostFrequentChar(str: string) {
        const frequencyMap: { [key: string]: number } = {};
        let maxFreq = 0;
        let mostFrequentChar = null;
    
        for (const char of str) {
            if (frequencyMap[char]) {
                frequencyMap[char]++;
            } else {
                frequencyMap[char] = 1;
            }
    
            if (frequencyMap[char] > maxFreq) {
                maxFreq = frequencyMap[char];
                mostFrequentChar = char;
            }
        }

        return mostFrequentChar;
    }

    public capitalizeWords(sentence: string): string {
        return sentence
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }

    public areAnagrams(s1: string, s2: string): boolean {
        const normalize = (str: string) => str
            .replace(/\W/g, '')  // removes any non-alphanumeric characters (spaces, punctuation) 
            .toLowerCase()
            .split('')
            .sort()
            .join('');
        return normalize(s1) === normalize(s2);
    }   
    
    public isPalindrome(str: string): boolean {
        const normalized = str
            .replace(/[\W_]/g, '') // removes any non-alphanumeric characters including underscores
            .toLowerCase();
        const reversed = normalized.split('').reverse().join('');
        return normalized === reversed;
    }
    
}