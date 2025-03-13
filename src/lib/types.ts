
// Health Profile Types
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type Genotype = 'AA' | 'AS' | 'SS' | 'AC' | 'SC' | 'CC' | 'Other' | 'Unknown';

export interface ChronicCondition {
  id: string;
  name: string;
  description?: string;
  severity?: 'Mild' | 'Moderate' | 'Severe';
  managementTips?: string[];
}

export interface Biomarker {
  id: string;
  name: string;
  value: number;
  unit: string;
  referenceRange?: { min: number; max: number };
  lastUpdated: Date;
}

export interface DietaryPreference {
  id: string;
  type: 'Preference' | 'Allergy' | 'Intolerance' | 'Religious' | 'Ethical';
  name: string;
  description?: string;
  avoidIngredients?: string[];
}

export interface HealthProfile {
  id: string;
  userId: string;
  bloodGroup?: BloodGroup;
  genotype?: Genotype;
  chronicConditions: ChronicCondition[];
  biomarkers: Biomarker[];
  dietaryPreferences: DietaryPreference[];
  culturalPreferences?: string[];
  updatedAt: Date;
}

// Grocery & Nutrition Types
export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  nutritionalValue?: NutritionalValue;
  healthBenefits?: string[];
  recommendedFor?: string[];
  avoidFor?: string[];
  price?: number;
  image?: string;
  alternatives?: string[];
}

export interface NutritionalValue {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  vitamins?: Record<string, number>;
  minerals?: Record<string, number>;
}

export interface GroceryRecommendation {
  id: string;
  userId: string;
  items: GroceryItem[];
  reasoning: string;
  createdAt: Date;
  expiresAt?: Date;
}

export interface MealPlan {
  id: string;
  userId: string;
  meals: Meal[];
  startDate: Date;
  endDate: Date;
}

export interface Meal {
  id: string;
  name: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  recipe?: Recipe;
  nutritionalValue?: NutritionalValue;
  ingredients: string[];
  preparationTime?: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  ingredients: { name: string; quantity: string }[];
  preparationTime: number;
  nutritionalValue?: NutritionalValue;
  image?: string;
}

// Voice and Chat Interface Types
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  attachments?: any[];
}

export interface Conversation {
  id: string;
  userId: string;
  messages: Message[];
  context?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoiceCommand {
  text: string;
  intent?: string;
  entities?: Record<string, any>;
  confidence?: number;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  healthProfile?: HealthProfile;
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
  currency: string;
  unitSystem: 'metric' | 'imperial';
}
