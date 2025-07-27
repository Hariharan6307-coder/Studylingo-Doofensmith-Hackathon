<script>
  import { questions } from "../../data/lessons_questions";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import FinishedTopic from "$lib/components/FinishedTopic.svelte";
  import Questions from "$lib/components/Questions.svelte";
    import { onMount } from "svelte";

  let topicId = $page.url.searchParams.get("topicId") || "unknown";
  const questionsObjList = questions[topicId];

  async function updateCurrentTopicId() {
    const token = localStorage.getItem("access_token")

    const res = await fetch(`http://localhost:3000/update-current-topic?finishedTopicId=${topicId}`, {
      method: "PATCH",
      headers: {authorization: `Bearer ${token}`}
    });

    const data = await res.json();

    if (!res.ok) {
      goto("/login");
      alert(data.error);
    }
  }

  onMount(updateCurrentTopicId);

</script>

<Questions questionsObjList={questionsObjList} />