<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { updateBadge } from "../../functions/functions";

  let { xpGained, noOfQuestions } = $props();

  if (xpGained === noOfQuestions * 75) {
    updateBadge(0,  1);
  }

  onMount(updateXP);

  async function updateXP() {
    const token = localStorage.getItem("access_token");

    if (!token) {
      goto("/login");
      return;
    }

    const res = await fetch(`http://localhost:3000/update-xp?xpGained=${xpGained}`, {
      method: 'PATCH',
      headers: {authorization: `Bearer ${token}`}
    });

    const data = await res.json();
    if (!res.ok) {
      goto("/login");
      alert(data.error)
    }
  }
</script>

<div class="container-page">
  <div class="container">
    <div class="container-title">You have earned</div>
    <div class="xp">{xpGained} XP</div>
    <div class="container-title">in this topic</div>
    <button class="primary-button" onclick={() => {goto("/home")}}>Continue</button>
  </div>
</div>

<style>
  .container-page {
    background-color: var(--background-color);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    width: 80%;
    max-width: 30rem;
    height: 30rem;
    background-color: var(--card-color);
    border-radius: 3rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .container-title {
    font-size: 2rem;
  }

  .xp {
    font-size: 5rem;
    font-weight: 700;
    margin: 1rem 0rem;
  }

  button {
    margin-top: 1rem;
  }
</style>