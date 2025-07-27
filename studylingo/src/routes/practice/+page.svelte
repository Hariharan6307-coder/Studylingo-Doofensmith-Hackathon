<script>
  import { goto } from "$app/navigation";
    import { onMount } from "svelte";
  import { fetchData } from "../../functions/functions";

  let gems = $state(0);
  onMount(() => {
    fetchData().then((data) => {
    gems = data.gems;
  });
  })
  

</script>
<main>
  <div class="fix-mistakes-card-container">
    <div class="fix-mistakes-card-contents">
      <div class="title">Learn From Your Mistakes</div>
      <div class="content">Revisit and Master the Questions you Struggled with</div>
      <button class="primary-button"
      onclick={() => {
        goto("/mistaked-questions")
      }}>Fix Mistakes</button>
    </div>
    <img src="/images/other-icons/fix-mitakes-icon.png" alt="">
  </div>
  <div class="ai-questions-card-container">
    <div class="title">Boost Your Learning</div>
    <div class="content">Extra problems, extra rewards! Boost your XP, climb the ranks, and master your skills.</div>
    <button class="extra-questions-button"
    onclick={() => {
        if (gems > 10) goto("/ai-questions");
        else alert("Need more gems buddy");
      }}>
      <img src="/images/course-icons/physics-icon.png" alt="">
      <div class="text">Electric Current</div>
      <div class="gems-required-card">
        <img src="/images/top-bar-icons/gem-icon.png" alt="">
        <div class="gems-required">10</div>
      </div>
    </button>
  </div>
</main>

<style>
  main {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .text {
    flex: 1;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .gems-required-card {
    display: flex;
    align-items: center;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .gems-required-card img {
    height: 1rem;
  }

  .ai-questions-card-container {
    flex: 1;
    background-color: var(--card-color);
    border-radius: 2rem;
    margin-bottom: 1rem;
    text-align: center;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .extra-questions-button {
    background-color: var(--card-color);
    flex: 1;
    margin: 1rem 0.5rem 0.5rem 0.5rem;
    border-style: solid;
    border-color: whitesmoke;
    border-width: 1px;
    border-radius: 2rem;
    max-width: 30rem;

    display: flex;
    align-items: center;
    position: relative;
  }

  .extra-questions-button:hover {
    background-color: var(--light-background-color);
  }

  .extra-questions-button > img {
    height: 10rem;
  }

  .fix-mistakes-card-container {
    background-color: var(--card-color);
    display: flex;
    justify-content: space-between;
    height: 40%;
    border-radius: 2rem;
    padding: 1rem 0rem 1rem 2rem;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .fix-mistakes-card-container img {
    width: 30%;
    height: auto;
    object-fit: contain;
    max-height: 15rem;
  }

  .fix-mistakes-card-contents {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .fix-mistakes-card-contents button {
    margin-bottom: 1rem;
  }

  .title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .fix-mistakes-card-contents .content {
    flex: 1
  }

  @media screen and (min-width: 500px) {
    .title {
      font-size: 2.25rem;
    }

    .content {
      font-size: 1.5rem;
    }

    .text {
      font-size: 2rem;
    }
  }
</style>