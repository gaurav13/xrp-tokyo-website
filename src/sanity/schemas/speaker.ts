export const speaker = {
  name: "speaker",
  title: "Speaker",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "role", title: "Role", type: "string" },
    { name: "company", title: "Company", type: "string" },
    { name: "bio", title: "Bio", type: "text" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "twitter", title: "X (Twitter)", type: "string" },
    { name: "linkedin", title: "LinkedIn", type: "string" },
    { name: "order", title: "Order", type: "number" },
  ],
};
