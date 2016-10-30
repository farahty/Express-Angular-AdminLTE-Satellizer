class PostsListController {
    constructor(API, $state) {
        'ngInject';
        this.posts = []
        this.API = API
        this.$state = $state
        this.API.all('posts').getList().then((res) => {
            this.posts = res.plain()
        })
    }

    $onInit() {

    }
    delete(id) {
        swal({
            title              : 'Are you sure?',
            text               : 'You will not be able to recover this data!',
            type               : 'warning',
            showCancelButton   : true,
            confirmButtonColor : '#DD6B55',
            confirmButtonText  : 'Yes, delete it!',
            closeOnConfirm     : false,
            showLoaderOnConfirm: true,
            html               : false
        }, () => {
            this.API.one('posts', id).remove().then(() => {
                swal({
                    title            : 'Deleted!',
                    text             : 'CSS Class has been deleted.',
                    type             : 'success',
                    confirmButtonText: 'OK',
                    closeOnConfirm   : true
                }, () => {
                    this.$state.reload()
                })
            }).catch(()=>{
                swal({
                    title            : 'Error!',
                    text             : 'Error while deleting post.',
                    type             : 'error',
                    confirmButtonText: 'OK',
                    closeOnConfirm   : true
                })
            })
        })
    }
}

export const PostsListComponent = {
    templateUrl: 'components/posts/posts-list/posts-list.component.html',
    controller: PostsListController,
    controllerAs: 'vm',
    bindings: {}
}