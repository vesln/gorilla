/* @flow */
/* eslint-disable */

declare class describe {
  static (description: string, spec: () => void): void;
  static only(description: string, spec: () => void): void;
  static skip(description: string, spec: () => void): void;
  static timeout(ms: number): void;
}

declare class it {
  static (description: string, spec: () => void): void;
  static only(description: string, spec: () => void): void;
  static skip(description: string): void;
  static timeout(ms: number): void;
}
