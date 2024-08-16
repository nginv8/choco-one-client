function createPopulateParams(fields: string[]): string {
  return fields.map((field) => `populate=${field}`).join('&');
}

function createPaginationParams(page: number, pageSize: number): string {
  return `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
}

function createFilterParams(field: string, values: (string | number)[]): string {
  if (values.length === 0) return '';
  return values.map((value, index) => `filters[${field}][$in][${index}]=${value}`).join('&');
}

export { createPopulateParams, createPaginationParams, createFilterParams };
