<script>
  let xp = 2300;
  let gems = 30;
</script>

<div class="top-bar-container">
  <div class="xp-container">
    <img src="images/top-bar-icons/xp-icon.png" alt="">
    <span>{xp}</span>
  </div>
  <div class="gem-container">
    <img src="images/top-bar-icons/gem-icon.png" alt="">
    <span>{gems}</span>
  </div>
</div>

<style>
  .top-bar-container {
    height: 8rem;
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 1rem;

    position: fixed;
    top: 0;
    right: 0;
    left: 0;
  }

  .xp-container {
    height: 2.5rem;
    display: flex;
    align-items: center;
    padding: 0.3rem 1rem 0.3rem 0.4rem;
    font-weight: 700;
    border-radius: 99999px;
    background-color: var(--light-background-color);
  }

  .gem-container {
    height: 2.5rem;
    display: flex;
    align-items: center;
    padding: 0.3rem 1rem 0.3rem 0.4rem;
    font-weight: 700;
    border-radius: 99999px;
    background-color: var(--emerald-green-color);
    margin-left: 1rem;
  }

  .top-bar-container img {
    height: 90%;
  }
</style>