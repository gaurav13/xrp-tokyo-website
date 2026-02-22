import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  // eslint-disable-next-line no-console
  console.warn(
    "Sanity client: Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET.",
  );
}

export const sanityClient = createClient({
  projectId: projectId || "",
  dataset: dataset || "",
  apiVersion: "2026-02-21",
  useCdn: false,
});
