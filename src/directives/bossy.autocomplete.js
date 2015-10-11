// Constructs a 2D array of dimension x by y
function createMatrix(x,y) {
  var i, matrix = new Array(x);
  for (i = 0; i < x; i++) {
    matrix[i] = new Array(y);
  }
  return matrix;
}

//
// https://en.wikipedia.org/wiki/Wagner%E2%80%93Fischer_algorithm
// 
// Computes the Levenshtein distance between two strings using the 
// Wagner-Fischer algorithm. 
// 
// The Levenshtein distance is the number of insertions, deletions,
// and substitutions that must be applied to match one string to another.
// 
function levDist(str1, str2) {
  var i, j, matrix = createMatrix(str1.length + 1, str2.length + 1);
  // Algorithm requires that str1 and str2 be 1-indexed. 
  // Simple solution is to prepend a ' ' 
  str1 = ' ' + str1;
  str2 = ' ' + str2;
  for (i = 0; i < str1.length; i++) {
    matrix[i][0] = i;
  }
  for (j = 0; j < str2.length; j++) {
    matrix[0][j] = j;
  }
  for (j = 1; j < str2.length; j++) {
    for (i = 1; i < str1.length; i++) {
      if (str1[i] == str2[j]) {
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

angular.module('bossy.autocomplete', []);
