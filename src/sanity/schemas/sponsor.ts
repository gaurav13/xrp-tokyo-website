export const sponsor = {
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    {
      name: "tier",
      title: "Tier",
      type: "string",
      options: {
        list: [
          { title: "Title", value: "title" },
          { title: "Platinum", value: "platinum" },
          { title: "Gold", value: "gold" },
          { title: "Silver", value: "silver" },
          { title: "Bronze", value: "bronze" },
          { title: "Media Partner", value: "mediaPartner" },
          { title: "Education", value: "education" },
          { title: "Community Partner", value: "communityPartner" },
        ],
      },
    },
    { name: "logo", title: "Logo", type: "image", options: { hotspot: true } },
    { name: "website", title: "Website", type: "url" },
    { name: "order", title: "Order", type: "number" },
  ],
};
