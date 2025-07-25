<script>
  import { onMount } from "svelte";
  import Questions from "$lib/components/Questions.svelte";
  import { goto } from "$app/navigation";

  let mistakedQuestionsObjList = JSON.parse(localStorage.getItem("mistakedQuestionsObjList"));
</script>

{#if mistakedQuestionsObjList.length}
  <Questions questionsObjList={mistakedQuestionsObjList} removeCorrectQuestions={true}/>
{:else}
  <main>
    <h2>You have no mistakes to worry about</h2>
    <button class="primary-button"
    onclick={() => {
      goto("/home")
    }}>Home page</button>
  </main>

  <style>
    main {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  </style>
{/if}


