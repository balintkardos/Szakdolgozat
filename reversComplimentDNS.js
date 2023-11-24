function reverseComplementDNS(str) {
    const complementMap = {
      'A': 'T',
      'T': 'A',
      'G': 'C',
      'C': 'G',
      'a': 't',
      't': 'a',
      'g': 'c',
      'c': 'g'
    };
    return [...str].reverse().map(char => complementMap[char]).join('');
  }

  const originalDNA = 'ATGCtjk';
  const reverseComplementedDNS = reverseComplementDNS(originalDNA);
  
  console.log(`Original DNA: ${originalDNA}`);
  console.log(`Reverse Complemented DNA: ${reverseComplementedDNS}`);
  