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

</style>