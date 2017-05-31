'use strict';

angular.module('wpappApp')
  .controller('ShellCtrl', function ($mdSidenav, $mdDialog, $scope, $location, Auth, $state) {


    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function () {
      Auth.logout();
      //$location.path('/login');
      $state.go('login');
    };

    $scope.isActive = function (route) {
      return route === $location.path();
    };

    $scope.toggleLeft = function () {
      $mdSidenav('left').toggle();
    };

    var originatorEv;
    $scope.openMenu = function ($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.notificationsEnabled = true;
    $scope.toggleNotifications = function () {
      $scope.notificationsEnabled = !$scope.notificationsEnabled;
    };

    $scope.redial = function () {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .content('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
      );
      originatorEv = null;
    };

    $scope.checkVoicemail = function () {
      // This never happens.
    };

    $scope.showAddDialog = function ($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        templateUrl: 'components/shell/dialog/dialog.html',
        controller: 'DialogController'
      });
    };

    $scope.getProfileImage = function () {
      var user = Auth.getCurrentUser();
      if (user.provider)
        return user[user.provider].image.url;
      else return null;
    }
  });
