class PostsEditController{
    constructor($state , $stateParams ,API ,toastr){
        'ngInject';
        this.API          = API
        this.$stateParams = $stateParams
        this.$state       = $state
        this.toastr       = toastr
        this.post         = null
        this.errors       = []

        let id = $stateParams.id
        this.API.one('posts' , id).get().then((res)=>{
            this.post = res
        })
    }

    $onInit(){

    }
    submit(){
        this.post.put().then(()=>{
            this.errors = []
            this.toastr.success('Post has been Updated.','Success',{progressBar :true})
            this.$state.go('app.post_list')
        }).catch((res)=>{
            this.errors = res.data.error.errors
        })
    }
}

export const PostsEditComponent = {
    templateUrl: 'components/posts/posts-edit/posts-edit.component.html',
    controller: PostsEditController,
    controllerAs: 'vm',
    bindings: {}
}