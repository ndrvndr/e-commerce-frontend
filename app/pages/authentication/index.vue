<script setup lang="ts">
definePageMeta({
  middleware: [
    function () {
      return navigateTo('/authentication/login');
    },
  ],
});
</script>
