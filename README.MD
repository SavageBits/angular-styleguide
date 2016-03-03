# AngularJS Styleguide

## Best practices for AngularJS 1.x in ES5 + ES6

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
  1. [Events](#events)
  1. [Testing](#testing)
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

* Editors
  * [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) - **Configure WebStorm for ES6.** *File >> Settings >> Languages & Frameworks >> JavaScript >> JavaScript language version*
  * [Visual Studio Code](https://code.visualstudio.com/)

* Command line
  * PowerShell or Terminal if on MacOS

I also used [Atom](https://atom.io/) extensively but ultimately found it too buggy and RAM-intensive. 

[<< Back to contents](#table-of-contents)

## Foundations of AngularJS

`//@todo: add whys in the form of avoid vs prefer`

**Components should have one role.**  
**DOM manipulation should happen only in directives.**  
**Data and logic operations should be done in services.**  
**Avoid using jQuery.**  
**Create one component per file (applies to modules, controllers, services, directives, etc).**  
  

### File organization best practices  
File organization is based on the **LIFT** principle.  
 * **L**ocate our code easily.
 * **I**dentify code at a glance.
 * **F**lat structure kept as long as possible.
 * **T**ry to stay DRY

Avoid inconsistency. Prefer organizing projects by feature.

```
/* by feature by type */
|__ app  
|.. |__ accounts  
|.. |.. |__ controllers
|.. |.. |.. |-- accounts.js
|.. |.. |__ views
|.. |.. |.. |-- accounts.html
|.. |.. |__ services
|.. |.. |.. |-- accounts.js
|.. |__ payments
|.. |.. |__ controllers
|__ test  
|.. |__ accounts
|.. |.. |__ services
|.. |.. |.. |-- accounts.spec.js
|__ [and so on]
```

```
/* by feature - preferred */
|__ app
|.. |__ accounts
|.. |.. |-- accountsCtrl.js
|.. |.. |-- accounts.html
|.. |.. |-- accountsSvc.js
|.. |.. |-- accountsSvc.spec.js
|.. |__ payments
|.. |.. |-- paymentsCtrl.js
|.. |.. |-- payments.html
|.. |.. |-- paymentsSvc.js
|.. |.. |-- paymentsSvc.spec.js
|__ [and so on]
```
As mentioned in [Testing](#testing), it's common to locate tests in the same directory as the unit-under-test.

### Cross-cutting modules

Modules that are intended for re-use across multiple projects should be located in the `core` directory, which defines its own module in `core.module.js`.

The core module will also define any application-specific dependencies such as `ngRoute`, `ngAnimate`, etc.

The core module is then injected as a dependency into the main app module in `app.module.js`.

### Directives (Components)

Application-specific components that do not belong to a single feature should be located in the 'widgets' directory, which defines its own module in `widgets.module.js`.

The widgets module is then injected as a dependency into the main app module in `app.module.js`.

[<< Back to contents](#table-of-contents)

## Debugging

**Use the unminified version of AngularJS for development.** This will provide the most meaningful error messages.

Avoid `console.log()`. Prefer `$log.debug()`. To use `$log`, inject it as you would any other dependency. 

By using the built-in `$logProvider`, you can easily enable logging for your entire application.

```javascript
/* accountCtrl.js */
function AccountCtrl($rootScope, $log, AccountSvc) {
  var vm = this;
  
  $log.debug('Set $logProvider.debugEnabled(false) in app.config.js to turn this message off');
/* ... */    
```

```javascript
/* app.config.js */
angular.module('app')
    .config(function($logProvider) {
        $logProvider.debugEnabled(true);
    });
```

[<< Back to contents](#table-of-contents)

## Build tools and transpilation

The `gulpfile.js` defines our build script and our transpilation via Babel. There are other tutorials on these tools, so here's what's noteworthy:

* [gulp-ng-annotate](https://www.npmjs.com/package/gulp-ng-annotate) - Injection annotations for uglification protection 
* [gulp-babel](https://www.npmjs.com/package/gulp-babel) - Transpilation from ES5 to ES6
* module-bundle.js - Guarantees that containing modules exist before dependencies that require them. Includes `app.module.js`, all feature modules (`*.module.js`), our cross-cutting components (`core.module.js`), and our application-specific components (`widgets.module.js`)
* bundle.js - all other 1st party JavaScript source

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
/* ES6 accountCtrl.js */
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
/* accountSvc.js */
class AccountSvc {
  constructor($http) {
    this.$http = $http;
  }

  myGetFunction(myApiRoute) {
    return this.$http.get(myApiRoute);
  }

  getAccountById(accountId, successCallback) {
    this.$http.get('/assets/data/accounts.json')
      .then(function(response) {
        for (var i=0; i < response.data.length; i++) {
          if (response.data[i].id == accountId) {
            successCallback(response.data[i]);
            break;
          }
        }
      });
  }
}

angular
  .module('app.accounts')
  .service('accountSvc', AccountSvc);
```

[<< Back to contents](#table-of-contents)

## Directives

In Angular 1.x, the `.directive()` method expects a factory function with specific properties, so there is no direct path from ES5 to ES6 without some really unsavory code.  

That said, here are some good patterns for directives in 1.x.

```javascript
/* accountCard.js */
function AccountCard() {
  return {
    templateUrl: 'app/src/widgets/accountCard/account-card.html'
  }
}

angular
  .module('app.widgets')
  .directive('accountCard', AccountCard);
```

[<< Back to contents](#table-of-contents)

## Routing

Each feature is responsible for handling routing to its own views which reference that feature's controller(s).

```javascript
/* accounts.routes.js */
angular
  .module('app.accounts')
  .config(function($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/src/accounts/account-list.html',
        controller: 'AccountCtrl',
        controllerAs: 'vm'
      })
      .when('/detail/:accountId', {
        templateUrl: '/app/src/accounts/account-detail.html',
        controller: 'AccountDetailCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })
  });
```

[<< Back to contents](#table-of-contents)

## Events

The example injects `$rootScope` and uses `$on` and `$emit` to communicate between controllers using events.

See [headerCtrl.js](https://github.com/SavageBits/angular-styleguide/blob/master/app/src/header/headerCtrl.js) and [accountDetailCtrl.js](https://github.com/SavageBits/angular-styleguide/blob/master/app/src/accounts/accountDetailCtrl.js).

[<< Back to contents](#table-of-contents)

## Testing

We're using [karma](https://karma-runner.github.io), [mocha](https://mochajs.org/), [chai](http://chaijs.com/), and [ngMock](https://docs.angularjs.org/api/ngMock) for testing.

**Run tests.** `npm test`
  * This will start karma and run tests in [PhantomJS](http://phantomjs.org/).  

A typical pattern when organizing a project by feature is to locate tests with units-under-test. In this example, we've located the test for the account service (accountsSvc.spec.js) in the same directory as the account service itself (accountSvc.js).

See [accountSvc.spec.js](https://github.com/SavageBits/angular-styleguide/blob/master/app/src/accounts/accountSvc.spec.js) for an example of mocking out a service along with the AngularJS built-in `$http` to test an async call that returns a promise.



[<< Back to contents](#table-of-contents)

## Cordova integration

[<< Back to contents](#table-of-contents)

## References

[John Papa's Angular Style Guide](https://github.com/johnpapa/angular-styleguide)  
[John Papa's PluralSight course AngularJS Patterns: Clean Code](https://app.pluralsight.com/library/courses/angularjs-patterns-clean-code/table-of-contents)    
[Todd Motto's Angular styleguide](https://github.com/toddmotto/angular-styleguide)  
[Cory House's React Slingshot](https://github.com/coryhouse/react-slingshot)  
[ECMAScript 6 in WebStorm: Transpiling](http://blog.jetbrains.com/webstorm/2015/05/ecmascript-6-in-webstorm-transpiling/)  
[Exploring ES6 Classes In AngularJS 1.x](http://www.michaelbromley.co.uk/blog/350/exploring-es6-classes-in-angularjs-1-x)

[<< Back to contents](#table-of-contents)
