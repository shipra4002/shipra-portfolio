/// <reference types="vite/client" />

// Standard Vite asset imports for file types not covered by vite/client.
// Default import resolves to the emitted URL string (hashed in production builds).
declare module "*.docx" {
  const src: string;
  export default src;
}
