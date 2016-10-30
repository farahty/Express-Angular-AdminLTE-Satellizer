class LoginController {
    constructor($auth, $state, toastr, $rootScope) {
        'ngInject';
        this.$auth = $auth
        this.$state = $state
        this.toastr = toastr
        this.$roorScope = $rootScope
    }

    $onInit() {

    }
    login() {
        this.$auth.login(this.user).then((res) => {
            this.$auth.setToken(res.data.token)
            this.$roorScope.user = res.data.user
            this.$state.go('app.home')
        }).catch((res) => {
            this.toastr.error(res.data.message, 'Error');
        })
    }
    auth(provider) {
        this.$auth.authenticate(provider).then((res) => {
            this.$auth.setToken(res.data.token)
            this.$roorScope.user = res.data.user
            this.$state.go('app.home')
        }).catch((res) => {
            this.toastr.error(res.data.message, 'Error');
        })
    }
}

export const LoginComponent = {
    templateUrl: 'components/login/login.component.html',
    controller: LoginController,
    controllerAs: 'vm',
    bindings: {}
}