## tl;dr;
To get up and developing;
* We use the fork & pull Git model, fork a local copy.
* Install Git, Node, Gulp, Bower
* Run `npm install -g bower gulp` to install Bower and Gulp.js globally.
* Run `npm install` to install all NPM packages.
* Run `bower install` to install all bower packages.

Contributing Guide
==================

Let's build something awesome. We can make it happen with your help.

We use the [fork & pull model](https://help.github.com/articles/using-pull-requests#fork--pull) to accept new code into the project. If you aren't familiar with that workflow, Github's [Using Pull Requests](https://help.github.com/articles/using-pull-requests) article is a great primer.

If you plan on contributing more than once and want to keep your fork up to date with this project we recommend checking out these guides on [configuring a remote for a fork](https://help.github.com/articles/configuring-a-remote-for-a-fork) and [syncing a fork](https://help.github.com/articles/syncing-a-fork).

## Getting Involved

The easiest way to get involved is to join in the conversation on this repositories issue tracker. This is where we work out ideas for new features and fixes. Once we have the details worked out here we can easily implement against a defined specification.

## Adding Code

We make use of the [airbnb style guide](https://github.com/airbnb/javascript). Please make sure that all contributed code is in line with this style guide. Code will be rejected if it is not in line with this standard.

## Environment Setup

To get developing you will need to have a few programs.

### 1. Git

Follow the [installation instructions](http://git-scm.com/book/en/Getting-Started-Installing-Git) on the git website to get setup with git.

*Note For Windows Users*: mysysgit comes with a tool called `git bash` which is the recommened shell to run commands in.

### 2. Node.js and NPM

Next make sure you have [Node.js](http://nodejs.org) installed on your machine. If you are unsure if you have Node on your computer you can run this command in your terminal to check.

```bash
$ node -v
```

If your terminal returns a version number then you are good to go. If it does not return a version number then visit the [Node.js downloads page](http://nodejs.org/download/) and download and install a copy on your machine.

With the Node.js installer you will also get the NPM CLI (Node Package Manager Command Line Interface) which your computer will use to download packages from the NPM registry.

### 3. Bower & Gulp.js

Install Bower and Gulp.js globally on your machine.

```bash
$ npm install -g bower gulp
```

### 4. Project Node modules

Install project Node module and Bower dependencies.

```bash
$ npm install
$ bower install
```

### 5. Pull up the sandbox

We use Gulp as our task runner and build system and to serve the sandbox environment. To see the changes you're developing run:

```bash
$ gulp serve
```

You can then see changes you are making to directives as you develop them at [http://localhost:3000](http://localhost:3000).

*Hint: if you want to easily see all gulp tasks available run `gulp help` in your terminal.*

## Before You Pull Request

Before you go to Github and submit your pull request be sure to run:

```bash
$ gulp jshint
$ gulp run-tests
```

As long as those tasks do not present you with any errors you are ready to submit your pull request.

## Finding Bugs?

We don't write perfect software and systems and platforms change, so if you've found a bug log it in the issue tracker so we can get started fixing it.

Contributors
============

Built with LOVE by:

Geoff Lawson <geoff.lawson@build.com>

Kevin Buffardi <kbuffardi@csuchico.edu> (CSU Chico Faculty Advisor)

Jason Merino <jasonmerino@gmail.com>

Dan Green <dan.green@build.com>

Dan Sluis <daniel@lulus.com>

Tauseef Jamadar <tmjam.ahmed@gmail.com>

Tuhin Shukla <tuhintshukla@gmail.com>

Erik Mellum

CSU Chico CS Students:

Taber Fitzgerald

Alen Maragoul

Chue Vang

Colin Baldwin

Francisco Tadillo

James Crean

Jay German

Lukas Fink

Martin Mojica

Patrick Barnum

Shelby Martin

Spencer McWilliams

Sumit Dorle

CSU Chico Design Students:

Carly Culver

Christie Landrie

Mary Trujillo
