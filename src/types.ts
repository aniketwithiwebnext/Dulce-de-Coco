export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  ingredients: string[];
  nutritionalHighlights: { label: string; value: string }[];
  uses: string[];
  image: string;
}

export interface Recipe {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  prepTime: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatarLetter: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}
