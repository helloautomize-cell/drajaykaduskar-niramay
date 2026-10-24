import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Niramay Clinics, Nagpur",
    short_name: "Niramay",
    description:
      "Specialist outpatient clinic in Dhantoli, Nagpur: diabetes, heart, obesity and child and adolescent care.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#453e6d",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
