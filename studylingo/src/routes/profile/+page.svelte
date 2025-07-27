<script>
  import { onMount } from "svelte";
  import { fetchData } from "../../functions/functions";
  import { badges } from "../../data/badges";

  let name = $state();
  let totalXP = $state();
  let streak = $state();
  let badgeList = $state();

  let updatedBadgeList = $state([]);

  onMount(() => {
    fetchData().then((data) => {
      name = data.user_name;
      totalXP = data.xp;
      streak = data.streak;
      badgeList = JSON.parse(data.badges);

      for (let i = 0; i < badgeList.length; i++) {
        if (badges[i].target == badgeList[i]) {
          updatedBadgeList.push(badges[i]);
        }
      }
    });
  })
</script>

<main>
  <div class="profile-card">
    <img src="/images/nav-bar-icons/profile-male-icon.png" alt="">
    <div class="profile-contents">
      <div class="username">{name}</div>
      <div class="stats-container">
        <div class="xp-box">
          <img src="/images/top-bar-icons/xp-icon.png" alt="">
          <div class="xp-details">
            <div class="xp-number">{totalXP}</div>
            <div class="xp-text">XP</div>
          </div>
        </div>
        <div class="streak-box">
          <img src="/images/stats-icons/streak-icon.png" alt="">
          <div class="streak-details">
            <div class="streak-number">{streak}</div>
            <div class="streak-text">Days</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="badges-card">
    <div class="heading">Badges</div>
    <div class="badges-container">
      {#each updatedBadgeList as badge}
        <div class="badge-card">
          <img src="{badge.imgSrc}" alt="">
          <div class="badge-title">{badge.title}</div>
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  main {
    height: 100%;
  }

  .badges-card {
    height: 18rem;
    background-color: var(--card-color);
    margin-top: 2rem;
    border-radius: 2rem;
    padding: 1rem;

    display: flex;
    flex-direction: column;
  }

  .badges-container {
    height: 90%;
    display: flex;
    align-items: center;
    overflow-x: hidden;
    overflow-x: auto;
  }

  .badge-card {
    height: 80%;
    aspect-ratio: 1;
    background-color: var(--light-background-color);
    border-radius: 2rem;
    margin-right: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .badge-card img {
    height: 70%;
    aspect-ratio: 1;
    object-fit: contain;
  }

  .badge-title {
    font-weight: 700;
    font-size: 1.5rem;
  }

  .heading {
    font-size: 2rem;
    font-weight: 700;
    border: solid white;
    border-width: 0 0 0.25rem 0;
  }

  .profile-card {
    height: 15rem;
    background-color: var(--card-color);

    display: flex;
    align-items: center;
    border-radius: 2rem;
  }

  .profile-card img{
    width: 50%;
    max-width: 14rem;
  }

  .profile-contents {
    height: 70%;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
  }

  .username {
    flex: 1;
    font-size: 2rem;
    font-weight: 700;
    display: flex;
    align-items: center;
  }

  .stats-container {
    height: 5rem;
    display: flex;
  }

  .xp-box, .streak-box {
    border: solid;
    border-color: white;
    border-width: 1px;
    border-radius: 1rem;
    flex: 1;
  }

  .xp-box, .streak-box {
    display: flex;
    align-items: center;
    text-align: right;
    justify-content: space-between;
    max-width: 14rem;
  }

  .xp-box {
    margin-right: 1rem;
  }

  .xp-box img {
    width: 40%;
    max-width: 3rem;
  }

  .xp-details, .streak-details { 
    margin-right: 0.25rem;
  }

  .xp-number, .streak-number {
    font-weight: 700;
  }

  .xp-text, .streak-text {
    font-size: 0.75rem;
  }

  .xp-number, .xp-text {
    color: #82D2F6;
  }

  .streak-number, .streak-text {
    color: #FFF0BE;
  }

  .streak-box {
    display: flex;
    align-items: start;
    text-align: right;
  }

  .streak-box img {
    max-width: 4rem;
    height: auto;
    object-fit: contain;
  }

  .streak-details {
    margin-top: 1rem;
  }

  @media screen and (min-width: 450px) {
    .xp-details, .streak-details{
      display: flex;
      align-items: center;
    }

    .xp-number, .xp-text, .streak-number, .streak-text {
      font-size: 1.75rem;
      margin-right: 0.5rem;
    }

    .streak-details {
      margin-top: 1.25rem;
    }
  }
</style>