<script>
  import FinishedTopic from "$lib/components/FinishedTopic.svelte";
  import { goto } from "$app/navigation";

  let {questionsObjList, removeCorrectQuestions = false} = $props();

  let optionAButton, optionBButton, optionCButton, optionDButton;
  const rightAnswerColor = "#8cd900";
  const wrongAnswerColor = "#ff7d7d";
  const defaultAnswerColor = "#564B8F";
  const xpAmountGain = 75;
  const xpAmountLoss = 25;
  const noOfQuestions = questionsObjList.length;

  let updatedQuestionsObjList = $state(questionsObjList);

  let currentIndex = $state(0);
  let questionObj = $derived(updatedQuestionsObjList[currentIndex]);

  let isOptionClicked = $state(false);
  let isFinished = $state(false);

  function addToMistakeList(questionObj) {
    let mistakedQuestionsObjList = JSON.parse(localStorage.getItem("mistakedQuestionsObjList"));
    mistakedQuestionsObjList.push(questionObj);
    localStorage.setItem("mistakedQuestionsObjList", JSON.stringify(mistakedQuestionsObjList));
  }

  function removeFromMistakeList(questionObj) {
    if (removeCorrectQuestions) {
      let mistakedQuestionsObjList = JSON.parse(localStorage.getItem("mistakedQuestionsObjList"));
      mistakedQuestionsObjList = mistakedQuestionsObjList.filter(item => item.question !== questionObj.question);
      localStorage.setItem("mistakedQuestionsObjList", JSON.stringify(mistakedQuestionsObjList));
    }
  }

  let xpGained = 0;
  function changeXP(param) {
    if (param === 1) {
      xpGained += xpAmountGain;
    }
    else {
      if (xpGained > xpAmountLoss) xpGained -= xpAmountLoss;
      else xpGained = 0;
    }
  }

  function onOptionClick(button) {
    if (!isOptionClicked) {
      switch (button) {
        case optionAButton:
          if (questionObj.options.a === questionObj.answer) {
            optionAButton.style.backgroundColor = rightAnswerColor;
            removeFromMistakeList(questionObj)
            changeXP(1);
          }
          else {
            optionAButton.style.backgroundColor = wrongAnswerColor;
            updatedQuestionsObjList.push(questionObj);
            addToMistakeList(questionObj);
            changeXP(0);
          }
          break;
        case optionBButton:
          if (questionObj.options.b === questionObj.answer) {
            optionBButton.style.backgroundColor = rightAnswerColor;
            removeFromMistakeList(questionObj)
            changeXP(1);
          }
          else {
            optionBButton.style.backgroundColor = wrongAnswerColor;
            updatedQuestionsObjList.push(questionObj);
            addToMistakeList(questionObj);
            changeXP(0);
          }
          break;
        case optionCButton:
          if (questionObj.options.c === questionObj.answer) {
            optionCButton.style.backgroundColor = rightAnswerColor;
            removeFromMistakeList(questionObj)
            changeXP(1);
          }
          else {
            optionCButton.style.backgroundColor = wrongAnswerColor;
            updatedQuestionsObjList.push(questionObj);
            addToMistakeList(questionObj);
            changeXP(0);
          }
          break;
        case optionDButton:
          if (questionObj.options.d === questionObj.answer) {
            optionDButton.style.backgroundColor = rightAnswerColor;
            removeFromMistakeList(questionObj)
            changeXP(1);
          }
          else {
            optionDButton.style.backgroundColor = wrongAnswerColor;
            updatedQuestionsObjList.push(questionObj);
            addToMistakeList(questionObj);
            changeXP(0);
          }
          break;
      }
    }
    isOptionClicked = true;
  }
</script>

<main>
  <div class="container">
    <div class="question">{questionObj.question}</div>
    <div class="options-container">
      <button bind:this={optionAButton}
      onclick={() => onOptionClick(optionAButton)}
      >(A) {questionObj.options.a}</button>
      <button bind:this={optionBButton}
      onclick={() => onOptionClick(optionBButton)}
      >(B) {questionObj.options.b}</button>
      <button bind:this={optionCButton}
      onclick={() => onOptionClick(optionCButton)}
      >(C) {questionObj.options.c}</button>
      <button bind:this={optionDButton}
      onclick={() => onOptionClick(optionDButton)}
      >(D) {questionObj.options.d}</button>
    </div>
  </div>
  <div class="nav-button-container">
    {#if isOptionClicked}
      <button class="primary-button next-button" class:remove={currentIndex === updatedQuestionsObjList.length - 1} onclick={() => {
        if (currentIndex < updatedQuestionsObjList.length - 1) {
          currentIndex += 1;
        }
        isOptionClicked = false;
        optionAButton.style.backgroundColor = defaultAnswerColor;
        optionBButton.style.backgroundColor = defaultAnswerColor;
        optionCButton.style.backgroundColor = defaultAnswerColor;
        optionDButton.style.backgroundColor = defaultAnswerColor;
      }}>Next</button>
      <button class="primary-button finish-button"
       class:remove={currentIndex !== updatedQuestionsObjList.length - 1}
       onclick={() => {isFinished = true}}
       >Finish</button>
    {/if}
  </div>
  {#if isFinished}
    <FinishedTopic xpGained={xpGained} noOfQuestions={noOfQuestions}></FinishedTopic>
  {/if}
</main>

<style>
  main {
    height: 100vh;
  }

  .container {
    position: fixed;
    top: 0;
    bottom: 10rem;
    left: 1rem;
    right: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .question {
    font-size: 2rem;
    text-align: center;
    font-weight: 700;
  }

  .options-container {
    display: grid;
    grid-template-columns: auto auto;
    row-gap: 1rem;
    column-gap: 1rem;
  }

  .options-container button {
    background-color: var(--card-color);
    height: 5rem;
    border: none;
    border-radius: 1rem;

    font-size: 1.75rem;
  }

  .options-container button:hover {
    background-color: var(--light-background-color);
  }

  .nav-button-container {
    position: fixed;
    bottom: 1.5rem;
    left: 1rem;
    right: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .remove {
    display: none;
  }
</style>