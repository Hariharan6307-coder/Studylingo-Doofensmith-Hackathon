<script>
    import { goto } from "$app/navigation";

  let name = "";
  let email = "";
  let password = "";

  let errorMsg = "";

  async function register(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name, email, password})
    });

    const data = await res.json();

    if (!res.ok) {
      errorMsg = data.error || "Something went wrong";
      return;
    }
    goto("/login");
  }
</script>


<main>
  <form onsubmit={register}>
    <p class="heading">Register</p>
    <a href="/login">Or login with an exisiting account</a>
    <input type="text" placeholder="Name" bind:value={name}/>
    <input type="email" placeholder="Email" bind:value={email}/>
    <input type="password" placeholder="Password" bind:value={password}/>
    <button class="primary-button">Submit</button>
    <p class="errorMsg">{errorMsg}</p>
  </form>
</main>


<style>
  main {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form {
    background-color: var(--dark-background-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25rem;
    height: 35rem;
    border-radius: 3rem;
  }

  .heading {
    font-size: 3rem;
    font-weight: 800;
    margin: 2rem 0rem 1rem 0rem;
  }

  a {
    margin-bottom: 2rem;
  }

  input {
    border: none;
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom: 2rem;
    color: var(--black-text-color);
  }

  .errorMsg {
    color: red;
  }
</style>