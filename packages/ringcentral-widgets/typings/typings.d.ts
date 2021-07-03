/* eslint-disable */
declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module 'thread-loader' {
  const value: any;
  export default value;
  export const warmup: any;
}

declare module 'webpack-bundle-analyzer' {
  export const BundleAnalyzerPlugin: any;
}