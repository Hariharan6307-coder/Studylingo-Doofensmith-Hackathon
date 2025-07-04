<script>
  import { page } from "$app/stores";
  import { courseStructure } from "../../data/course-structure.js"

  let courseName = $page.url.searchParams.get('course') || 'unknown';
  let topicsObjList = courseStructure[courseName].chapter1.topics;
  let topicsList = [];
  let currentTopicId = 104;

  Object.entries(topicsObjList).forEach(([topicNumber, topic]) => {
    topicsList.push(topic)
  })
</script>

<div class="title-box">
  <img src="/images/course-icons/{courseName}-icon.png" alt="">
  <div class="title-description">
    <div class="course-title">{courseName}</div>
    <div class="chapter-name">Electric Currents</div>
  </div>
</div>
<div class="scrollable-learning-path-container">
  <div class="scrollable-learning-path">
    {#each topicsList as topic, index}
      <div class="topic-item" class:odd-one={index % 2 != 0} class:finished={topic.isCompleted} class:current-one={topic.id == currentTopicId}>
        <p>{topic.name}</p>
        <button>{index + 1}</button>
      </div>
    {/each}
  </div>
</div>
<div class="back-button-container">
  <a href="/home">
    <button class="back-button">
      <img src="images/other-icons/back-icon.png" alt="">
    </button>
  </a>
</div>

<style>
  .scrollable-learning-path-container {
    width: 100%;
    position: fixed;
    top: 15rem;

    display: flex;
    justify-content: center;

    overflow-y: auto;
    max-height: calc(100vh - 26rem);
  }

  .scrollable-learning-path {
    width: 90%;
    max-width: 24rem;
    display: flex;
    flex-direction: column;
  }

  .topic-item {
    display: flex;
    font-size: 1.5rem;
    font-weight: 500;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    margin-bottom: 7rem;
  }

  .odd-one {
    text-align: left;
  }

  .odd-one p{
    order: 2;
  }

  .odd-one button {
    order: 1;
  }

  .topic-item button {
    width: 6rem;
    height: 4rem;
    background-color: var(--card-color);
    border: none;
    border-radius: 100%;
    font-size: 2rem;
    font-weight: 700;
    box-shadow: 0 6px 0 var(--dark-background-color);
    transition: transform 0.1s, box-shadow 0.1s;
  }

  .topic-item button:active {
    box-shadow: none;
    transform: translateY(6px);
  }

  .topic-item p {
    width: 70%;
  }

  .finished button {
    background-color: var(--emerald-green-color);
  }

  .current-one button {
    background-color: var(--primary-button-color);
  }

  .back-button-container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 9rem;
    background-color: var(--background-color);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    height: 100%;
  }

  .back-button {
    background-color: var(--card-color);
    height: 50%;
    padding: 1rem 5rem;
    border: none;
    border-radius: 99999px;
    box-shadow: 0 10px 0 var(--dark-background-color);
    transition: transform 0.1s, box-shadow 0.1s;
  }

  .back-button:active {
    box-shadow: none;
    transform: translateY(10px);
  }

  .back-button img {
    height: 100%;
  }

  .title-box {
    width: 100%;
    height: 13rem;
    background-color: var(--card-color);
    text-transform: capitalize;
    font-weight: 700;

    display: flex;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .title-description {
    margin-left: 1rem;
  }

  .title-box img {
    height: 70%;
    margin-left: 1rem;
  }

  .course-title {
    font-size: 1.5rem;
  }

  .chapter-name {
    margin-top: 0.5rem;
    font-size: 2rem;
  }

  @media screen and (min-width: 1000px) {
    .scrollable-learning-path {
      max-width: 40rem;
    }

    .topic-item {
      font-size: 2rem;
    }

    .topic-item button {
      scale: 1.5;
    }

    .title-description {
      display: flex;
      flex-direction: column;
    }

    .course-title {
      order: 2;
    }

    .chapter-name {
      order: 1;
      font-size: 3rem;
    }
  }
</style>