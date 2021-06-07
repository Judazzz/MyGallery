import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[hssPreventPropagation]'
})
export class PreventPropagationDirective {
    constructor() { }

    @HostListener('click', ['$event'])
    public onClick(event: any): void {
        //  Check if event trigger is enabled or disabled:
        let dropdownDisabled = event.target.parentElement.parentElement.parentElement.classList.contains('ng-select-disabled');
        //  Only prevent event propagation if element is enabled:
        if (!dropdownDisabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
