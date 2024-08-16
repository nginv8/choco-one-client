import axios from 'axios';
import config from '@/data/apiConfig';
import { ProductType } from '@/types/DataTypes';
import { createFilterParams, createPaginationParams, createPopulateParams } from '@/utils';

const productListFields = [
  'categories',
  'mainImage',
  'optionSets.title',
  'optionSets.options',
  'longDescriptions.name',
  'longDescriptions.content',
];

const productFields = [
  'categories',
  'optionSets',
  'mainImage',
  'images',
  'optionSets.title',
  'optionSets.options',
  'longDescriptions.name',
  'longDescriptions.content',
];

async function getProductById(id: ProductType['id']) {
  const populate = createPopulateParams(productFields);

  const { data } = await axios.get(`${config.PRODUCTS_URL}/${id}?${populate}`);
  return data;
}

async function getProductsByIds(ids: ProductType['id'][], page: number, pageSize: number) {
  const pagination = createPaginationParams(page, pageSize);
  const populate = createPopulateParams(productListFields);
  const filters = createFilterParams('id', ids);

  const { data } = await axios.get(`${config.PRODUCTS_URL}?${filters}&${populate}&${pagination}`);
  return data;
}

async function getProducts(
  page: number,
  pageSize: number,
  categories: number[],
  signal?: AbortSignal
) {
  const populate = createPopulateParams(productListFields);
  const pagination = createPaginationParams(page, pageSize);
  const categoryFilter = createFilterParams('categories', categories);

  const { data } = await axios.get(
    `${config.PRODUCTS_URL}/?${populate}&${pagination}&${categoryFilter}`,
    { signal }
  );
  return data;
}

export { getProducts, getProductById, getProductsByIds };
