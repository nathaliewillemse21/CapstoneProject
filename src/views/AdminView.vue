<template>
  <div>
    <div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search products..."
      />
      <div>
        <button @click="addProduct" class="addProduct">Add Product</button>
      </div>
    </div>

    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Tags</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.BookID">
            <td>{{ product.Title }}</td>
            <td>{{ product.Tags }}</td>
            <td>R{{ product.Price }}</td>
            <td>
              <div class="actions m-2">
                <button class="delete">Delete</button>
                <button class="edit">Edit</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
      editProduct() { },
    deleteProduct(product) {
      // Implement logic to confirm with the user if they want to delete the product
      const confirmDelete = confirm(`Are you sure you want to delete ${product.Title}?`);
      if (confirmDelete) {
        // Make an API call to delete the product
        // Handle the API response accordingly
      }
    },
    showAddProductModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    handleFileChange(category, event) {
      this.file[category] = event.target.files[0];
    },
    selectCategory(event) {
      this.selectedCategory = event.target.value;
    },
    addProduct() {
      const formData = new FormData();
      for (const category in this.file) {
        if (this.file[category]) {
          formData.append(category, this.file[category]);
        }
      }
      console.log(formData); // Log the form data for debugging (optional)

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
.container {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: auto;
  padding-bottom: 5rem;
}

table {
  width: 70%;
  border-collapse: collapse;
  margin-top: 20px;
  justify-content: center;
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
.actions {
  margin-top: 10px;
}
</style>
