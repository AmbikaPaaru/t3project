import { faker } from '@faker-js/faker';

const generateProductCategory = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.commerce.department()
  };
};

// Function to generate multiple product categories
export const generateProductCategories = (count:number) => {
  const categories = [];
  for (let i = 0; i < count; i++) {
    categories.push(generateProductCategory());
  }
  return categories;
};