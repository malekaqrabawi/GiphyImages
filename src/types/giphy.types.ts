export interface GifImageRendition {
  url: string;
  width: string;
  height: string;
}

export interface GifImages {
  original: GifImageRendition;
  fixed_width: GifImageRendition;
}

export interface GifItem {
  id: string;
  title: string;
  slug: string;
  url: string;
  type: string;
  images: GifImages;
}

export interface GiphyApiResponse {
  data: GifItem[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}
