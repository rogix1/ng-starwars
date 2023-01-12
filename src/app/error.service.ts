import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommonErrorHandler implements ErrorHandler {
  constructor(private router: Router) {}

  async handleError(error: unknown) {
    console.error(error);
    await this.router.navigate(['']);
  }
}
