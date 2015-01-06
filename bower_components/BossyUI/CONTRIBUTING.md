## tl;dr;
To get up and developing;
* We use the fork & pull Git model, fork a local copy.
* Install Git, Node, Gulp
* Run `npm install` to install all NPM packages.

Contributing Guide
==================

Let's build something awesome. We can make it happen with your help.

## Verbose Version 
We use the [fork & pull model](https://help.github.com/articles/using-pull-requests#fork--pull) to accept new code into the project. If you aren't familiar with that workflow, Github's [Using Pull Requests](https://help.github.com/articles/using-pull-requests) article is a great primer.

If you plan on contributing more than once and want to keep your fork up to date with this project we recommend checking out these guides on [configuring a remote for a fork](https://help.github.com/articles/configuring-a-remote-for-a-fork) and [syncing a fork](https://help.github.com/articles/syncing-a-fork).

## Getting Involved

The easiest way to get involved is to join in the conversation on this repositories issue tracker. This is where we work out ideas for new features and fixes. Once we have the details worked out here we can easily implement against a defined specification.

## Adding Code

If you want to dive in and help contribute some code we'll have some coding guidelines for you to checkout soon. Stay tuned.

## Environment Setup

To get developing you will need to have a few programs installed which will make things easier as you develop.

### Git

[Installation Instructions](http://git-scm.com/book/en/Getting-Started-Installing-Git)

*Note For Windows Users*: mysysgit comes with a tool called `git bash` which is the recommened shell to run commands in. 

### Node.js and NPM
First you will need to make sure you have [Node.js](http://nodejs.org) installed on your machine. If you are unsure if you have Node.js installed on your computer you can run this command in your terminal to check.

```bash
$ node -v
```

If your terminal returns a version number then you are good to go. If it does not return a version number then visit the [Node.js downloads page](http://nodejs.org/download/) and download and install a copy on your machine.

With the Node.js installer you will also get the NPM CLI (Node Package Manager Command Line Interface) which your computer will use to download packages from the NPM registry. 

### Install all NPM/Bower packages

```bash
$ npm install
```

### Gulp
We use Gulp as our build system.  To install gulp, run:

```bash
$ npm install --global gulp
```
To get a list of availble build commands, run:

```bash
$ gulp help
```

## Finding Bugs?

We don't write perfect software and systems and platforms change, so if you've found a bug log it in the issue tracker so we can get started fixing it.
