<script>
    import { goto } from "$app/navigation";

  let email = "";
  let password = "";

  let errorMsg = "";

  async function login(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      errorMsg = "Server returned invalid response";
      return;
    }

    if (!res.ok) {
      errorMsg = data.error || "Login failed";
      return;
    }

    localStorage.setItem("access_token", data.session.access_token);
    goto("/home");
  }

</script>


<main>
  <form onsubmit={login}>
    <p class="heading">Login</p>
    <a href="/register">Or register with a new account</a>
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
    height: 30rem;
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