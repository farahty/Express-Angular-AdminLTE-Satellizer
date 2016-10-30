export function RoutesConfig($stateProvider, $urlRouterProvider) {
  'ngInject'

  //$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/')

  $stateProvider
  ////////////// main state //////////////////////////////////////
    .state('app', {
      abstract: true,
      views: {
        'layout': {
          templateUrl: 'views/layout.html'
        },
        'navbar@app': {
          templateUrl: 'views/navbar.html'
        },
        'sidebar@app': {
          templateUrl: 'views/sidebar.html'
        },
        'footer@app' : {
            templateUrl: 'views/footer.html'
        },
        'main@app': {},
        'center@app' :{}
      },
      data: {
        bodyClass: 'hold-transition skin-blue sidebar-mini',
        auth : false
      }
    })
    //////////////////////////////// login state //////////////////
    .state('app.login', {
      url: '/login',
      views: {
        'main@app': {},
        'sidebar@app': {},
        'navbar@app': {},
        'footer@app': {},
        'center@app' :{
          template : '<login></login>'
        }
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }, 
    })
     //////////////////////////////// login loader state //////////////////
    .state('app.loader', {
      url: '/loader',
      views: {
        'main@app': {},
        'sidebar@app': {},
        'navbar@app': {},
        'footer@app': {},
        'center@app' :{
          template : '<loader></loader>'
        }
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }, 
    })
    //////////////////////////////// home state ///////////////////// 
    .state('app.home', {
      url: '/',
      data : {auth : true},
      views: {
        'main@app': {
          template: '<home></home>'
        }
      }
    })
    ///////////////////////////////// Post List state //////////////////////
    .state('app.post_list', {
      url: '/posts',
      data : {auth : true},
      views: {
        'main@app': {
          template: '<post-list></post-list>'
        }
      }
    })
    ///////////////////////////////// Post Show state //////////////////////
    .state('app.post_show', {
      url: '/posts/:id',
      data : {auth : true},
      views: {
        'main@app': {
          template: '<post-show></post-show>'
        }
      }
    })
    ///////////////////////////////// Post edit state //////////////////////
    .state('app.post_edit', {
      url: '/posts/:id/edit',
      data : {auth : true},
      views: {
        'main@app': {
          template: '<post-edit></post-edit>'
        }
      }
    })
    ///////////////////////////////// Post Create state //////////////////////
    .state('app.post_create', {
      url: '/posts/create/new',
      data : {auth : true},
      views: {
        'main@app': {
          template: '<post-create></post-create>'
        }
      }
    })
    ///////////////////////////////// about us state //////////////////////
    .state('app.about_us', {
      url: '/about-us',
      data : {auth : true},
      views: {
        'main@app': {
          template: '<about-us title="Nimer Farahty"></about-us>'
        }
      }
    })
    /////////////////////////////// logout satet //////////////////////////
    .state('app.logout', {
      url: '/logout',
      views: {
        'main@app': {
          controller: function ($rootScope, $auth, $state) {
            $auth.logout().then(function () {
              delete $rootScope.user
              $state.go('app.login')
            })
          }
        }
      }
    })


}