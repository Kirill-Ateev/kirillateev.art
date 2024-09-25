export const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
export const basePath = isDevelopment ? '' : '';
