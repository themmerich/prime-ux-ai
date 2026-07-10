/**
 * Markdown wird über den esbuild-`text`-Loader (siehe angular.json) als String
 * ins Bundle gezogen — so steht der Artikeltext auch beim Prerendern bereit.
 */
declare module '*.md' {
  const content: string;
  export default content;
}
