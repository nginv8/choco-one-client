import { config } from '@/api';
import {
  RawProduct,
  RawImage,
  RawImageFormats,
  RawCategories,
  RawProductCategory,
  RawProductOptionsSet,
  RawLongDescription,
  RawProductList,
  RawOrderList,
  RawOrder,
  RawPageData,
  RawShopData,
  ProductType,
  ImageType,
  ImageFormatsType,
  CategoriesType,
  ProductCategoryType,
  ProductOptionSetType,
  LongDescriptionType,
  ProductListType,
  OrderListType,
  PageDataType,
  ShopDataType,
} from '@/types';
import formatDate from './formatDate';
import convertCurrencySign from './convertCurrency';
import { CartItemType, CreatedOrderProductType, ReceivedOrderType } from '@/types/DataTypes';

function transformImageFormatsData(rawData: RawImageFormats): ImageFormatsType {
  return {
    url: `${config.MEDIA_URL}${rawData.url}`,
    width: rawData.width,
    height: rawData.height,
  };
}

function transformImageData(rawData: RawImage): ImageType {
  const img = rawData.attributes;
  return {
    name: img.name,
    url: `${config.MEDIA_URL}${img.url}`,
    hash: img.hash,
    width: img.width,
    height: img.height,
    alternativeText: img.alternativeText,
    formats: {
      thumbnail: transformImageFormatsData(img.formats.thumbnail),
      small: transformImageFormatsData(img.formats.small),
      medium: transformImageFormatsData(img.formats.medium),
      large: transformImageFormatsData(img.formats.large),
    },
  };
}

function transformProductCategoriesData(rawData: RawProductCategory[]): ProductCategoryType[] {
  return rawData.map(({ id, attributes }) => ({
    id,
    name: attributes.name,
  }));
}

function transformCategoriesData(rawData: RawCategories): CategoriesType {
  return {
    data: transformProductCategoriesData(rawData.data),
    pagination: {
      total: rawData.meta.pagination.total,
      page: rawData.meta.pagination.page,
      pageSize: rawData.meta.pagination.pageSize,
      pageCount: rawData.meta.pagination.pageCount,
    },
  };
}

function transformLongDescriptionsData(rawData: RawLongDescription[]): LongDescriptionType[] {
  return rawData.map(({ attributes }) => ({
    name: attributes.name,
    content: attributes.content,
  }));
}

function transformProductOptionSetsData(rawData: RawProductOptionsSet[]): ProductOptionSetType[] {
  if (!rawData || !rawData[0]?.attributes?.title) return [];

  return rawData.map(({ attributes, id }) => ({
    title: attributes.title.data.attributes.title,
    setId: id,
    options: attributes.options.map((rawOption, i) => ({
      selected: i === 0,
      optionId: rawOption.id,
      name: rawOption.name,
      available: rawOption.available,
      price: rawOption.price,
    })),
  }));
}

function transformProductData({ id, attributes }: RawProduct): ProductType {
  const {
    name,
    available,
    currency,
    price,
    oldPrice,
    discount,
    shortDescription,
    longDescriptions,
    mainImage,
    images,
    categories,
    optionSets,
  } = attributes;

  return {
    id,
    name,
    available,
    currency,
    price,
    oldPrice: oldPrice ?? null,
    discount: discount ?? null,
    shortDescription: shortDescription ?? null,
    longDescriptions: longDescriptions?.data
      ? transformLongDescriptionsData(longDescriptions.data)
      : null,
    mainImage: mainImage?.data ? transformImageData(mainImage.data) : null,
    images: images?.data ? images.data.map(transformImageData) : null,
    categories: categories?.data ? transformProductCategoriesData(categories.data) : null,
    optionSets: optionSets?.data ? transformProductOptionSetsData(optionSets.data) : null,
  };
}

function transformProductListData(rawData: RawProductList): ProductListType {
  return {
    products: rawData.data.map(transformProductData),
    pagination: {
      page: rawData.meta.pagination.page,
      total: rawData.meta.pagination.total,
      pageCount: rawData.meta.pagination.pageCount,
      pageSize: rawData.meta.pagination.pageSize,
    },
  };
}

function transformOrderData({
  id,
  status,
  createdAt,
  totalPrice,
  currency,
  delivery,
  deliveryPrice,
  address,
  payment,
  comment,
  products,
  taxes,
}: RawOrder): ReceivedOrderType {
  return {
    id,
    status,
    date: formatDate(createdAt).full,
    totalPrice,
    delivery,
    deliveryPrice,
    address,
    payment,
    comment,
    taxes,
    currency: convertCurrencySign(currency),
    products: products?.map(({ productId, product, price, selectedOptions, quantity }) => ({
      productId,
      quantity,
      price,
      name: product.name,
      currency: convertCurrencySign(product.currency),
      shortDescription: product.shortDescription,
      selectedOptions: selectedOptions.map((option) => ({
        optionSetId: option.optionSetId,
        optionId: option.optionId,
        optionSetName: option.optionSetName,
        optionName: option.optionName,
        optionPrice: option.optionPrice,
      })),
      mainImage: {
        name: product?.mainImage.formats.thumbnail.name,
        width: product?.mainImage.formats.thumbnail.width,
        height: product?.mainImage.formats.thumbnail.height,
        url: `${config.MEDIA_URL}${product?.mainImage.formats.thumbnail.url}`,
      },
    })),
  };
}

function transformOrderListData(rawData: RawOrderList): OrderListType {
  return {
    orders: rawData?.results.map(({ id, createdAt, status, totalPrice }) => ({
      id,
      status,
      date: formatDate(createdAt).date,
      totalPrice,
    })),
    pagination: {
      page: rawData?.pagination.page,
      total: rawData?.pagination.total,
      pageCount: rawData?.pagination.pageCount,
      pageSize: rawData?.pagination.pageSize,
    },
  };
}

function transformPageData(rawData: RawPageData): PageDataType {
  return {
    title: rawData?.data[0]?.attributes?.title,
    content: rawData?.data[0]?.attributes?.content,
  };
}

function transformShopData(rawData: RawShopData): ShopDataType {
  const {
    name,
    description,
    currency,
    phones,
    emails,
    address,
    workingHours,
    copyRight,
    socialMedia,
    taxes,
    delivery,
    payment,
  } = rawData.data.attributes;

  return {
    name,
    description,
    currency,
    phones,
    emails,
    address,
    workingHours,
    copyRight,
    socialMedia,
    taxes,
    delivery,
    payment,
  };
}

function transformCartItemstoOrderItems(cartItems: {
  [id: number]: CartItemType;
}): CreatedOrderProductType[] {
  return Object.values(cartItems).map((item) => ({
    productId: item.id,
    quantity: item.quantity,
    selectedOptions:
      item?.optionSets?.map((optionSet) => ({
        optionSetId: optionSet.setId,
        optionSetName: optionSet.title,
        optionId: optionSet.options.find((option) => option.selected)?.optionId || 0,
        optionName: optionSet.options.find((option) => option.selected)?.name || '',
        optionPrice: optionSet.options.find((option) => option.selected)?.price || 0,
      })) || [],
  }));
}

export default {
  transformProductData,
  transformCategoriesData,
  transformProductCategoriesData,
  transformLongDescriptionsData,
  transformProductOptionSetsData,
  transformImageData,
  transformImageFormatsData,
  transformProductListData,
  transformOrderListData,
  transformOrderData,
  transformPageData,
  transformShopData,
  transformCartItemstoOrderItems,
};
