import { Injectable } from '@angular/core';
import { signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root', // Ensures a singleton instance
})
export class CounterService {
  // Shared signal
  private counterSignal = signal(0);

  // Getter to access the signal
  get counter() {
    return this.counterSignal;
  }

  // Increment the counter
  increment() {
    this.counterSignal.set(this.counterSignal() + 1);
  }

  // Decrement the counter
  decrement() {
    this.counterSignal.set(this.counterSignal() - 1);
  }
}
