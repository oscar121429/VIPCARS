export interface SocialProfile {
  user_id: number;
  name_user: string;
  last_name: string;
  picture_user: string;
  images: string[];
}

export interface OneUserResponse {
  userProfile: SocialProfile;
}

export interface ImageCarouselProps {
  images: string[];
}