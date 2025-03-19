
export interface Listing {
  id: string;
  title: string;
  description: string;
  budget_range: string;
  duration: string;
  goals: string[];
  user_id: string;
  company?: string;
  companyLogo?: string;
  postedAt?: string;
  partnership_type?: string;
  location?: string;
  target_audience?: string;
  resources_to_share?: string[];
  business_type?: string;
}

export interface ListingCardData {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  description: string;
  budget: string;
  duration: string;
  categories: string[];
  postedAt: string;
  partnership_type: string;
  location?: string;
  target_audience?: string;
  resources_to_share?: string[];
  business_type?: string;
}

export interface ListingFormData {
  title: string;
  description: string;
  budget: string;
  duration: string;
  categories: string[];
  partnership_type: string;
  location?: string;
  target_audience?: string;
  resources_to_share?: string[];
  business_type?: string;
}
