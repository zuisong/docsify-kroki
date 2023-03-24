declare global {
  interface Window {
    $docsify?: Docsify;
  }
}
export interface Docsify {
  plugins?: DocsifyPlugin[];
}
export interface Hooks {
  init?(initHook: () => void): void;

  // Invoked one time when the docsify instance has mounted on the DOM
  mounted?(mountedHook: () => void): void;

  // Invoked on each page load before new markdown is transformed to HTML.
  // Supports asynchronous tasks (see beforeEach documentation for details).
  beforeEach?(beforeEachHook: (markdown: string) => string): void;

  // Invoked on each page load after new markdown has been transformed to HTML.
  // Supports asynchronous tasks (see afterEach documentation for details).
  afterEach?(afterEachHook: (html: string) => string): void;

  // For asynchronous tasks, the hook function accepts a next callback as a second argument.
  // Call this function with the final markdown value when ready.
  // To prevent errors from affecting docsify and other plugins, wrap async code in a try/catch/finally block.
  afterEach?(
    afterEachHook: AsyncAfterEachHook,
  ): void;

  // Invoked on each page load after new HTML has been appended to the DOM
  doneEach?(doneEachHook: () => void): void;

  // Invoked one time after rendering the initial page
  ready?(readyHook: () => void): void;
}

export interface AsyncAfterEachHook {
  (html: string, next: (html: string) => void): void;
}

export interface DocsifyConfig {
  // Scrolls to the top of the screen when the route is changed.
  auto2top?: boolean;

  // Base path of the website. You can set it to another directory or another domain name.
  basePath?: string;

  [key: string]: unknown;
}

export interface DocsifyVM {
  config?: DocsifyConfig;
}

export interface DocsifyPlugin {
  (hook: Hooks, vm: DocsifyVM): void;
}
