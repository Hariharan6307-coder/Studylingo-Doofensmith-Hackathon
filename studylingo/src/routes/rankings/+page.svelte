<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { fetchData } from "../../functions/functions";

  let selectedCategory = $state(0); // 0 - Today, 1 - Weekly, 2 - All Time
  let category = $derived.by(() => {
    switch (selectedCategory) {
      case 0:
        return "xp_today";
      case 1:
        return "xp_weekly";
      case 2:
        return "xp";
      default:
        return "xp_today";
    }
  });

  let rankingsObjList = $state([]);
  let userObj = {};

  $effect(async () => {
    const rankingData = await getRankingsData(category);
    const userData = await fetchData();
    rankingsObjList = rankingData;
    userObj = userData;
  })

  async function getRankingsData(category) {
    const res = await fetch(`http://localhost:3000/get-rankings?category=${category}`);

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      goto("/login");
    }
    else {
      return data;
    }
  }
</script>

<main>
  <div class="overall-container">
    <div class="category-container">
      <button class:selected={selectedCategory === 0} onclick={() => selectedCategory = 0}>
        Today
      </button>
      <button class:selected={selectedCategory === 1} onclick={() => selectedCategory = 1}>
        Weekly
      </button>
      <button class:selected={selectedCategory === 2} onclick={() => selectedCategory = 2}>
        All Time
      </button>
    </div>
    <div class="ranks-container">
      {#each rankingsObjList as rankingsObj, index}
        <div class="rank-container" class:selected={rankingsObj.user_id === userObj.user_id}>
          <span class="rank-icon">
            {#if index === 0}
              <img src="/images/rank-icons/gold-rank-icon.png" alt="">
              <span class="rank-number">{index + 1}</span>
            {:else if index === 1}
              <img src="/images/rank-icons/silver-rank-icon.png" alt="">
              <span class="rank-number">{index + 1}</span>
            {:else if index === 2}
              <img src="/images/rank-icons/bronze-rank-icon.png" alt="">
              <span class="rank-number">{index + 1}</span>
            {:else}
              <img src="/images/rank-icons/regular-rank-icon.png" alt="">
              <span class="rank-number">{index + 1}</span>
            {/if}
          </span>
          <span class="username">{rankingsObj.user_name}</span>
          <span class="xp">{rankingsObj[category]} XP</span>
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  main {
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .overall-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    max-width: 50rem;
    flex: 1;
  }

  img {
    height: 85%;
  }

  .rank-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-left: 0.5rem;

    position: relative;
  }

  .rank-number {
    position: absolute;
    color: var(--black-text-color);
    top: 42%;
    left: 55%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    font-weight: 700;
  }

  .username {
    flex: 1;
    padding-left: 2rem;
    font-weight: 700;
  }

  .xp {
    width: 30%;
    text-align: end;
    padding-right: 2rem;
  }

  .category-container {
    background-color: var(--dark-background-color);
    height: 5rem;

    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 2rem;
  }

  .category-container button{
    flex: 1;
    height: 70%;
    background-color: var(--dark-background-color);
    border: none;
    border-radius: 99999px;
    margin: 0px 0.5rem;
    font-weight: 700;
  }

  .category-container button.selected {
    background-color: var(--light-background-color);
  }

  .ranks-container {
    margin-top: 1rem;
    background-color: var(--dark-background-color);
    flex: 1;
    border-radius: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0rem;
    overflow-y: hidden;
    overflow-y: scroll;
  }

  .rank-container {
    background-color: var(--light-background-color);
    width: 90%;
    height: 5rem;
    border-radius: 1.5rem;

    display: flex;
    align-items: center;
    font-size: 1.5rem;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  .selected {
    background-color: var(--primary-button-color);
  }
</style>