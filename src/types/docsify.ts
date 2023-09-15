declare global {
  interface Window {
    $docsify?: Docsify;
  }
}
export interface Docsify {
  plugins?: DocsifyPlugin[];
}
export type DocsifyHooks = {
  // Invoked one time when docsify script is initialized.
  init(initHook: VoidFunction): void;

  // Invoked one time when the docsify instance has mounted on the DOM
  mounted(mountedHook: VoidFunction): void;

  // Invoked on each page load before new markdown is transformed to HTML.
  //
  // For asynchronous tasks, the hook function accepts a next callback as a second argument.
  // Call this function with the final markdown value when ready. To prevent errors from
  // affecting docsify and other plugins, wrap async code in a try/catch/finally block.
  beforeEach(beforeEachHook: BeforeEachHook): void;

  // Invoked on each page load after new markdown has been transformed to HTML.
  //
  // For asynchronous tasks, the hook function accepts a next callback as a second argument.
  // Call this function with the final html value when ready. To prevent errors from
  // affecting docsify and other plugins, wrap async code in a try/catch/finally block.
  afterEach(afterEachHook: AfterEachHook): void;

  // Invoked on each page load after new HTML has been appended to the DOM
  doneEach(doneEachHook: VoidFunction): void;

  // Invoked one time after rendering the initial page
  ready(readyHook: VoidFunction): void;
};

export type BeforeEachHook =
  | ((markdown: string, next: (markdown: string) => void) => void)
  | ((markdown: string) => string);

export type AfterEachHook =
  | ((html: string, next: (html: string) => void) => void)
  | ((html: string) => string);

declare global {
  export interface DocsifyConfig {
    // Scrolls to the top of the screen when the route is changed.
    auto2top?: boolean;

    // Base path of the website. You can set it to another directory or another domain name.
    basePath?: string;

    [key: string]: unknown;
  }
}
export interface DocsifyVM {
  config?: DocsifyConfig;
}

export interface DocsifyPlugin {
  (hook: DocsifyHooks, vm: DocsifyVM): void;
}
