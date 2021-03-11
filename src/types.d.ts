declare module "pako/lib/deflate" {
    import {deflate as Deflate} from "pako";
    export var deflate: typeof Deflate;
}

interface Window {
    Docsify: any;
    $docsify: any
}

interface DocsifyKrokiOption {
    serverPath: string
    langs: string[]
}
