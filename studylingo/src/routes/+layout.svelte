<script>
  import { page } from "$app/stores";
  import NavBar from "$lib/components/NavBar.svelte";
  import TopBar from "$lib/components/TopBar.svelte";
</script>

{#if $page.url.pathname == "/home" || $page.url.pathname == "/badges" || $page.url.pathname == "/practice" || $page.url.pathname == "/profile"  || $page.url.pathname == "/rankings"}
  <TopBar />
  <style>
    .page-content {
      position: fixed;
      left: 20px;
      right: 20px;
      top: 120px;
      bottom: 80px;
    }

    @media screen and (min-width: 1000px) {
      .page-content {
        bottom: 0px;
        left: 100px;
        right: 20px;
      }
    }

    @media screen and (min-width: 1400px) {
      .page-content {
        left: 260px;
      }
    }
  </style>
{/if}

<div class="page-content">
  <slot />
</div>

{#if $page.url.pathname == "/home" || $page.url.pathname == "/badges" || $page.url.pathname == "/practice" || $page.url.pathname == "/profile"  || $page.url.pathname == "/rankings"}
  <NavBar currentPage = {$page.url.pathname}/>
{/if}

