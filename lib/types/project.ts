export type Project = {
  id: number;
  name: string;
  slug: string;
  average_rating: number;
  reviews_count: number;
  total_votes: number;
  servers?: any[];
};

export type ProjectReview = {
  id: number;
  rating: number;
  comment: string;
  status: string;
  moderated_at: string | null;
  created_at: string;
  updated_at: string;
  user: {
    name: string;
    avatar: string;
  };
};

export type ProjectServer = {
  id: number;
  url_slug: string | null;
  announce_name: string;
  rating_name: string;
  meta_title: string | null;
  meta_description: string | null;
  website_url: string;
  rate: string;
  server_type_id: number;
  launch_date: string;
  short_description: string;
  full_description: string | null;
  logo: string | null;
  votes_count: number;
  weighted_votes: number;
  ranking_position: number;
  rating_stars: number;
  reviews_count: number;
  status: string;
  display_date: string;
  project: Project;
  chronicle: {
    id: number;
    name: string;
    slug: string;
    h1_tag: string | null;
    h2_tag: string | null;
    footer_description: string | null;
    meta_title: string | null;
    meta_description: string | null;
  };
  has_vip_background: boolean;
  has_bold_font: boolean;
  has_vip_icon: boolean;
  created_at: string;
};

export type ProjectDetail = {
  id: number;
  name: string;
  slug: string;
  average_rating: number;
  reviews_count: number;
  total_votes: number;
  reviews: ProjectReview[];
  servers: ProjectServer[];
};

export type ProjectsResponse = {
  data: Project[];
};
