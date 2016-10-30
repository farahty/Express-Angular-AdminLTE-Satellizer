class HomeController{
    constructor(){
        'ngInject';
        
    }

    $onInit(){

    }
}

export const HomeComponent = {
    templateUrl: 'components/home/home.component.html',
    controller: HomeController,
    controllerAs: 'vm',
    bindings: {}
}