<script>
  import { questions } from "../../data/lessons_questions";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import FinishedTopic from "$lib/components/FinishedTopic.svelte";
  import Questions from "$lib/components/Questions.svelte";

  let topicId = $page.url.searchParams.get("topicId") || "unknown";
  const questionsObjList = questions[topicId];

</script>

<Questions questionsObjList={questionsObjList} />