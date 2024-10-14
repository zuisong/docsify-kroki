declare interface DocsifyConfig {
  kroki?: Partial<DocsifyKrokiOption>;
}
declare interface DocsifyKrokiOption {
  serverPath: string;
  langs: string[];
}

////

declare interface Docsify {
  plugins?: DocsifyPlugin[];
}
interface DocsifyHooks {
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
}
export type Any = ReturnType<typeof eval>;
declare type AnyFunction<Args extends Any[], Return = Any> = (
  ...args: Args
) => Return;
declare type BeforeEachHook =
  | AnyFunction<[string, AnyFunction<[string], void>], void>
  | AnyFunction<[string], string>;
declare type AfterEachHook =
  | AnyFunction<[string, AnyFunction<[string], void>], void>
  | AnyFunction<[string], string>;

export interface DocsifyVM {
  config?: DocsifyConfig;
}

declare type DocsifyPlugin = (hook: DocsifyHooks, vm: DocsifyVM) => void;

declare global {
  var $docsify: Docsify;
}

declare namespace NodeJS {
  export interface Global {
    $docsify: Docsify;
  }
}

export { type DocsifyHooks, type DocsifyKrokiOption, type DocsifyPlugin };
