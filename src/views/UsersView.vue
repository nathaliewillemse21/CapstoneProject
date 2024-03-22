<template>
  <div>
    <div><button @click="addUser">Add User</button></div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">LastName</th>
          <th scope="col">Email</th>
          <th scope="col">Gender</th>
          <th scope="col">Age</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.UserID">
          <td>{{ user.UserID }}</td>
          <td>{{ user.FirstName }}</td>
          <td>{{ user.LastName }}</td>
          <td>{{ user.Email }}</td>
          <td>{{ user.Gender }}</td>
          <td>{{ user.Age }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    async addUser() {
      const newUser = {
        UserID: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Gender: '',
        Age: '',
      };

      try {
        const response = await this.$axios.post('users/register', newUser);
        const { msg } = response.data;
        if (msg) {
          // User added successfully
          this.$store.dispatch('fetchUsers');
          alert('User added successfully:');
          console.log('User added successfully:', newUser);
        } else {
          console.error('Failed to add user:', response.data);
          alert('Failed to add user');
        }
      } catch (error) {
        console.error('An error occurred while adding user:', error);
        alert('An error occurred while adding user');
      }
console.log('addUser');
    },
  },
  mounted() {
    this.$store.dispatch('fetchUsers');
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
