export class APIService {
    constructor(Restangular, $auth, toastr) {
        'ngInject';
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/x.express.v1+json'
        }

        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer
                .setBaseUrl('/api/')
                .setDefaultHeaders(headers)
                .setRestangularFields({
                    id: '_id'
                })
                .setErrorInterceptor(function (res) {
                    if (res.status === 422) {
                        let msg = res.data.message + ' , ' + res.data.error.message
                        let title = res.data.error.name + ' - Error!'
                        toastr.error(msg, title, {
                            progressBar: true
                        })
                    } else if (res.status === 403) {
                        toastr.error(res.data.message, 'Access Denied', {
                            progressBar: true
                        })
                    }
                })
                .addFullRequestInterceptor(function (element, operation, what, url, headers) {
                    if ($auth.isAuthenticated()) {
                        let token = $auth.getToken()
                        headers.Authorization = 'Bearer ' + token
                    }
                })
                .addResponseInterceptor(function (response) {
                    return response
                })
        })
    }
}