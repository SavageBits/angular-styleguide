# Angular Styleguide

## Best practices for AngularJS 1.x + ES6

## Table of Contents

  1. [Purpose](#purpose)
  1. [Getting started](#getting_started)
  1. [Build tools and transpilation](#build-tools-and-transpilation)
  1. [App entry](#app-entry)
  1. [Controllers](#controllers)
  1. [Services](#services)
  1. [Directives](#directives)
  1. [Routing](#routing)
  1. [Cordova integration](#cordova-integration)

## Purpose

This repository provides guidance via explanation and code samples for the foundation of development in Angular 1.x.

Where possible, I have provided code examples in ECMAScript 6. If there is no ES6 equivalent available, I've noted this and provided an example in ES5.


## Getting Started

All commands below are from your terminal or command line

  1. **Clone the project.** `git clone https://github.com/SavageBits/angular-styleguide.git`
  2. **Install the dependencies.** `npm install`
  3. **Build and run.** `gulp`

This will build the AngularJS 1.x app and open in your default browser.

## Build Tools and transpilation

## App entry

## Controllers

```javascript
/* ES6 */
class MyCtrl {
  constructor() {
      this.myProperty = 'my property';
  }
}

angular
  .module('app')
  .controller('MyCtrl', MyCtrl);
```

## Services

```javascript
/* ES6 */
class MySvc {
  constructor($http) {    
      this.$http = $http;
  }

  myGetFunction(myApiRoute) {
    return this.$http.get(myApiRoute);
  }
}

angular
  .module('app')
  .controller('mySvc', MySvc);
```


## Directives

## Routing

## Cordova integration
