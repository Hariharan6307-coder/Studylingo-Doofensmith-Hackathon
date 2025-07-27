<script>
  import * as rive from "@rive-app/canvas";
  import { page } from "$app/stores";
  import { lessons } from "../../data/lessons_questions";
  import { goto } from "$app/navigation";

  let topicId = $page.url.searchParams.get("topicId") || "unknown";

  const lessonsObjList = lessons[topicId];
  let currentIndex = $state(0);
  let canvas;

  $effect(() => {
    if (!canvas) return;

    const riveInstance = new rive.Rive({
      src: `/animations/${topicId}.riv`,
      canvas: canvas,
      artboard: lessonsObjList[currentIndex].animation,
      autoplay: true,
      onLoad: () => {
        riveInstance.resizeDrawingSurfaceToCanvas();
      }
    });

    return () => {
      riveInstance.cleanup();
    }
  });
</script>

<main>
  {#if lessonsObjList}
    <canvas bind:this={canvas}></canvas>
    <div class="explanation-text">{lessonsObjList[currentIndex].text}</div>
    <div class="button-container">
      <button class="primary-button back-button" class:disable={currentIndex === 0} onclick={() => {
        if (currentIndex > 0) {
          currentIndex -= 1;
        }
      }}>Back</button>
      <button class="primary-button next-button" class:remove={currentIndex === lessonsObjList.length - 1} onclick={() => {
        if (currentIndex < lessonsObjList.length - 1) {
          currentIndex += 1;
        }
      }}>Next</button>
      <button class="primary-button finish-button" class:remove={currentIndex !== lessonsObjList.length - 1} onclick={() => {
        goto(`/questions?topicId=${topicId}`);
      }}>Practice Questions</button>
    </div>
  {:else}
    <h1>This topic hasn't been updated yet</h1>
  {/if}
  
</main>

<style>
  main {
    height: 100vh;
    position: relative;
  }

  canvas {
    width: 100%;
    height: 35rem;
  }

  .explanation-text {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    padding: 0rem 1rem;
  }

  .button-container {
    position: absolute;
    bottom: 20px;

    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .back-button {
    margin-left: 1rem;
  }

  .next-button {
    margin-right: 1rem;
  }

  .finish-button {
    margin-right: 1rem;
  }

  .remove {
    display: none;
  }

  .disable {
    visibility: hidden;
  }
</style>