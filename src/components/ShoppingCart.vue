<template>
  <div>
    <h3>Shopping Cart</h3>
    <ul>
      <li v-for="item in cart" :key="item.BookID">
        {{ item.Title }} - Quantity: {{ item.quantity }} - Price: {{ item.Price }}
        <button @click="removeFromCart(item)">Remove</button>
      </li>
    </ul>
    <p>Total: {{ total }}</p>
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart.cartItems;
    },
    total() {
      return this.cart.reduce((acc, item) => acc + item.Price * item.quantity, 0);
    }
  },
  methods: {
    removeFromCart(item) {
      this.$store.dispatch('removeFromCart', item);
    },
    checkout() {
      axios.post('/checkout', {
        cart: this.cart,
        total: this.total
      })
      .then(response => {
        console.log(response.data);
        // Handle successful payment, update UI, etc.
      })
      .catch(error => {
        console.error('Payment failed:', error);
        // Handle error
      });
    }
  }
};
</script>
