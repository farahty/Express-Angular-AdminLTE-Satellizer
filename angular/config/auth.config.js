export function AuthConfig($authProvider) {
  'ngInject'

  $authProvider.httpInterceptor = function () {
    return true
  }

  $authProvider.loginUrl = '/auth/login'
  $authProvider.signupUrl = '/api/auth/register'
  $authProvider.tokenRoot = 'data' // compensates success response macro

  $authProvider.facebook({
    clientId: '351188991889075',
    display: 'popup',
  });
  $authProvider.github({
    clientId: '81c2b18ec7a755be3fea',

  });
}