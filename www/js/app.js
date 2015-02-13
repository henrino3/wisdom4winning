
angular.module('w4w', ['ionic', 'w4w.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(function($rootScope) {
      $rootScope.settings = {
      Postsapi: 'https://www.googleapis.com/blogger/v3/blogs/',
      BlogID: '5077774434849779704',
      PostsNo :100,
      ApiKey: 'AIzaSyA-fLUyoA2xQQMv2eYthFuyQ27V31mKdUY',
      OrderBy: 'published',
      FetchBodies: 'true',
      FetchImages: 'false',

    };

    })


 .run(function($ionicPlatform) {
     $ionicPlatform.ready(function() {

      

     });
  })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.posts', {
      url: "/posts",
      views: {
        'menuContent': {
          templateUrl: "templates/posts.html",
          controller: 'PostsCtrl'
        }
      }
    })

  .state('app.post', {
    url: "/posts/:postId",
    views: {
      'menuContent': {
        templateUrl: "templates/post.html",
        controller: 'PostCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/posts');
})


.filter('rHtml', function() {
    return function(text) {
      return String(text).replace(/<[^>]+>/g, '');
    }
  })

 .filter('rImg', function() {
    return function(text) {
        return text.replace(/<img\s+[^>]*src="([^"]*)"[^>]*>/, '');
    }
})


