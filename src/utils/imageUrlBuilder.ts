export default function imgixURLBuilder(src: string, options?: {}) {
  const url = new URL(`https://personal-portfolio-products.imgix.net/${src}`);

  return url.href;
}
