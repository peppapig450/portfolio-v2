interface ImgixLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function imgixLoader({
  src,
  width,
  quality,
}: ImgixLoaderParams): string {
  const url = new URL(`https://personal-portfolio-products.imgix.net${src}`);
  const params = url.searchParams;

  params.set("auto", params.getAll("auto").join(",") || "format");
  params.set("fit", params.get("fit") || "max");
  params.set("w", params.get("w") || width.toString());
  params.set("q", (quality ?? 75).toString());

  return url.href;
}
