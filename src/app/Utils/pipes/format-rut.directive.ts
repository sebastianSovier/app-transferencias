import { Directive, HostListener, ElementRef, OnInit, Input } from '@angular/core';
import { FormatRutPipe } from './format-rut.pipe';



// tslint:disable-next-line: directive-selector
@Directive({ selector: '[formatRut]' })
export class FormatRutDirective implements OnInit {

  @Input() formatRut: string = '';

  maxCharacters = 12;
  prev = '';

  private allowedEvents: Array<number> = [
    8,  // Backspace
    9,  // Tab
    46, // Delete
    36, // Home
    35, // End
    37, // Left
    39, // Right
  ];

  private el: HTMLInputElement;
  private regex = /[^0-9kK]/gi;

  constructor(
    private elementRef: ElementRef,
    private rutPipe: FormatRutPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  /**
   * Reset value on init
   **/
  ngOnInit() {
    if (this.rutPipe.transform(this.el.value)) { return; }
    this.el.value = '';
  }

  /**
   * Android Fallback as keydown is not triggered
   **/
  @HostListener('keyup', ['$event.target.value'])
  onKeyUp(value:string) {
/*
    const cleaned = this.el.value.replace(this.regex, '');
    if (cleaned.length > this.maxCharacters) { return this.el.value = this.prev; } // Validate Max
    this.el.value = cleaned; // Set cleaned value
    if (cleaned !== value) { return; } // on update store last version
    this.prev = this.el.value;*/
  }

  /**
   * On insert new character
   **/
  @HostListener('keydown', ['$event'])
  onInput(event:string) {
  /*  const notMax = event.target.value.length < this.maxCharacters;
    if (this.allowedEvents.indexOf(event.keyCode) !== -1) { return; } // allowed events
    if (this.isRumeric(event) && notMax) { return; }
    event.preventDefault();*/
  }

  /**
   * On focus out format again
   **/
  @HostListener('blur', ['$event.target.value'])
  onBlur(value:string) {
    if (!value) { return; }
    this.el.value = `${this.rutPipe.transform(value)}`;
  }

  /**
   * On Focus Parse, opposite to blur
   **/
  @HostListener('focus', ['$event.target.value'])
  onFocus(value:string) {
    if (!value) { return; }
    this.el.value = this.rutPipe.parse(value);
  }

  /**
   * Check Alphanumeric based on keyCode
   * TODO: DRY w/ Alphanumeric directive
   **/
  isRumeric(ev: { keyCode: number; shiftKey: any; }): boolean {
    // const isAlphabet = ev.keyCode >= 65 && ev.keyCode <= 90;
    const isNumeric = (ev.keyCode >= 48 && ev.keyCode <= 57) ||
      (ev.keyCode === 75) ||
      (ev.keyCode >= 96 && ev.keyCode <= 105) && !ev.shiftKey;
    // const isDashDot = ev.keyCode === 189 || ev.keyCode === 190 ;
    return isNumeric;
  }
}
