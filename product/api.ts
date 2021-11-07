import axios from 'axios';
import Papa from 'papaparse';

import { Product } from './types';

const api = {
  getProducts: async (): Promise<Product[]> => {
    return axios
      .get(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5OVvUu3-cRCPUaDRXpbV0tG8sa1IAaxx_OcVgpqLXfgMH6uyrn4trPzXk11dbdyG8IMVhkWFFx7G2/pub?output=csv',
        { responseType: 'blob' }
      )
      .then((response) => {
        // Papaparse does not use Promises, so we create a new one to use it.
        return new Promise<Product[]>((resolve, reject) => {
          Papa.parse(response.data, {
            header: true,
            complete: (results) => {
              const products = results.data as Product[];
              return resolve(
                products.map((product) => ({
                  ...product,
                  price: Number(product.price),
                }))
              );
            },
            error: (error) => reject(error.message),
          });
        });
      });
  },
};
export default api;
