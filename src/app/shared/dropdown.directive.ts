import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpened = false;

  @HostListener('click') toggleOpen() {
    this.isOpened = true;
  }

  @HostListener('mouseleave') toggleClose() {
    setTimeout(() => this.isOpened = false, 1000);
  }

  constructor() {
  }

}
