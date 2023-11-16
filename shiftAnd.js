/*
func Index(text, pattern string) int {
    state := uint64(0)
    mask := [256]uint64{}
    m := len(pattern)
    // Pattern is too short or too long
    if m == 0 || m > 63 {
        return -1
    }
    // Initialize mask table for each letter in the pattern
    for i := 0; i < len(pattern); i++ {
        mask[pattern[i]] = mask[pattern[i]] | (1 << uint(i))
    }
    for i := 0; i < len(text); i++ {
        // Update state by shifting it and masking with the record from table 
        state = state<<1 + 1
        state = state & mask[text[i]]
        if state&(1<<uint(m-1)) != 0 {
            // It's a match!
            return i - len(pattern) + 1
        }
    }
    // No match found
    return -1
}
*/
function shiftOr(pattern,text){
    let state=0;
    let mask=[]
    let matches=[]
    let m=pattern.length;
    //ha üres
    if(m==0){
        return matches
    }
    //mask tabel
    for (let i = 0; i < m; i++) {
        mask[pattern[i]] = mask[pattern[i]] | (1 << i);
    }
    //search
    for (let i = 0; i < text.length; i++) {
        // Update state by shifting it and masking with the record from table
        state = (state << 1) + 1;
        state = state & mask[text[i]];
    
        if ((state & (1 << (m - 1))) !== 0) {
            // It's a match!
            matches.push(i - pattern.length + 1);
        }
    }
    return matches; 
}


console.log(shiftOr("abc","almapapriabckaáabc"))
