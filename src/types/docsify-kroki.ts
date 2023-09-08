declare global {
  interface DocsifyConfig {
    kroki?: Partial<DocsifyKrokiOption>;
  }
}
export interface DocsifyKrokiOption {
  serverPath: string;
  langs: string[];
}
