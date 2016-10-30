class PostsShowController{
    constructor(API,$stateParams){
        'ngInject';
        this.post = null
        let id    = $stateParams.id
        API.one('posts' , id).get().then((res)=>{
            this.post = res
        })
    }

    $onInit(){

    }
}

export const PostsShowComponent = {
    templateUrl: 'components/posts/posts-show/posts-show.component.html',
    controller: PostsShowController,
    controllerAs: 'vm',
    bindings: {}
}