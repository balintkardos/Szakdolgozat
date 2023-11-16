function stringMatchingFFT(text, pattern) {
    // Pad the text and pattern with zeros to make them the same length
    const textPadded = text.padEnd(pattern.length, '0');
    const patternPadded = pattern.padStart(text.length, '0');
  
    // Convert the text and pattern to complex numbers
    const textComplex = textPadded.split('').map(char => {
      if (char === '0') {
        return 0;
      } else {
        return 1;
      }
    }).map(x => new Complex(x, 0));
  
    const patternComplex = patternPadded.split('').map(char => {
      if (char === '0') {
        return 0;
      } else {
        return 1;
      }
    }).map(x => new Complex(x, 0));
  
  // Compute the FFT of the text and pattern
  const textFFT = FFT(textComplex);
  const patternFFT = FFT(patternComplex);
  
 // Multiply the FFTs of the text and pattern
 const productFFT = textFFT.map((x, i) => x.conjugate() * new Complex(Math.cos(-2 * Math.PI * i / n), Math.sin(-2 * Math.PI * i / n)));
  
    // Compute the inverse FFT of the product
    const productIFFT = IFFT(productFFT);
  
    // Find the positions where the product is non-zero
    const positions = [];
    for (let i = 0; i < productIFFT.length; i++) {
      if (productIFFT[i].modulus() !== 0) {
        positions.push(i);
      }
    }
  
    // Return the positions where the pattern occurs in the text
    return positions;
  }
  
  // Complex number class
  class Complex {
    constructor(real, imag) {
      this.real = real;
      this.imag = imag;
    }
  
    conjugate() {
      return new Complex(this.real, -this.imag);
    }
  
    modulus() {
      return Math.sqrt(this.real * this.real + this.imag * this.imag);
    }
  }
  
  // Fast Fourier transform (FFT) function
  function FFT(complexNumbers) {
    const n = complexNumbers.length;
  
    // Base case
    if (n === 1) {
      return complexNumbers;
    }
  
    // Divide the complex numbers into even and odd parts
    const evenParts = complexNumbers.filter((x, i) => i % 2 === 0);
    const oddParts = complexNumbers.filter((x, i) => i % 2 === 1);
  
    // Recursively compute the FFT of the even and odd parts
    const evenFFT = FFT(evenParts);
    const oddFFT = FFT(oddParts);
  
    // Combine the results
    const combinedFFT = [];
    for (let i = 0; i < n / 2; i++) {
      const evenPart = evenFFT[i];
      const oddPart = oddFFT[i];
      const omega = new Complex(Math.cos(-2 * Math.PI * i / n), Math.sin(-2 * Math.PI * i / n));
      const combinedPart = evenPart.add(omega.multiply(oddPart));
      combinedFFT.push(combinedPart);
      combinedFFT.push(evenPart.subtract(omega.multiply(oddPart)));
    }
  
    return combinedFFT;
  }
  
  // Inverse fast Fourier transform (IFFT) function
  function IFFT(complexNumbers) {
    return FFT(complexNumbers.map(x => x.conjugate())).map(x => x.divide(complexNumbers.length)).map(x => x.real);
  }
  

  const occurrences = stringMatchingFFT("hello world", "world");
console.log(occurrences); // Output: [5]

//ez is rossz szar
