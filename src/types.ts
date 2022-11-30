export interface Docsify {
  plugins?: DocsifyPlugin[];
}

declare global {
  interface Window {
    $docsify: Docsify;
  }
}

export interface Hooks {
  afterEach(
    param: (content: string, next: (content: string) => void) => void,
  ): void;

  // afterEach(param: (content: string) => string): void;
}

export interface DocsifyVM {
  config?: {
    kroki?: DocsifyKrokiOption;
  };
}

export interface DocsifyPlugin {
  (hook: Hooks, vm: DocsifyVM): void;
}

export interface DocsifyKrokiOption {
  serverPath: string;
  langs: string[];
}
