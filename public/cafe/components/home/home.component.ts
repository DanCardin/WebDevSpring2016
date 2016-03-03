import {Component, OnInit} from 'angular2/core';
// import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: "home",
    templateUrl: "cafe/components/home/home.view.html",
    // directives: [ACCORDION_DIRECTIVES],
})
export class Home implements OnInit {
    constructor() {}

    ngOnInit() {}
    public oneAtATime:boolean = true;
    public items: Array<string> = ['Item 1', 'Item 2', 'Item 3'];

    public status: Object = {
        isFirstOpen: true,
        isFirstDisabled: false,
    };

    public groups: Array<any> = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];
}
