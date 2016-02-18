# Angular Styleguide

## Best practices for AngularJS 1.x + ES6

## Table of Contents

  1. [Purpose](#purpose)
  1. [Getting started](#getting-started)
  1. [Build tools and transpilation](#build-tools-and-transpilation)
  1. [App entry](#app-entry)
  1. [Controllers](#controllers)
  1. [Services](#services)
  1. [Directives](#directives)
  1. [Routing](#routing)
  1. [Cordova integration](#cordova-integration)
  1. [References](#references)

## Purpose

This repository provides guidance via explanation and code samples for the foundation of development in Angular 1.x.

Where possible, I have provided code examples in ECMAScript 6. If there is no ES6 equivalent available, I've noted this and provided an example in ES5.

Thanks to, inspired by or informed by:  
[John Papa's Angular Style Guide](https://github.com/johnpapa/angular-styleguide)  
[Todd Motto's Angular styleguide](https://github.com/toddmotto/angular-styleguide)  
[Cory House's React Slingshot](https://github.com/coryhouse/react-slingshot)  


## Getting started

First, install [Node.js ](https://nodejs.org/en/download/). Note: This is only a build dependency and is not required for production servers.

All commands below are from your terminal or command line

  1. **Clone the project.** `git clone https://github.com/SavageBits/angular-styleguide.git`
  1. **Install the dependencies.** `npm install`
  1. **Build and run.** `gulp`
    * This requires [Gulp](http://gulpjs.com/) to be installed globally with `npm install gulp -g` or you can run gulp locally with `node .\node_modules\bin\gulp.js`

This will build the AngularJS app and open it in your default browser.

## Build tools and transpilation

[AngularJS 1.x](http://www.angularjs.org)


## App entry

The application is auto-bootstrapped using the ngApp attribute in index.html. The `ng-strict-di` attribute requires any module dependencies to be minification-safe via dependency injection annotations. These annotations will be handled for you by [gulp-ng-annotate](https://www.npmjs.com/package/gulp-ng-annotate).

```html
<!-- index.html -->
<html ng-app='app' ng-strict-di>
<!-- ... -->
```

```javascript
/* gulpfile.js */
/* ... */
gulp.task('js', function() {
  gulp.src(config.paths.js)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(ngAnnotate())
    .pipe(concat(config.paths.bundle))
    .pipe(gulp.dest('.'))
    .pipe(connect.reload());
});
/* ... */
```

See [Cordova integration](#cordova-integration) for mobile development bootstrapping with AngularJS 1.x.

## Controllers

To support future migration to Angular 2, avoid usage of $scope. Reference data on the controller by using "controller as" and "controllerName.propertyName".

```javascript
/* ES6 */
class AccountCtrl {
  constructor() {
      this.myProperty = 'my property';
  }
}

angular
  .module('app')
  .controller('AccountCtrl', AccountCtrl);
```
```html
<!-- index.html -->
<body ng-controller='AccountCtrl as accountCtrl'>
  My property: {{ accountCtrl.myProperty }}
  <account-card></account-card>
</body>
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
