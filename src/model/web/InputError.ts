export class InputError {
  hasError: boolean = false;
  errorText: string = '';

  constructor(init?: Partial<InputError>) {
    Object.assign(this, init);
  }

}
