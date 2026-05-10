import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nirjar Goswami Portfolio",
    short_name: "Nirjar Portfolio",
    description:
      "Portfolio of Nirjar Goswami, Associate Cloud Engineer focused on cloud, security, and software engineering.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
