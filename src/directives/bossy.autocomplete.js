(function() { // iife begin

// Constructs a 2D array of dimension x by y
function createMatrix(x,y) {
  var i, matrix = new Array(x);
  for (i = 0; i < x; i++) {
    matrix[i] = new Array(y);
  }
  return matrix;
}

/**
 * https://en.wikipedia.org/wiki/Wagner%E2%80%93Fischer_algorithm
 * 
 * Computes the Levenshtein distance between two strings using the 
 * Wagner-Fischer algorithm. 
 * 
 * The Levenshtein distance is the number of insertions, deletions,
 * and substitutions that must be applied to match one string to another.
 */ 
function levDist(str1, str2) {
  var i, j, matrix = createMatrix(str1.length + 1, str2.length + 1);
  /**
   * Algorithm requires that str1 and str2 be 1-indexed. 
   * Simple solution is to prepend a ' ' 
   *
   * Autocomplete should be case-insensitive so distance will
   * be computed using the lower case versions of the strings
   */
  str1 = ' ' + str1.toLowerCase();
  str2 = ' ' + str2.toLowerCase();
  for (i = 0; i < str1.length; i++) {
    matrix[i][0] = i;
  }
  for (j = 0; j < str2.length; j++) {
    matrix[0][j] = j;
  }
  for (j = 1; j < str2.length; j++) {
    for (i = 1; i < str1.length; i++) {
      if (str1[i] === str2[j]) {
        matrix[i][j] = matrix[i-1][j-1]; 
      }
      else {
        matrix[i][j] = Math.min(matrix[i-1][j] + 1,    // a deletion
                                matrix[i][j-1] + 1,    // an insertion 
                                matrix[i-1][j-1] + 1); // a substitution
      }
    }
  }
  return matrix[str1.length - 1][str2.length - 1];
}

/**
 * http://blog.notdot.net/2007/4/Damn-Cool-Algorithms-Part-1-BK-Trees
 *
 * BK-Tree uses the metric space formed by Levenshtein distance to
 * quickly match a query string to strings in a dictionary given a
 * maximum distance (tolerance). 
 *
 * The number of comparisions a BK-tree requires to find all matches to
 * a query is substantially less than that of a brute force approach
 */
var Node = function(str) {
  this.str = str;
  /**
   * Each node can have an arbitrary amount of edges
   * Edges are associated with the Levenshtein distance from the source
   * node to the destination node.
   *
   * Ex: if this.children[3] is not null, then this.children[3] is a node
   * whose str has a distance of 3 from this.str
   */
  this.children = {};
}

Node.prototype = {
  /**
   * To add a node N to a subtree beginning at root R, we must 
   *
   * 1) Compute the distance D from R to N
   * 2) If R has an edge of value D to child node C, 
   *    add N to the subtree with root C
   * 3) Else create an edge from R to N
   *
   * @Param Node newNode
   */
  add: function(newNode) {
    var dist;
    // If a node with a matching string is already 
    // in the tree, don't do anything
    if (this.str !== newNode.str) {
      dist = levDist(this.str, newNode.str);
      if (this.children[dist] === undefined) {
        this.children[dist] = newNode;
      }
      else {
        this.children[dist].add(newNode);
      }
    }
  },
  /**
   * To search for matches to a query Q with tolerance T 
   * in a subtree with root R, we must:
   *
   * 1) Compute the distance D between R and Q.
   * 2) If D <= T, add R to the matchObj
   * 3) Search all children of R with edges in range (D-T::D+T)
   * 
   * @param str query
   * @param int tolerance
   * @param { distance:[str]|undefined } matchObject
   */
  search: function(query, tolerance, matchObj) {
    var i, dist = levDist(query, this.str);
    if (dist <= tolerance) {
      matchObj[dist].push(this.str)
    }
    // It doesn't make sense to have negative distance
    i = dist - tolerance > 0 ? dist - tolerance : 0;
    for (; i < dist + tolerance; i++) {
      if(this.children[i]) {
        this.children[i].search(query, tolerance, matchObj);
      }
    }
  }
}

// @param [str] strs
function buildBKTree(strs) {
  // Create root node from first string
  var i, root = new Node(strs[0]);
  for (i = 1; i < strs.length; i++) {
    // Create nodes from  subsequent strings and add them to the root
    root.add(new Node(strs[i]));
  }
  return root;
}

/**
 * @param Node root
 * @param str query
 * @param int tolerance
 */
function searchBKTree(root, query, tolerance) {
  // { int:[str]|null } matchObj
  var dist, matchObj = {}, matches = [];
  for (dist = 0; dist <= tolerance; dist++) {
    matchObj[dist] = [];
  }
  root.search(query, tolerance, matchObj);
  /**
   * Concatenate matches from matchObj to a single array called match
   * Note that match's elements will be in ascending order by distance
   * from query. 
   */
  for (dist = 0; dist <= tolerance; dist++) {
    matches = matches.concat(matchObj[dist]);
  }
  return matches;
}

})(); // iife end

