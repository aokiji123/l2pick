export enum AdvertisementType {
  Background = "background",
  Banner = "banner",
}

export type AdvertisementBackground = {
  id: number;
  alt: string;
  image: string;
  link: string;
  name: string;
  position: number;
  title: string;
  type: AdvertisementType.Background;
};

export type AdvertisementBanner = {
  id: number;
  alt: string;
  image: string;
  link: string;
  name: string;
  position: number;
  title: string;
  type: AdvertisementType.Banner;
};

export type AdvertisementResponse = {
  data: AdvertisementBackground[] | AdvertisementBanner[];
};
