type ImageFormatsType = {
  width: number;
  height: number;
  url: string;
};

type VieoType = {
  name: string;
  url: string;
  hash: string;
  width: number;
  height: number;
  alternativeText: string | null;
};

type ImageType = {
  name: string;
  url: string;
  hash: string;
  width: number;
  height: number;
  alternativeText: string | null;
  formats: {
    thumbnail: ImageFormatsType;
    small: ImageFormatsType;
    medium: ImageFormatsType;
    large: ImageFormatsType;
  };
};

type LongDescriptionType = {
  name: string;
  content: string;
};

type CategoriesType = {
  data: ProductCategoryType[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
};

type ProductCategoryType = {
  id: number;
  name: string;
};

type ProductOptionSetType = {
  title: string;
  setId: number;
  options: {
    optionId: number;
    name: string;
    price: number;
    selected: boolean;
  }[];
};

type ProductType = {
  id: number;
  name: string;
  price: number;
  currency: string;
  available: boolean;
  shortDescription?: string | null;
  longDescriptions?: LongDescriptionType[] | null;
  oldPrice?: number | null;
  discount?: number | null;
  categories?: ProductCategoryType[] | null;
  optionSets?: ProductOptionSetType[] | null;
  mainImage?: ImageType | null;
  images?: ImageType[] | null;
  videos?: VieoType[] | null;
};

type ProductListType = {
  products: ProductType[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
};

type CartItemType = ProductType & {
  quantity: number;
};

type CreatedOrderSelectedOptionType = {
  optionSetId: number;
  optionSetName: string;
  optionId: number;
  optionName: string;
  optionPrice: number;
};

type CreatedOrderProductType = {
  productId: number;
  quantity: number;
  selectedOptions: CreatedOrderSelectedOptionType[];
};

type CreatedOrderType = {
  email: string;
  totalPrice: number;
  address: string;
  comment: string;
  currency: string;
  delivery: string;
  payment: string;
  products: CreatedOrderProductType[];
};

type ReceivedOrderSelectedOptionType = {
  optionSetId: number;
  optionId: number;
  optionSetName: string;
  optionName: string;
  optionPrice: number;
};

type ReceivedOrderProductType = {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  currency: string;
  shortDescription: string | null;
  selectedOptions: ReceivedOrderSelectedOptionType[];
  mainImage: {
    name: string;
    width: number;
    height: number;
    url: string;
  };
};

type OrderStatusType = 'Processing' | 'Completed' | 'Canceled' | 'Failed';

type ReceivedOrderType = {
  id: number;
  status: OrderStatusType;
  date: string;
  totalPrice: number;
  delivery: string;
  deliveryPrice: number;
  address: string;
  payment: string;
  comment: string;
  currency: string;
  taxes: {
    name: string;
    value: number;
    type: 'percent' | 'fixed';
  }[];
  products: ReceivedOrderProductType[];
};

type OrderListItemType = {
  id: number;
  date: string;
  status: OrderStatusType;
  totalPrice: number;
};

type OrderListType = {
  orders: OrderListItemType[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
};

type SupportRequesType = {
  name: string;
  email: string;
  message: string;
};

type UserDataType = {
  email: string;
  name: string | null;
  address: string | null;
  phone: string | null;
};

type PageDataType = {
  title: string;
  content: string;
};

type ShopDataType = {
  name: string;
  description: string;
  currency: string;
  address: string;
  workingHours: string;
  copyRight: string;
  phones: { phone: string }[];
  emails: { email: string }[];
  payment: {
    name: string;
    description: string;
  }[];
  taxes: {
    name: string;
    value: number;
    type: 'percent' | 'fixed';
  }[];
  delivery: {
    name: string;
    price: number;
  }[];
  socialMedia: {
    name: 'facebook' | 'instagram' | 'twitter';
    link: string;
  }[];
};

export type {
  OrderListItemType,
  OrderListType,
  CreatedOrderType,
  CreatedOrderProductType,
  ReceivedOrderType,
  ReceivedOrderProductType,
  ProductCategoryType,
  CategoriesType,
  ImageType,
  ImageFormatsType,
  ProductType,
  ProductListType,
  ProductOptionSetType,
  CartItemType,
  LongDescriptionType,
  SupportRequesType,
  UserDataType,
  PageDataType,
  ShopDataType,
};
