<template>
  <div class="container">
     <form @submit.prevent="signup">
    <input type="text" v-model="firstName" placeholder="First Name" required>
    <input type="text" v-model="lastName" placeholder="Last Name" required>
    <input type="email" v-model="email" placeholder="Email" required>
    <input type="text" v-model="gender" placeholder="Gender" required>
    <input type="number" v-model="age" placeholder="Age" required>
    <input type="password" v-model="password" placeholder="Password" required>
    <button type="submit">Sign Up</button>
  </form>
  </div>
 
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      age: null,
      password: '',
    };
  },
  methods: {
    async signup() {
      try {
        const response = await axios.post('/signup', {
          UserID: this.UserID,
          firstName: this.FirstName,
          lastName: this.LastName,
          email: this.email,
          gender: this.gender,
          age: this.age,
          password: this.password,
        });
        console.log('Signup successful:', response.data);
        // Redirect the user to the login page or perform other actions as needed
      } catch (error) {
        console.error('Signup failed:', error.response.data.msg);
        // Display an error message to the user
      }
    },
  },
};
</script>
<style scoped>
.container{
  border-style: double;
}
</style>