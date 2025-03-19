
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
}

export interface ListingFormData {
  title: string;
  description: string;
  budget: string;
  duration: string;
  categories: string[];
}
