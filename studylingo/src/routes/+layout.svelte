<script>
  import { page } from "$app/stores";
  import NavBar from "$lib/components/NavBar.svelte";
</script>

<div class="page-content">
  <slot />
</div>

{#if $page.url.pathname != "/"}
  <NavBar currentPage = {$page.url.pathname}/>
{/if}

<style>
  .page-content {
    padding-bottom: 6rem;
  }

  @media screen and (min-width: 1000px) {
    .page-content {
      padding-left: 10rem;
    }
  }

  @media screen and (min-width: 1400px) {
    .page-content {
      padding-left: 25rem;
    }
  }
</style>