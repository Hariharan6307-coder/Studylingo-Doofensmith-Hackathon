<script>
  import { onMount } from "svelte";
  import { badges } from "../../data/badges";
  import { fetchData } from "../../functions/functions";
  
  let updatedBadges = $state();

  onMount(() => {
    fetchData().then((data) => {
      let badgesProgressList = JSON.parse(data.badges);
      updatedBadges = badges;
      for (let i = 0; i < updatedBadges.length; i++) {
        updatedBadges[i].progress = badgesProgressList[i];
      }
    });
  })

</script>

<main>
  <div class="title">BADGES</div>
  <div class="badges-container">
    {#each updatedBadges as badge}
      <div class="badge-card">
        <div class="image-card">
          <img src="{badge.imgSrc}" alt="">
        </div>
        <div class="badge-content">
          <div class="badge-title">{badge.title}</div>
          <div class="badge-description">{badge.description}</div>
          <div class="progress-bar-container">
            <div class="progress-bar">
              <div class="progress-fill" style="width: {badge.progress / badge.target * 100}%"></div>
            </div>
            <div class="progress-counter">{badge.progress} / {badge.target}</div>
          </div>
        </div>
        <div class="gems-card">
          <img src="/images/top-bar-icons/gem-icon.png" alt="">
          <div class="gems-required">{badge.gemsWorth}</div>
        </div>
      </div>
    {/each}
  </div>
</main>

<style>
  main {
    height: 100%;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 700;
    border: solid;
    border-width: 0 0 0.25rem 0;
    border-color: white;
  }

  .badges-container {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr;
  }

  .badge-card {
    position: relative;
    background-color: var(--card-color);
    height: 10rem;
    display: flex;
    align-items: center;
    border-radius: 1rem;
    margin-bottom: 2rem;
  }

  .image-card {
    height: 70%;
    aspect-ratio: 1;
    background-color: var(--light-background-color);

    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    border-radius: 1rem;
  }

  .image-card img {
    height: 80%;
  }

  .badge-content {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    flex: 1;
  }
  
  .badge-title {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .progress-bar-container {
    width: 100%;
    display: flex;
    margin-top: 0.5rem;

    display: flex;
    align-items: center;
  }

  .progress-bar {
    width: 70%;
    height: 1rem;
    background-color: var(--light-background-color);
    margin-right: 0.5rem;
    border-radius: 999999px;
  }

  .progress-fill {
    height: 100%;
    background-color: var(--primary-button-color);
    border-radius: 999999px;  
  }

  .gems-card {
    position: absolute;
    height: 2rem;
    display: flex;
    align-items: center;
    top: 1rem;
    right: 1rem;
  }

  .gems-card img {
    height: 100%;
  }
</style>