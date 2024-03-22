<template>
  <div>
   <checkout-view/>
  </div>
</template>

<script>
import axios from 'axios';
import CheckoutView from '@/views/CheckoutView.vue';
export default {
  components: { CheckoutView },
  props: {
    checkoutData: {
      type: Array,
      default: () => []
    }
  },
    methods: {
    
    addToCart() {
      this.$store.dispatch('addToCart', this.product);
      },
    clearCart() {
      this.$store.dispatch('clearCart');
    },
    async addProduct() {
      try {
        await axios.post('/products/addProduct');
        console.log('Product added successfully');
      } catch (error) {
        console.error('Failed to add product to cart:', error);
        throw new Error('Failed to add product to cart: ' + error.message);
      }
    }
  }
};
</script>


<style scoped>
/* Your component styles here */
</style>
