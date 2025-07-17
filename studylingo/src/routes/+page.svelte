<script>
  import { goto } from "$app/navigation";
</script>

<div class="content-wrapper">
  <button class="primary-button login-button" onclick={() => {
    goto("/login");
  }}>LOGIN</button>
</div>


<style>
  .content-wrapper {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-button {
    font-size: 2.25rem;
  }
</style>
