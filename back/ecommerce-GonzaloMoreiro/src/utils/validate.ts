export const validateUser = (user: any): boolean => {
  const validUser =
    user.name && user.email && user.password && user.adress && user.phone;
  return validUser;
};

export const validateProduct = (product: any): boolean => {
  const validProduct =
    product.name &&
    product.description &&
    product.price &&
    product.stock &&
    product.imgUrl;
  return validProduct;
};
