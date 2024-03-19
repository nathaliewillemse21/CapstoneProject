<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(items, BookID) in groupedCheckoutData" :key="BookID">
          <td>{{ BookID }}</td>
          <td>{{ items[0].Title }}</td>
          <td>{{ items.length }}</td>
          <td>R{{ items[0].Price }}</td>
          <td>R{{ calculateTotal(items) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    checkoutData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    groupedCheckoutData() {
      return this.checkoutData.reduce((acc, item) => {
        if (!acc[item.BookID]) {
          acc[item.BookID] = [];
        }
        acc[item.BookID].push(item);
        return acc;
      }, {});
    },
  },
  methods: {
    calculateTotal(items) {
      return items.reduce((total, item) => total + item.Price, 0);
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
