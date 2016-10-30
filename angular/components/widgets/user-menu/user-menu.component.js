UserMenu.$inject = ['$rootScope']

function UserMenu($rootScope) {
  return {
    link: function UserMenuLink(scope) {
      scope.user = $rootScope.user
      scope.$watch('$root.user',()=>{
        scope.user = $rootScope.user
      })
    },
    templateUrl: 'components/widgets/user-menu/user-menu.component.html',
    restrict: 'AE',
    replace: true
  }
}

export const UserMenuComponent = UserMenu