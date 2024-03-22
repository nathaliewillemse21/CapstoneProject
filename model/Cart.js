import { connection as db } from '../config/index.js';

class Cart {
  async addProduct(productData) {
    try {
      const qry = `
                INSERT INTO Cart
                SET ?`;

      await new Promise((resolve, reject) => {
        db.query(qry, productData, (err) => {
          if (err) {
            console.error('Error adding product to cart:', err);
            reject(err);
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      throw new Error('Failed to add product to cart: ' + error.message);
    }
  }
}

export { Cart };
