<template>
  <div class="body-background">
    <div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search products..."
      />
    </div>
    <div>
      <label for="sortCategory">Sort by Category:</label>
      <select id="sortCategory" @change="selectCategory">
        <option value="default">Default</option>
        <option value="Chinese manhua">Chinese manhua</option>
        <option value="Japanese manga">Japanese manga</option>
        <option value="Korean manhwa">Korean manhwa</option>
      </select>
      <div class="container">
        <div class="row">
          <div
            class="col-md-6"
            v-for="product in filteredProducts"
            :key="product.BookID"
          >
            <div class="card mb-3">
              <img
                :src="product.Cover"
                class="card-img-top"
                alt="Product Image"
              />
              <div class="card-body">
                <h2 class="card-title">{{ product.Title }}</h2>
                <p class="card-text">Tags: {{ product.Tags }}</p>
                <p class="card-text product-content">
                  Summary: "{{ product.Summary }}"
                </p>
                <p class="card-text">Price: R{{ product.Price }}</p>
                <div class="actions">
                  <AddToCart :product="product" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showModal" class="modal">
        <button @click="addProduct">Upload</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      file: {
        'Chinese Manhua': null,
        'Japanese Manga': null,
        'Korean Manhwa': null,
      },
      searchQuery: '',
      selectedCategory: 'default',
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    products() {
      return this.$store.state.products;
    },
    sortedProducts() {
      if (!this.products) {
        return [];
      }

      const categoryPriority = [
        'Chinese manhua',
        'Japanese manga',
        'Korean manhwa',
      ];

      return this.products.slice().sort((a, b) => {
        const priorityA = categoryPriority.indexOf(a.Category);
        const priorityB = categoryPriority.indexOf(b.Category);

        return priorityA - priorityB;
      });
    },
    filteredProducts() {
      if (!this.products) {
        return [];
      }

      return this.sortedProducts.filter((product) => {
        const titleMatch = product.Title.toLowerCase().includes(
          this.searchQuery.toLowerCase()
        );
        const categoryMatch =
          this.selectedCategory === 'default' ||
          product.Category === this.selectedCategory;
        return titleMatch && categoryMatch;
      });
    },
  },
  methods: {
    showAddProductModal() {
      this.showModal = true;
    },
    handleFileChange(category, event) {
      this.file[category] = event.target.files[0];
    },
    selectCategory(event) {
      this.selectedCategory = event.target.value;
    },
    addProductToCart(product) {
      this.$store.dispatch('addToCart', product);
      this.$store.dispatch('showNotification', 'Product added to cart');
    }, 
    addProduct() {
      const formData = new FormData();
      for (const category in this.file) {
        if (this.file[category]) {
          formData.append(category, this.file[category]);
        }
      }
      // Make an API call to add the product
      this.$axios
        .post('/addProduct', formData)
        .then((response) => {
          console.log('Product added successfully:', response.data);

          this.$store.dispatch('fetchProducts');
          this.showModal = false; // Close the modal after successful addition
        })
        .catch((error) => {
          console.error('Error adding product:', error);
        });
    },
  },
  mounted() {
    this.$store.dispatch('fetchProducts');
  },
};
</script>

<style scoped>
.body-background {
  background-color: rgb(232, 225, 225);
}
.container {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: auto;
  padding-bottom: 5rem;
}

.card {
  background-color: rgb(232, 225, 225);
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}
.card img {
  max-width: 100%;
  height: auto;
}

.actions {
  margin-top: 10px;
}
@media screen and (width > 500px) {
  .product-content {
    overflow-y: scroll;
    height: 10rem;
    scroll-snap-type: y mandatory;
  }
}
</style>
