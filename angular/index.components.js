import { RouteBodyClassComponent } from './components/widgets/body-class/route-bodyclass.component'
import {HomeComponent} from './components/home/home.component'
import {LoginComponent} from './components/login/login.component'
import {AboutUsComponent} from './components/about-us/about-us.component'
import { PostsCreateComponent } from './components/posts/posts-create/posts-create.component'
import { PostsEditComponent } from './components/posts/posts-edit/posts-edit.component'
import { PostsListComponent } from './components/posts/posts-list/posts-list.component'
import { PostsShowComponent } from './components/posts/posts-show/posts-show.component'
import { UserMenuComponent } from './components/widgets/user-menu/user-menu.component';

angular.module('app.components')
    .directive('routeBodyclass', RouteBodyClassComponent)
    .component('home' , HomeComponent)
    .component('login' , LoginComponent)
    .component('aboutUs' , AboutUsComponent)
    .component('postCreate' , PostsCreateComponent)
    .component('postEdit' , PostsEditComponent)
    .component('postList' , PostsListComponent)
    .component('postShow' , PostsShowComponent)
    .directive('userMenu' , UserMenuComponent)