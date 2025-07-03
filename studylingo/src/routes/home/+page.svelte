<script>
  let streakData = {
    streak: 27,
    streakCase: 1 // 0 - Streak is off, 1 - Streak is on, 2 - Streak is broken
  }
  let progress = 42;
  let rank = {
    today: 3,
    weekly: 19
  };
  let isToday = $state(true);
  let selectedRank = $derived.by(() => {
    if (isToday) return rank.today;
    else return rank.weekly;
  });
</script>

<main>
  <div class="stats-card-container">
    <button class="rank-card" onclick={() => {
      isToday = !isToday;
    }}> 
      <div class="rank-details">
        <div class="rank">{selectedRank}<sup>
          {#if selectedRank == 1}
            st
          {:else if selectedRank == 2}
            nd
          {:else if selectedRank == 3}
            rd
          {:else}
            th
          {/if}
        </sup></div>
        <div style="font-weight: 500; font-size: 1rem;">
          {#if isToday}
            Today
          {:else}
            Weekly
          {/if}
        </div>
      </div>
    </button>
    <div class="streak-card">
      {#if streakData.streakCase == 1}
        <img src="/images/stats-icons/streak-icon.png" alt="">
      {:else if streakData.streakCase == 0}
        <img src="/images/stats-icons/streak-off-icon.png" alt="">
      {:else if streakData.streakCase == 2}
        <img src="/images/stats-icons/streak-break-icon.png" alt="">
      {/if}
      <div class="streak-card-details">
        <div class="streak-number">{streakData.streak}</div>
        <div class="streak-text">Days Streak</div>
      </div>
    </div>
  </div>
  <div class="course-container">
    <a href="" class="learning-path-link">
      <img src="/images/course-icons/physics-icon.png" alt="">
    </a>
    <div class="physics-text">PHYSICS</div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: {progress}%">
      </div>
    </div>
  </div>
  <button class="primary-button start-button">START</button>
</main>


<style>
  main {
    display: flex;
    height: calc(100% - 11rem);
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }

  .course-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .learning-path-link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    max-width: 21.875rem;
    margin-top: 1rem;
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

  .physics-text {
    font-size: 2.7rem;
    font-weight: 700;
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

  .rank-card {
    background-color: var(--light-background-color);
    height: 100%;
    aspect-ratio: 1;
    border: none;
    border-radius: 50%;
    padding: 0.5rem;
    margin-right: 2rem;
  }

  .rank-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .rank {
    font-size: 2.5rem;
    font-weight: 700;
    padding-left: 0.5rem;
  }

  .rank sup {
    font-size: 1rem;
  }

  .streak-card {
    background-color: var(--primary-button-color);
    height: 100%;
    width: 70%;
    max-width: 15.6rem;
    border-radius: 1rem;

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

</style>


