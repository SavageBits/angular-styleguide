# Angular Styleguide

## Best practices for AngularJS 1.x + ES6

## Table of Contents

  1. [Purpose](#purpose)
  1. [Getting started](#getting-started)
  1. [Tools](#tools)
  1. [Foundations of AngularJS](#foundations-of-angularjs)
  1. [Debugging](#debugging)
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

It answers many common questions about getting started with AngularJS and future-proofing your app as much as possible.

Where possible, I have provided code examples in ECMAScript 6. If there is no ES6 equivalent available, I've noted this and provided an example in ES5.  

[<< Back to contents](#table-of-contents)

## Getting started

First, install [Node.js ](https://nodejs.org/en/download/). We won't actually be running node, but we do want its package manager, npm. *Note: This is only a build dependency and is not required for production servers.*

All commands below are from your terminal or command line

  1. **Clone the project.** `git clone https://github.com/SavageBits/angular-styleguide.git`
  1. **Install the dependencies.** `npm install`
  1. **Build and run.** `gulp`
    * This requires [Gulp](http://gulpjs.com/) to be installed globally with `npm install gulp -g` or you can run gulp locally with `node .\node_modules\bin\gulp.js`

This will build the AngularJS app and open it in your default browser.

[<< Back to contents](#table-of-contents)

## Tools

* [JetBrains WebStorm](https://www.jetbrains.com/webstorm/)  
    * **Configure WebStorm for ES6.** *File >> Settings >> Languages & Frameworks >> JavaScript >> JavaScript language version*

I also used [Atom](https://atom.io/) extensively but ultimately found it too buggy and RAM-intensive. 

[<< Back to contents](#table-of-contents)

## Foundations of AngularJS

//@todo: add whys in the form of avoid vs recommend

**Components should have one role.**
**DOM manipulation should happen only in directives.**
**Avoid using jQuery.**
**One component per file (applies to modules, controllers, services, directives, etc).**
**Data and logic operations should be done in services.**

**The LIFT Principle.**
 - **L**ocating our code is easy.
 - **I**dentify code at a glance.
 - **F**lat structure as long as possible.
 - **T**ry to stay DRY

**File organization best practices.** Avoid inconsistency. Prefer organizing projects by feature.

```
/* by type */
|__ app  
|.. |__ accounts  
|.. |.. |__ controllers
|.. |.. |.. |-- accounts.js
|.. |.. |__ views
|.. |.. |.. |-- accounts.html
|.. |.. |__ services
|.. |.. |.. |-- accounts.js
|.. |__ payments
|__ [and so on]
```

```
/* by feature */
|__ app
|.. |__ accounts
|.. |.. |-- accountsCtrl.js
|.. |.. |-- accounts.html
|.. |.. |-- accountsSvc.js
|.. |__ payments
|.. |.. |-- paymentsCtrl.js
|.. |.. |-- payments.html
|.. |.. |-- paymentsSvc.js
|__ [and so on]
```


[<< Back to contents](#table-of-contents)

## Debugging

**Use the unminified version of AngularJS for development.** Otherwise your error messages will be nearly useless.

Avoid `console.log()`. Prefer `$log.debug()`. To use `$log`, inject it as you would any other dependency. 

By using the built-in `$logProvider`, you can easily enable logging for your entire application.

```javascript
/* app.js */
angular.module('app')
    .config(function($logProvider) {
        $logProvider.debugEnabled(true);
    });
```

[<< Back to contents](#table-of-contents)

## Build tools and transpilation

[AngularJS 1.x](http://www.angularjs.org)

[<< Back to contents](#table-of-contents)

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

[<< Back to contents](#table-of-contents)

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

[<< Back to contents](#table-of-contents)

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

[<< Back to contents](#table-of-contents)

## Directives

[<< Back to contents](#table-of-contents)

## Routing

[<< Back to contents](#table-of-contents)

## Cordova integration

[<< Back to contents](#table-of-contents)

## References

[John Papa's Angular Style Guide](https://github.com/johnpapa/angular-styleguide)
[John Papa's PluralSight course AngularJS Patterns: Clean Code](https://app.pluralsight.com/library/courses/angularjs-patterns-clean-code/table-of-contents)  
[Todd Motto's Angular styleguide](https://github.com/toddmotto/angular-styleguide)  
[Cory House's React Slingshot](https://github.com/coryhouse/react-slingshot)
[ECMAScript 6 in WebStorm: Transpiling](http://blog.jetbrains.com/webstorm/2015/05/ecmascript-6-in-webstorm-transpiling/)

[<< Back to contents](#table-of-contents)
