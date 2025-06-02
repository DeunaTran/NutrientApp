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
}

// Define the user profile structure
export interface UserProfile {
  cart: Record<string, any>; // You can replace `any` with a more specific cart item type
  created_at: string;
  user_id: string;
  address?: string; // Optional address field
}

// Props for authentication-related components
export interface AuthenticateProps {
  isAuth: boolean;
  setOpenAuthModal: () => void;
  setAuth?: (isAuth: boolean) => void;
  setProfile: (profile: UserProfile | null) => void;
  profile?: UserProfile | null;
  products?: Product[];
  // setCartOpen?: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
