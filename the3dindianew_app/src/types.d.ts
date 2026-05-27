declare module '*.css';

declare module 'figma:asset/*' {
  const src: string;
  export default src;
}

declare module 'figma:asset/*.png' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}
