import { Directive, ElementRef, Input, input, OnInit } from '@angular/core';
import { ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = "red";
  private _errors?: ValidationErrors | null;

  @Input() set colorDecorate(value: string) {
    this._color = value;
    console.log("colorBoru: ", value);
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    console.log("errorBrou: ", value);
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(
    private el: ElementRef<HTMLElement>,
  ) {
    this.htmlElement = el;
    this.htmlElement.nativeElement.innerHTML.replace("Temporal", "adsd")
  }

  ngOnInit(): void {
    console.log("Log del OnInit, brou");
  }

  setStyle(): void {
    if(!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if( !this.htmlElement ) return;
    if( !this._errors ) {
      this.htmlElement.nativeElement.innerHTML = "No hay errores."
      return;
    }
    const errors = Object.keys(this._errors);
    if(errors.includes("required")) {
      this.htmlElement.nativeElement.innerHTML = "Campo requerido brou."
      return;
    }
    if(errors.includes("minlength")) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerHTML = `Verifica el mínimo de ${current}/${min} caracteres`;
      return;
    }
    if(errors.includes("email")) {
      this.htmlElement.nativeElement.innerHTML = "Verifica el mail, brou"
      this._color = "red";
      this.setStyle();
      return;
    }
  }

}
