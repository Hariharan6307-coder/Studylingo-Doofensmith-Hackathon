<script>
  const {currentPage} = $props();
</script>

<nav>
  <a href="/badges" class:selected={currentPage == "/badges"}>
    <img src="/images/nav-bar-icons/badges-icon.png" alt="">
    <p>Badges</p>
  </a>
  <a href="/practice" class:selected={currentPage == "/practice"}>
    <img src="/images/nav-bar-icons/practice-icon.png" alt="">
    <p>Practice</p>
  </a>
  <a href="/home" class:selected={currentPage == "/home"}>
    <img src="/images/nav-bar-icons/home-icon.png" alt="">
    <p>Home</p>
  </a>
  <a href="/rankings" class:selected={currentPage == "/rankings"}>
    <img src="/images/nav-bar-icons/rankings-icon.png" alt="">
    <p>Ranks</p>
  </a>
  <a href="/profile" class:selected={currentPage == "/profile"}>
    <img src="/images/nav-bar-icons/profile-male-icon.png" alt="">
    <p>Profile</p>
  </a>
</nav>

<style>
  nav {
    background-color: var(--card-color);
    height: 5.625rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    width: 100%;
    position: fixed;
    bottom: 0;
  }

  a {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    padding: 0.2rem;
    font-size: 1rem;
    flex-direction: column;
    font-weight: 700;
    padding-bottom: 10px;
  }

  a p {
    display: none;
  }

  img {
    height: 57%;
  }

  a.selected {
    background-color: var(--background-color);
  }

  a.selected p {
    display: block;
  }

  @media screen and (min-width: 1000px){
    nav {
      flex-direction: column;
      width: 7rem;
      height: 100vh;
      top: 0;
      bottom: unset;
      justify-content: flex-start;
      gap: 1rem;
    }

    a {
      flex: unset;
      width: 100%;
      height: 7rem;
    }

    a img {
      height: 60%;
    }

    a p{
      display: none;
    }

    a.selected p {
      display: none;
    }
  }

  @media screen and (min-width: 1400px){
    nav {
      flex-direction: column;
      width: 20rem;
      height: 100vh;
      top: 0;
      bottom: unset;
      justify-content: flex-start;
      gap: 1rem;
    }

    a {
      display: flex;
      flex-direction: row;
      justify-content: unset;
      width: 100%;
      height: 7rem;
      font-size: 1.5rem;
    }

    a img {
      height: 60%;
      margin-right: 2rem;
      margin-left: 2rem;
    }

    a p{
      display: block;
    }

    a.selected p {
      display: block;
    }
  }
</style>