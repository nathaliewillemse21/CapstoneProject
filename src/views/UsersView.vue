<template>
  <div>
    <div> <button @click="addUser">Add User</button></div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">LastName</th>
          <th scope="col">Age</th>
          <th scope="col">Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.UserID">
          <td>{{ user.UserID }}</td>
          <td>{{ user.FirstName }}</td>
          <td>{{ user.LastName }}</td>
          <td>{{ user.Age }}</td>
          <td>{{ user.Gender }}</td>
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
    addUser(){
      const newUser = {
        UserID: '',
      FirstName: '',
      LastName: '',
      Age:'' ,
      Gender:''
      }
      this.$store.dispatch('registerNewUser', newUser)
    }
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
