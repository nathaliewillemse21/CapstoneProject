<template>
  <NavBarView/>
  <main class="container-fluid">
    <router-view/> 
  </main>
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