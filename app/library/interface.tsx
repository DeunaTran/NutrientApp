// Define the product structure
export interface Product {
  id: number;
  name: string;
  sale: string;
  price: number;
  img: string;
  img2: string;
  description: string;
  imgList: string[];
  nickname: string;
  introduction: string;
  code: string;
  sideInfo: Record<string, string>;
}
export interface Order {
  id: number;
  created_at: string; // ISO timestamp
  user_id: string;
  cart: Record<string, any>; // You can replace `any` with a more specific type if known
  payment: string;
  cost: number;
  address: string;
  full_name: string;
  phone: string;
  status: string;
  email: string;
  tracking_order_code: string;
}


export interface Review {
  id: number;
  created_at: string; // ISO 8601 format (e.g., "2025-06-06T12:00:00Z")
  user_id: string; // UUID
  product: Record<string, CartItem>; // or define a specific type if product schema is known
  age: number;
  full_name: string;
  height: number;
  weight: number;
  province: string;
  activity: string;
  workout_frequency: string;
  star: number;
  review: string;
  isApproved: boolean;
  title: string;
}

export type User = {
  id: string;
  user_metadata: {
    email?: string;
    phone?: string;
    [key: string]: any;
  };
  [key: string]: any;
};
export type Influencer = {
  full_name: string;
  code: string;
  nickname: string;
}

export interface CartItem {
  quantity: number;
  color: string;
}
// Define the user profile structure
export interface UserProfile {
  cart: Record<string, CartItem>;
  created_at: string;
  user_id: string;
  address?: string; // Optional address field
}


// Props for authentication-related components
export interface AuthenticateProps {
  isAuth: boolean;
  setOpenAuthModal: () => void;
  setAuth?: (isAuth: boolean) => void;
  setProfile: (profile: UserProfile ) => void;
  profile: UserProfile ;
  products?: Product[];
  // setCartOpen?: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
