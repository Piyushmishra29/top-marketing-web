export type Service = {
  slug: string;
  title: string;
  blurb: string;
  art: string;
};

export const SERVICES: Service[] = [
  {
    slug: "content-creation",
    title: "Content Creation",
    blurb:
      "Shoots, reels and campaign assets built to be watched. We run the camera, the edit and the calendar so the feed never goes quiet.",
    art: "/art/content-creation.jpg",
  },
  {
    slug: "social-media",
    title: "Social Media Marketing",
    blurb:
      "Strategy, community and publishing that turns a profile into a growth engine. Content people actually stop for.",
    art: "/art/social-media.jpg",
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    blurb:
      "Logos, key visuals and campaign systems. Design that survives contact with a busy feed and a printed hoarding alike.",
    art: "/art/graphic-design.jpg",
  },
  {
    slug: "web-design",
    title: "Website Design & Development",
    blurb:
      "Sites that load fast, look expensive and convert. Built for the phone first, because that is where your customer is.",
    art: "/art/web-design.jpg",
  },
  {
    slug: "cgi",
    title: "CGI",
    blurb:
      "Scroll-stopping CGI reels that put your product somewhere it could never physically be. Made for reach, not for showreels.",
    art: "/art/cgi.jpg",
  },
  {
    slug: "offline-marketing",
    title: "Offline Marketing",
    blurb:
      "Print, outdoor, radio and TV. The formats that still own a city, planned alongside everything happening on the phone.",
    art: "/art/offline-marketing.jpg",
  },
  {
    slug: "influencer",
    title: "Influencer Marketing",
    blurb:
      "750+ micro and 100+ macro creators, briefed and managed. Over a billion in combined reach, and receipts for all of it.",
    art: "/art/influencer.jpg",
  },
  {
    slug: "performance",
    title: "Performance Marketing",
    blurb:
      "Paid media that answers to a number. Leads, conversions and ROI, optimised weekly and reported without spin.",
    art: "/art/performance.jpg",
  },
  {
    slug: "eventing-pr",
    title: "Eventing & PR",
    blurb:
      "Launches, concerts, activations and the press that follows them. From the floor plan to the after-movie.",
    art: "/art/eventing-pr.jpg",
  },
];

export const STATS = [
  { value: 1, suffix: "B+", label: "Combined influencer reach" },
  { value: 750, suffix: "+", label: "Micro creators briefed" },
  { value: 100, suffix: "+", label: "Macro creators partnered" },
  { value: 54, suffix: "", label: "Brands on the wall" },
];

export const CONTACT = {
  instagram: "https://www.instagram.com/topmarketingsolutions.in/",
  handle: "@topmarketingsolutions.in",
  site: "topmarketingsolutions.in",
  founder: "@theonlyparikshit",
  city: "Hyderabad, India",
};
