export type Chronicle = {
  id: number;
  name: string;
  slug: string;
  h1_tag: string;
  h2_tag: string;
  footer_description: string;
  meta_title: string;
  meta_description: string;
};

export type ChronicleResponse = {
  data: Chronicle[];
};
