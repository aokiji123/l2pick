export type Rate = {
  footer_description: string;
  h1_tag: string;
  h2_tag: string;
  id: number;
  meta_description: string;
  meta_title: string;
  name: string;
  slug: string;
};

export type RatesResponse = {
  data: Rate[];
};
