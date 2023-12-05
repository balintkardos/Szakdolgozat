/**
* Az Aho-Corasick algoritmus által használt Trie csomópontját jelöli.
* @class
*/
class TrieNode {
  /**
  * Inicializál egy új TrieNode-ot.
  * @constructor
  */
  constructor() {
    /**
     * Az aktuális csomópont gyermekcsomópontjait reprezentáló szótár.
     * @type {Object.<string, TrieNode>}
     */
    this.children = {};

    /**
     * Egy tömb, amely ennél a csomópontnál végződő mintákat tartalmaz.
     * @type {Array.<string>}
     */
    this.output = [];

    /**
     * Hivatkozás a Trie hibacsomópontjára.
     * @type {TrieNode|null}
     */
    this.failure = null;
  }
}

/**
* Az Aho-Corasick algoritmust.
* @class
*/
class AhoCorasick {

  /**
   * Inicializál egy új AhoCorasick-példányt egy üres Trie-vel.
   * @constructor
   */
  constructor() {

    /**
     * Az Aho-Corasick algoritmusban használt Trie gyökércsomópontja.
     * @type {TrieNode}
     */
    this.root = new TrieNode();
  }

  /**
   * Mintát hozzáadja a Trie-hez.
   * @param {string} pattern - Minta amit a Trie-hez ad.
   */
  addPattern(pattern) {
    let node = this.root;
    for (let char of pattern) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.output.push(pattern);
  }

  /**
   * A mintaillesztés optimalizálása érdekében létrehozza a hibahivatkozásokat a Trie-ben.
   */
  buildFailureLinks() {
    const queue = [];

    for (const key in this.root.children) {
      const child = this.root.children[key];
      child.failure = this.root;
      queue.push(child);
    }

    while (queue.length > 0) {
      const currentNode = queue.shift();

      for (const key in currentNode.children) {
        const child = currentNode.children[key];
        queue.push(child);

        let failureNode = currentNode.failure;

        while (failureNode !== null && !failureNode.children[key]) {
          failureNode = failureNode.failure;
        }

        child.failure = failureNode ? failureNode.children[key] : this.root;

        child.output = child.output.concat(child.failure.output);
      }
    }
  }

  /**
   * Megkeresi az adott mintátkat a szövegbe Aho-Corasick algoritmusal.
   * @param {string} text - A minták kereséséhez szükséges szöveg.
   * @returns {Array.<{ pattern: string, index: number }>} - Egyező mintákat és indexeiket tartalmazó objektumok tömbje.
   */

  search(text) {
    let node = this.root;
    const results = [];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      while (node !== this.root && !node.children[char]) {
        node = node.failure;
      }

      if (node.children[char]) {
        node = node.children[char];
      } else {
        node = this.root;
      }

      for (const pattern of node.output) {
        results.push({ pattern, index: i - pattern.length + 1 });
      }
    }

    return results;
  }
}

/**
 * Exportálja az AhoCorasick osztályt más modulokban való használatra.
 * @module AhoCorasick
 */
module.exports = AhoCorasick;
