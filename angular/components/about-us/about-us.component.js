class AboutUsController {
    constructor() {
        'ngInject';
    }

    $onInit() {

    }
    alert() {
        swal(this.title, "You clicked the button!", "success")
    }
}

export const AboutUsComponent = {
    templateUrl: 'components/about-us/about-us.component.html',
    controller: AboutUsController,
    controllerAs: 'vm',
    bindings: {
        title: '@'
    }
}