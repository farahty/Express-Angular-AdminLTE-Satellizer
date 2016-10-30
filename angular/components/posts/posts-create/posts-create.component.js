class PostsCreateController{
    constructor(API,toastr,$state){
        'ngInject';
        this.API = API
        this.$state = $state
        this.toastr = toastr
        this.errors = []
    }

    $onInit(){

    }
    submit(){
        this.API.service('posts').post(this.post).then(()=>{
            this.errors = []
            this.toastr.success('Post has been added.','Success',{progressBar :true})
            this.$state.go('app.post_list')
        }).catch((res)=>{
            this.errors = res.data.error.errors
        })
    }
}

export const PostsCreateComponent = {
    templateUrl: 'components/posts/posts-create/posts-create.component.html',
    controller: PostsCreateController,
    controllerAs: 'vm',
    bindings: {}
}