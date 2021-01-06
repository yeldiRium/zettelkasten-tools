import { RootOptions } from '../RootOptions';

interface NewOptions extends RootOptions {
  template: string;
  'output-directory'?: string;
}

export type {
  NewOptions
};
