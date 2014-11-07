#  Testing

1. Jasmine used as the preferred framework for BossyUI testing. See [Documentation](http://jasmine.github.io/).
2. Karma test runner used to run Jasmine tests.See [installation](http://karma-runner.github.io/0.12/intro/installation.html).
3. karma-html2js-preprocessor - Karma plugin to convert HTML files into JS strings to serve them in a script tag.
   See [html2js-preprocessor](https://github.com/karma-runner/karma-ng-html2js-preprocessor).


## Installation for BossyUI Tests.

1. In your terminal change directory to the root of the project and install dependencies using NPM.

  ```bash
  $ cd path/to/project/root
  $ npm install
  ```

2. After that finishes run the tests with gulp.

  ```bash
  $ gulp test
  ```
