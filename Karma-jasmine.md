# Karma-Jasmine

This file includes installation guide for Kama and Jasmine for testing angular application
Getting Started with Karma for Tesing AngularJs:
Karma provides realtime tests results while Changing code, But we need to refresh browser everytime when you make changes.

Karma - Test Runner

Jasmine - Testing Framework

# Installing Karma/Jasmine enviournment:

###  First step is to install Node.js (Open terminal -> go to working dir)

### create package.json
  <pre> $ echo {} >> package.json </pre>

(as you install following things then package.json file will update automatically)

### Install Karma Tool:
   <pre> $ sudo npm install karma --save-dev  </pre>

### Install Karma Command Line Interface(Helps to run Karma command globally)
   <pre> $ npm install -g karma-cli </pre>
  
### Install karma plug-ins to enable us to use the Jasmine test framework and Google Chrome
   <pre> $ sudo npm install karma-jasmine karma-chrome-launcher --save-dev  </pre>
  
### Install Jasmine Core
   <pre> $ sudo npm install karma-jasmine jasmine-core --save-dev  </pre>
  
### Now at this step we need to create karma config file.
   <pre> $ karma init  </pre>
  
#### Then it will ask you for configuration :
  Example: 
  
  <pre>Which testing framework do you want to use ?
  Press tab to list possible options. Enter to move to the next question.
  select--jasmine </pre>
   <pre> Do you want to use Require.js ?
  This will add Require.js plugin.
  Press tab to list possible options. Enter to move to the next question.
  Select---no </pre>
   <pre>Do you want to capture any browsers automatically ?
  Press tab to list possible options. Enter empty string to move to the next question.
  Select browser-Chrome  </pre>
   <pre> What is the location of your source and test files ?
  You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
  Enter empty string to move to the next question.
  --press enter </pre>
   <pre> Should any of the files included by the previous patterns be excluded ?
  You can use glob patterns, eg. "**/*.swp".
  Enter empty string to move to the next question.
  ----enter path of test files and your code
  03 05 2016 21:47:11.921:WARN [init]: Failed to install "karma-chrome-launcher". No permissions to write in /usr/local/lib!
  Please install it manually. </pre>
   <pre>Do you want Karma to watch all the files and run the tests on change ?
  Press tab to list possible options.
  ----select --yes </pre>

 Config file will be generated ( karma.cong.js )

NOTE: press tab to see available options and press enter to more next qiestions, we can also edit karma.conf.js file later on


### We may need to download  download the angular and angular mock libraries
  type: 

	[curl -o dir/angular.min.js https://code.angularjs.org/1.4.0-rc.2/angular.min.js]

	[curl -o dir/angular-mocks.js https://code.angularjs.org/1.4.0-rc.2/angular-mocks.js]
	
### Include above dir in to karma.conf.js
  <pre>files: [
	'lib/angular.min.js',
  	'lib/angular-mocks.js',
	'app/*.js',
      	'test/**/*.js'
    ],</pre>
    
### Install browser launcher manually (any one)

   <pre> $ chrome  - npm install karma-jasmine karma-chrome-launcher --save-dev </pre>
   <pre> $ firefox - npm install karma-jasmine karma-firefox-launcher --save-dev </pre> 
   <pre> $ safari  - npm install karma-jasmine karma-safari-launcher --save-dev  </pre>
   <pre> $ phantomJS - npm install --save-dev karma-phantomjs-launcher </pre>
  
### Now put your teste caes into /tests/ folder and application into /app/ folder  and run karma

### RUN karma

<pre> $ karma start karma.conf.js </pre>

[Repo - link](https://github.com/tpatil2/Karma-Jasmine.git)

