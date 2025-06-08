<script>
import Topbar from "$lib/components/Topbar/Topbar.svelte";
</script>

<style>
  main {
    margin-top: 20px;
    margin-left: 20px;
  }
</style>

<Topbar />

<main>
  <slot />
</main>
