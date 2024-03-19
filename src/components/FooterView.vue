<template>
  <div class="container-fluid">
    <footer class="footer">
      <p>Follow us on social media:</p>
      <p class="lead">Nathalie's Portfolio &copy;{{ currYear }}</p>
      <div class="footer-icons">
        <a href="#" class="footer-icon"><i class="bi bi-facebook"></i></a>
        <a href="#" class="footer-icon"><i class="bi bi-linkedin"></i> </a>
        <a href="#" class="footer-icon"><i class="bi bi-instagram"></i></a>
        <a href="#" class="footer-icon"><i class="bi bi-github"></i></a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: darkgrey;
  color: #fff;
  padding: 10px;
  text-align: center;
}
.footer-icons{
    display: flex;
  justify-content: center;
}

.footer-icon {
  margin: 0 10px;
}

@media (max-width: 768px) {
  .footer {
    padding: 20px;
  }
}


</style>
