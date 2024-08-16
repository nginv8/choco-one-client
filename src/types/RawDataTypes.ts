type RawCategories = {
  data: RawProductCategory[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
};

type RawProductCategory = {
  id: number;
  attributes: {
    name: string;
  };
};

type RawProductOptionsSet = {
  id: number;
  attributes: {
    title: {
      data: {
        id: number;
        attributes: {
          title: string;
        };
      };
    };
    options: {
      id: number;
      name: string;
      available: boolean;
      price: number;
    }[];
  };
};

type RawImageFormats = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
  alternativeText: string | null;
  path: string | null;
};

type RawImage = {
  id: number;
  attributes: {
    name: string;
    width: number;
    height: number;
    formats: {
      thumbnail: RawImageFormats;
      small: RawImageFormats;
      medium: RawImageFormats;
      large: RawImageFormats;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    provider: string;
    alternativeText: string | null;
    caption: string | null;
    previewUrl: string | null;
  };
};

type RawLongDescription = {
  id: number;
  attributes: {
    name: string;
    content: string;
  };
};

type RawProduct = {
  id: number;
  attributes: {
    name: string;
    price: number;
    currency: string;
    available: boolean;
    shortDescription?: string | null;
    longDescriptions?: {
      data: RawLongDescription[] | null;
    };
    discount?: number | null;
    oldPrice?: number | null;
    categories?: {
      data: RawProductCategory[] | null;
    };
    optionSets?: {
      data: RawProductOptionsSet[] | null;
    };
    mainImage?: {
      data: RawImage | null;
    };
    images?: {
      data: RawImage[] | null;
    };
  };
};

type RawProductList = {
  data: RawProduct[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
};

type RawOrder = {
  id: number;
  createdAt: string;
  status: RawOrerStatus;
  totalPrice: number;
  delivery: string;
  deliveryPrice: number;
  address: string;
  payment: string;
  currency: string;
  comment: string;
  taxes: {
    name: string;
    value: number;
    type: 'percent' | 'fixed';
  }[];
  products: {
    productId: number;
    quantity: number;
    price: number;
    product: {
      id: number;
      name: string;
      price: number;
      available: boolean;
      discount: number | null;
      shortDescription: string | null;
      oldPrice: number | null;
      currency: string;
      mainImage: {
        formats: {
          thumbnail: {
            name: string;
            width: number;
            height: number;
            url: string;
          };
        };
      };
    };
    selectedOptions: {
      optionSetId: number;
      optionId: number;
      optionSetName: string;
      optionName: string;
      optionPrice: number;
    }[];
  }[];
};

type RawOrderList = {
  results: {
    id: number;
    createdAt: string;
    status: RawOrerStatus;
    totalPrice: number;
  }[];
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };
};

type RawOrerStatus = 'Processing' | 'Completed' | 'Canceled' | 'Failed';

type RawSupportData = {
  data: {
    id: number;
    attributes: {
      name: string;
      email: string;
      message: string;
      status: string;
      theme: string;
    };
  };
};

type RawPageData = {
  data: [
    {
      attributes: {
        title: string;
        content: string;
      };
    },
  ];
};

type RawShopData = {
  data: {
    attributes: {
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
  };
};

export type {
  RawProduct,
  RawCategories,
  RawProductCategory,
  RawProductOptionsSet,
  RawImage,
  RawImageFormats,
  RawLongDescription,
  RawProductList,
  RawOrderList,
  RawOrder,
  RawSupportData,
  RawPageData,
  RawShopData,
};
