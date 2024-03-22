<template>
  <div>
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
        <LoadingSpinner v-if="isLoading" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
