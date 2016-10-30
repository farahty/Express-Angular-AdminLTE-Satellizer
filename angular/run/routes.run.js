export function runRoutes($rootScope, $state, $timeout, $auth, API) {
    "ngInject";
    $rootScope.user = {
        name: 'loading user ..'
    }

    if ($auth.isAuthenticated()) {
        let id = $auth.getPayload().sub
        API.one('users', id).get().then((res) => {
            $rootScope.user = res.plain()
        }).catch(() => {
            $state.go('app.login')
        })
    }
    $rootScope.$on('$stateChangeStart', (event, toState) => {
        if (toState.data.auth) {
            if (!$auth.isAuthenticated()) {
                event.preventDefault()
                return $state.go('app.login')
            }
        }
    })

    $rootScope.$on('$stateChangeSuccess', () => {
        $timeout(() => {
            /*eslint-disable */
            var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight()
            var window_height = $(window).height()
            var sidebar_height = $('.sidebar').height()
            if ($('body').hasClass('login-page')) {
                $('.content-wrapper, .right-side').css('min-height', 0)
            } else {
                if (window_height >= sidebar_height) {
                    $('.content-wrapper, .right-side').css('min-height', window_height - neg)
                } else {
                    $('.content-wrapper, .right-side').css('min-height', sidebar_height)
                }
            }
            /*eslint-enable */
        })
    })
}