<script>
  import { goto } from "$app/navigation";
  import { lessons } from "../../data/lessons_questions";
  import Questions from "$lib/components/Questions.svelte";

  const noOfQuestions = 10;
  const questionFormatExample = JSON.stringify({
      question: "If 12 C of charge passes through a wire in 4 seconds, what is the current?",
      options: {
        a: "3 A",
        b: "4 A",
        c: "8 A",
        d: "48 A"
      },
      answer: "3 A"
    });
  
  let notes = [];
  for (let topicId in lessons) {
    lessons[topicId].forEach((obj) => {
      notes.push(obj.text);
    });
  }

  const query = `
You are a quiz generator.

Here is an array of notes:
${JSON.stringify(notes, null, 2)}

Your task is to generate ${noOfQuestions} multiple-choice questions from the above notes.

Each question should be in the following JavaScript object format:
${questionFormatExample}

Requirements:
- Questions must be based only on the content of the notes.
- Each question should have 4 answer options: a, b, c, and d.
- The correct answer must be one of the options and clearly match the "answer" field.
- Output a valid JavaScript array of ${noOfQuestions} question objects only.
- Do not include any explanations or extra text.

Return only the JavaScript code.
`;

  let questionsObjList = $state();

  async function getAIQuestions() {
    const res = await fetch("http://localhost:3000/ask-ai", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({query: `${query}`})
    });

    const data = await res.json();

    if (!res.ok) {
      goto("/login");
      alert(data.error);
    } else {
      return (data.responseText);
    }
  }

  getAIQuestions().then((response) => {
    questionsObjList = JSON.parse(response.slice(13, -3));
  })

</script>

{#if questionsObjList}
  <Questions questionsObjList={questionsObjList} />
{:else}
  <h1>Loading, might take up to 20 seconds</h1>
{/if}