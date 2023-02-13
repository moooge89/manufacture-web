export class InputError {
  hasError: boolean = false;
  errorText: string = '';

  constructor(init?: Partial<InputError>) {
    Object.assign(this, init);
  }

  clearIfHasError(): void {
    if (!this.hasError) {
      return;
    }

    this.hasError = false;
    this.errorText = '';
  }

  error(text: string): void {
    this.errorText = text;
    this.hasError = true;
  }

}
