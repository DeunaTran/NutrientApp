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
