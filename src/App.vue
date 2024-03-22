<template>
  <NavBarView />
  <main class="container-fluid">
    <LoadingSpinner v-if="isLoading" />
    <router-view />
  </main>
  <FooterView />
</template>

<script>
import NavBarView from './components/NavbarView.vue';
import FooterView from './components/FooterView.vue';
import LoadingSpinner from '@/components/SpinnerView.vue';
export default {
  components: {
    NavBarView,
    FooterView, LoadingSpinner,
  },

  data() {
    return {
      isLoading: false,
    };
  },
};
</script>
<style src="@/assets/css/style.css"></style>
