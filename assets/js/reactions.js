function onLoad() {
  const actionUrl =
    "https://script.google.com/macros/s/AKfycbyFPJNzE_zet1MitbaH-eoL5VW0LMK4uKIEAbFph02I1IcMmNl1vezS2Q_9Z59HUeDi/exec";

  function postLike(article_url, action) {
    fetch(
      actionUrl +
        "?" +
        new URLSearchParams({
          func: "add-like",
          action,
          article_url,
        }),
      {
        method: "POST",
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  function getLikes(article_url) {
    fetch(
      actionUrl +
        "?" +
        new URLSearchParams({
          func: "get-likes",
          article_url,
        }),
      {
        method: "POST",
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        likeCount.textContent = data.likes;
        clapCount.textContent = data.claps;
        const likeKey = `${article_url}-like`;
        const clapKey = `${article_url}-clap`;
        likeButton.disabled = !!localStorage.getItem(likeKey);
        likeButton.classList.toggle("liked", likeButton.disabled);
        clapButton.disabled = (parseInt(localStorage.getItem(clapKey)) || 0) >= 50;
        clapButton.classList.toggle("liked", clapButton.disabled);
      });
  }

  ///////

  const currentUrl = window.location.pathname?.replace(/\/+$/, "")
  const likeButton = document.getElementById("like-button");
  const clapButton = document.getElementById("clap-button");
  const likeCount = document.getElementById("like-count");
  const clapCount = document.getElementById("clap-count");

  getLikes(currentUrl);

  likeButton.onclick = () => {
    const likeKey = `${currentUrl}-like`;
    const liked = localStorage.getItem(likeKey);
    if (!liked) {
      postLike(currentUrl, "like");
      localStorage.setItem(likeKey, "true");
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
      likeButton.classList.add("liked");
      likeButton.disabled = true;
      pageConfetti();
    }

    else {
      console.log("Already liked");
      likeButton.disabled = true;
    }
  };

  clapButton.onclick = () => {
    const MAX_CLAPS = 50;
    const clapKey = `${currentUrl}-clap`;
    const storedClaps = localStorage.getItem(clapKey);
    if (!storedClaps || parseInt(storedClaps) < MAX_CLAPS) {
      postLike(currentUrl, "clap");
      const newClaps = (parseInt(storedClaps) || 0) + 1;
      localStorage.setItem(clapKey, newClaps);
      clapCount.textContent = parseInt(clapCount.textContent || 0) + 1;
      if (newClaps >= MAX_CLAPS) {
        clapButton.disabled = true;
        clapButton.classList.add("liked");
      }
      pageConfetti();
    }
    else {
      console.log("Max claps reached");
      clapButton.disabled = true;
    }
  };
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", onLoad);
}
else {
  onLoad();
}