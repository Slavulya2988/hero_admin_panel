function reverseStr(str) {
    let revers = '';
    for(i = str.length - 1; i >= 0 ; i-- ){
        revers += str[i]
    }
 return revers;
//  return str.split('').reverse().join('');
}

console.log(reverseStr('Як мене звати?'))
