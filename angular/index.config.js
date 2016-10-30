import { RoutesConfig } from './config/routes.config'
import { AuthConfig } from './config/auth.config'
import { LoadingBarConfig } from './config/loading_bar.config'

angular.module('app.config')
    .config(RoutesConfig)
    .config(AuthConfig)
    .config(LoadingBarConfig)