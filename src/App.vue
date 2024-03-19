<template>
  <NavBarView/>
  <main class="container-fluid">
    <router-view/> 
  </main>
  <div>
    <router-link to="/login">Login</router-link>
    <router-link to="/signup">Sign Up</router-link>
  </div>
  <FooterView/>
</template>

<script>

import NavBarView from './components/NavbarView.vue';
import FooterView from './components/FooterView.vue';

export default {
  components: {
    NavBarView,
    FooterView
  }
}
</script>
<style src="@/assets/css/style.css"></style>