export class Helpers {
    
}

const toPascalCase = (sentence) => sentence
   .split(' ')
   .map(word => word[0]
   .toUpperCase()
   .concat(word.slice(1)))
   .join(' ');
