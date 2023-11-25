function longestCommonPrefix(s1,s2){
    let i=0;
    while(i<s1.length && i<s2.length && s1[i]==s2[i]){
        i++;
    }
    return s1.slice(0,i);
}

console.log(longestCommonPrefix("almafadhgasjhdgasjhdghjasgbdhjsagdjhas","almafa"))