<template>
  <div>
    <h1>Checkout</h1>
    <div v-if="cartData.length === 0">
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.BookID">
            <td>{{ product.Title }}</td>
            <td>{{ product.Price }}</td>
            <td><button @click="processCheckout">Proceed to Checkout</button></td>
          </tr>
        </tbody>
      </table>
      
    </div>
    <div>
      <CartComp :checkoutData="cartItems" @clear-cart="clearCart" />
    </div>
  </div>
</template>

<script>

export default {

  props: {
    cartData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    async processCheckout() {
      try {
        const cart = new cart();
        for (const products of Object.values(this.processCheckout)) {
          await cart.addProduct(products[0]);
          console.log('Checkout process initiated') 
          this.$emit('clear-cart')
        }
        console.log('Checkout process initiated');
        this.$emit('clear-cart');
      } catch (error) {
        console.error('Error processing checkout:', error);
        alert('Failed to process checkout. Please try again later.');
      }
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 2px;
  text-align: center;
}

th {
  background-color: grey;
}
</style>
