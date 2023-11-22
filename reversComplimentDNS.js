function reverseComplementDNS(str) {
    const complementMap = {
      'A': 'T',
      'T': 'A',
      'G': 'C',
      'C': 'G'
    };
    return [...str].reverse().map(char => complementMap[char]).join('');
  }

  const originalDNA = 'ATGC';
  const reverseComplementedDNS = reverseComplementDNS(originalDNA);
  
  console.log(`Original DNA: ${originalDNA}`);
  console.log(`Reverse Complemented DNA: ${reverseComplementedDNS}`);
  