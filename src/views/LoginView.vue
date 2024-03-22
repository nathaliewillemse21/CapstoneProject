
<template>
  <div>
<h3>login page</h3>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style><!-- <template>
  <div>
    <div class="row">
      <div class="col-md-6 offset-md-3">
         <h3>Login {{ firstName }}</h3>
        <hr/>
        <form  @submit.prevent="onLogin()">
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" v-model="email">
            <div class="error" v-if="errors.email">
              {{ errors.email }}
            </div>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password">
            <div class="error"  v-if="errors.password">
              {{ errors.password }}
            </div>
          </div>
          <div class="my-3">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div> -->

    <!-- Your second component -->
    <!-- <div class="container">
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
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { SignupValidations } from '@/services/SignupValidations';

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {},
    }
  },
  methods: {
    onLogin() {
      let validations = new SignupValidations(this.email, this.password);
      this.errors = validations.checkValidations();
      if (Object.keys(this.errors).length > 0) {
        return false;
      }
    },
  },
  computed: {
    ...mapState({
      firstName: state => state.name
    })
  }
};
</script>

<style scoped>

</style>







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
</style> --> -->