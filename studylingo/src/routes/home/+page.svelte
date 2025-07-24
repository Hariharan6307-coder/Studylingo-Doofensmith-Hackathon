<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { render } from 'svelte/server';
  import { fetchData } from "../../functions/functions";

  let course = "physics" // physics / maths
  let username = $state("")
  let streak = $state()
  let streakData = {
    streakCase: 1 // 0 - Streak is off, 1 - Streak is on, -1 - Streak is broken
  }
  let progress = 42;
  let rank = {
    today: 2,
    weekly: 19
  };

  let rank_today = $state(rank.today);
  let rank_weekly = $state(rank.weekly);

  let isToday = $state(true);
  let selectedRank = $derived.by(() => {
    if (isToday) return rank_today;
    else return rank_weekly;
  });

  onMount(async () => {
    fetchData().then((data) => {
      username = data.user_name;
      streak = data.streak;
    });

    const token = localStorage.getItem("access_token");
    if (!token) {
      goto("/login");
    }

    const res = await fetch("http://localhost:3000/get-user-rankings", {
      headers: {authorization: `Bearer ${token}`}
    });

    const data = await res.json();
    if (!res.ok) {
      goto("/login");
      alert(data.error);
    }
    else {
      rank_today = data.rankingToday;
      rank_weekly = data.rankingWeekly; 
    }
  });


</script>


<main>
  <div class="stats-card-container">
    {#snippet rankIconRenderer(rank)}
      {#if selectedRank == 1}
        <img src="/images/rank-icons/gold-rank-icon.png" alt="">
        <div class="rank-details" style="color: var(--black-text-color);">
          {selectedRank}
        </div>
      {:else if selectedRank == 2}
        <img src="/images/rank-icons/silver-rank-icon.png" alt="">
        <div class="rank-details" style="color: var(--black-text-color);">
          {selectedRank}
        </div>
      {:else if selectedRank == 3}
        <img src="/images/rank-icons/bronze-rank-icon.png" alt="">
        <div class="rank-details" style="color: var(--black-text-color);">
          {selectedRank}
        </div>
      {:else}
        <img src="/images/rank-icons/regular-rank-icon.png" alt="">
        <div class="rank-details" style="color: var(--black-text-color);">
          {selectedRank}
        </div>
      {/if}
    {/snippet}
    <div class="rank-container">
      <div class="mobile-view">
        <button class="rank-card" onclick={() => {
          //isToday = !isToday;
        }}>
          {@render rankIconRenderer(selectedRank)}
        </button>
      </div>
      <div class="desktop-view">
        <div class="button-container">
          <button class="selectable-button" class:selected={isToday} onclick={() => {
            isToday = true;
          }}>Today</button>
          <button class="selectable-button" class:selected={!isToday} onclick={() => {
            isToday = false;
          }}>Weekly</button>
        </div>
        <div class="rank-contents">
          <div class="rank-icon">
            {@render rankIconRenderer(selectedRank)}
          </div>
          <div class="user-name">{username}</div>
        </div>
      </div>
    </div>
    
    <div class="streak-card">
      {#if streakData.streakCase == 1}
        <img src="/images/stats-icons/streak-icon.png" alt="">
      {:else if streakData.streakCase == 0}
        <img src="/images/stats-icons/streak-off-icon.png" alt="">
      {:else if streakData.streakCase == -1}
        <img src="/images/stats-icons/streak-break-icon.png" alt="">
      {/if}
      <div class="streak-card-details mobile-view">
        <div class="streak-number">{streak}</div>
        <div class="streak-text">Days Streak</div>
      </div>
      <div class="streak-card-data desktop-view">
        <div class="streak-number-title">{streak} Days Streak</div>
        <div class="streak-message">This will be good message motivating the user to keep the streak going</div>
      </div>
    </div>
  </div>
  <div class="course-container">
    <a href="/learning-path?course={course}" class="learning-path-link">
      <img src="/images/course-icons/{course}-icon.png" alt="">
    </a>
    <div class="course-text">{course}</div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: {progress}%">
      </div>
    </div>
    <a href="/learning-path?course={course}">
      <button class="primary-button start-button">START</button>
    </a>
  </div>
</main>


<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .course-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .learning-path-link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    max-width: 21.875rem;
  }

  .learning-path-link img {
    width: 100%;
  }

  .progress-bar {
    width: 80%;
    max-width: 31.25rem;
    height: 1.5rem;
    background-color: var(--card-color);
    border-radius: 99999px;
    margin-bottom: 2rem;
  }

  .progress-fill {
    height: 100%;
    background-color: var(--white-text-color);
    border-radius: 999999px;
  }

  .course-text {
    font-size: 2.7rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .start-button {
    font-size: 2.5rem;
    width: 15rem;
  }

  .stats-card-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 7rem;
  }

  .rank-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .desktop-view {
    display: none;
  }

  .rank-card {
    background-color: rgb(0, 0, 0, 0);
    height: 100%;
    border: none;
    margin-right: 2rem;
    position: relative;
  }

  .rank-details {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.5rem;
    padding-bottom: 1rem;
    font-weight: 800;
  }

  .mobile-view {
    height: 100%;
  }

  .rank-card img {
    height: 100%;
  }

  .streak-card {
    background-color: var(--primary-button-color);
    height: 100%;
    width: 70%;
    max-width: 15.6rem;
    border-radius: 1rem;
    padding-right: 1rem;
    display: flex;
  }

  .streak-card img {
    height: 75%;
  }

  .streak-card-details {
    padding: 0.5rem;
    font-weight: 700;
    font-size: 1rem;
  }

  .streak-number {
    font-size: 3rem;
    font-weight: 700;
  }

  @media screen and (min-width: 1000px) {
    main {
      flex-direction: row;
      align-items: flex-start;
      width: 100%;
    }

    .stats-card-container {
      height: 50rem;
      order: 2;
      flex: 1;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .mobile-view {
      display: none;
    }

    .rank-container {
      height: 15rem;
      width: 100%;
      margin-bottom: 2rem;
    }

    .rank-container .desktop-view {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: var(--card-color);
      border-radius: 2rem;
    }

    .button-container {
      height: 30%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .rank-contents {
      height: 70%;
      display: flex;
      align-items: center;
    }

    .rank-icon {
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0rem 2rem;
    }

    .rank-icon .rank-details{
      padding-bottom: 1.5rem;
    }

    .rank-icon img {
      height: 70%;
    }

    .rank-contents .user-name {
      font-size: 2rem;
      font-weight: 700;
      padding-bottom: 1rem;
    }

    .course-container {
      order: 1;
      flex: 2;
      margin-top: 0;
    }

    .learning-path-link {
      width: 100%;
      max-width: 350px;
    }

    .streak-card {
      height: 14rem;
      width: 100%;
      max-width: unset;
      padding-right: unset;
      border-radius: 2rem;
    }

    .streak-card img {
      height: 50%;
    }

    .streak-card-data.desktop-view {
      padding-top: 2.5rem;
      padding-left: 1rem;
      display: flex;
      flex-direction: column;
    }

    .streak-number-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .streak-message {
      font-size: 1.5rem;
      font-weight: 500;
      padding: 0rem 1rem 0rem 0rem;
    }
  }

  @media screen and (min-width: 1400px) {
    main {
      width: 100%;
    }
  }
</style>


