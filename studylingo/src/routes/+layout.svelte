<script>
  import { page } from "$app/stores";
  import NavBar from "$lib/components/NavBar.svelte";
  import TopBar from "$lib/components/TopBar.svelte";
</script>

{#if $page.url.pathname != "/"}
  <TopBar />
{/if}

<div class="page-content">
  <slot />
</div>

{#if $page.url.pathname != "/"}
  <NavBar currentPage = {$page.url.pathname}/>
{/if}

<style>
  .page-content {
    margin-bottom: 6rem;
    height: calc(100vh - 5.625rem);
    width: 100%;
  }

  @media screen and (min-width: 1000px) {
    .page-content {
      margin-left: 10rem;
      height: 100%;
    }
  }

  @media screen and (min-width: 1400px) {
    .page-content {
      margin-left: 25rem;
      height: 100%;
    }
  }
</style>