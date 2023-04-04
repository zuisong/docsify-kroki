declare global {
  interface DocsifyConfig {
    kroki?: DocsifyKrokiOption;
  }
}
export interface DocsifyKrokiOption {
  serverPath?: string;
  langs?: string[];
}
