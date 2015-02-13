angular.module('w4w.controllers', [])

.controller('AppCtrl', function($scope,$rootScope,$ionicModal, $timeout,$ionicLoading,$location) {

        $scope.onDragDown = function(){
         
        }

        $scope.onSwipeRight = function(){
          
          $location.path("/app/posts");
        }

       $rootScope.show = function() {
        $ionicLoading.show({
          template: '  <i class="icon ion-loading-c" ></i> Loading....'
                 });
          };

      $rootScope.hide = function(){
        $ionicLoading.hide();
      };

      $rootScope.init = function () {
        alert('hello')
        console.log('yess');
      };
            
        //$rootScope.show();

  // Form data for the login modal
          $scope.loginData = {};

          // Create the login modal that we will use later
          $ionicModal.fromTemplateUrl('templates/about.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modal = modal;
          });

          // Triggered in the login modal to close it
          $scope.closeAbout = function() {
            $scope.modal.hide();
          };

          // Open the login modal
          $scope.about = function() {
            $scope.modal.show();
          };

          // Perform the login action when the user submits the login form
          $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
              $scope.closeLogin();
            }, 1000);
          };
})

.controller('PostsCtrl', function($scope,$rootScope,$http) {
//4411855148943918884
    var url = $rootScope.settings.Postsapi+$rootScope.settings.BlogID
        url+= '/posts?orderBy='+$rootScope.settings.OrderBy
        url+= '&fetchBodies='+$rootScope.settings.FetchBodies
        url+= '&view=READER&fetchImages='+$rootScope.settings.FetchImages
        url+= '&maxResults='+$rootScope.settings.PostsNo
        url+= '&status=live&key='+$rootScope.settings.ApiKey


   $http
      .get( url , {cache: true})
      .then(function(response) {
          $scope.posts = response.data.items;
          $scope.PostsLoaded = true;
          console.log($scope.Postsloaded);
          //console.log($scope.post);
          /*window.localStorage.setItem("posts", JSON.stringify(response.data));
          $scope.a = JSON.parse(window.localStorage.getItem("post"));
          console.log(a);*/
        })

})

.controller('PostCtrl', function($scope,$rootScope,$http,$stateParams) {

      var url2 = $rootScope.settings.Postsapi+$rootScope.settings.BlogID
          url2 += '/posts/'+$stateParams.postId
          url2 += '?view=READER&fetchImages='+$rootScope.settings.FetchImages
          url2 += '&key='+$rootScope.settings.ApiKey

     $http
      .get( url2, {cache: true})
      .then(function(response) {
          $scope.post = response.data;
          $scope.Postloaded = true;
          $scope.hide;
          /*window.localStorage.setItem("post", JSON.stringify(response.data));*/
          })

})

.controller('PostCtrl11', function($scope,$rootScope,$http,$stateParams) {
      var url2 = $rootScope.settings.Postsapi+$rootScope.settings.BlogID
      url2 += '/posts/'+$stateParams.postId
      url2 += '?view=READER&fetchImages='+$rootScope.settings.FetchImages
      url2 += '&key='+$rootScope.settings.ApiKey

     $http
      .get( url2, {cache: true})
        .success(function(response) {
          $scope.post = response.data;
          $scope.Postloaded = true;
          $scope.hide;
          window.localStorage.setItem("post", JSON.stringify(response.data));
        })
        .error(function(response) {
            if(window.localStorage.getItem("post") !== undefined) {
                $scope.post = JSON.parse(window.localStorage.getItem("post"));
            }
        });
});
