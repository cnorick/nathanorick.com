(() => {
  // Theme switch
  const body = document.body;
  const lamp = document.getElementById("mode");
  let theme;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const setThemeForUtterances = (theme) => {
    if (document.querySelector(".utterances-frame")) {
      const utteranceTheme = theme === "dark" ? "photon-dark" : "github-light";
      const message = {
        type: "set-theme",
        theme: utteranceTheme,
      };
      const iframe = document.querySelector(".utterances-frame");
      iframe.contentWindow.postMessage(message, "https://utteranc.es");
    }
  };

  const setTheme = (state) => {
    theme = state;
    if (state === "dark") {
      body.setAttribute("data-theme", "dark");
    } else if (state === "light") {
      body.removeAttribute("data-theme");
    }
    setTimeout(() => setThemeForUtterances(theme), 1000);
  };

  const getInitialTheme = () => {
    const localStorageTheme = localStorage.getItem("theme");
    let systemTheme;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      systemTheme = "dark";
    }
    return localStorageTheme || systemTheme || "light";
  };

  lamp.addEventListener("click", () => toggleTheme(theme));

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        const newColorScheme = e.matches ? "dark" : "light";
        setTheme(newColorScheme);
      }
    });

  setTheme(getInitialTheme());

  setTimeout(() => body.classList.remove("notransition"), 75);

  // Blur the content when the menu is open
  const cbox = document.getElementById("menu-trigger");

  cbox.addEventListener("change", function () {
    const area = document.querySelector(".content-wrapper");
    this.checked
      ? area.classList.add("blurry")
      : area.classList.remove("blurry");
  });

  // Copy Code Button
  var codeBlocks = document.querySelectorAll("pre.highlight");
  codeBlocks.forEach(function (codeBlock) {
    var copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.type = "button";
    copyButton.ariaLabel = "Copy code to clipboard";
    copyButton.innerText = "Copy";

    codeBlock.append(copyButton);
    codeBlock.classList.add("code-block")

    copyButton.addEventListener("click", function () {
      var code = codeBlock.querySelector("code").innerText.trim();
      window.navigator.clipboard.writeText(code);

      copyButton.innerText = "Copied";
      var fourSeconds = 4000;

      setTimeout(function () {
        copyButton.innerText = "Copy";
      }, fourSeconds);
    });
  });

  // Play Gif
  const gifs = document.querySelectorAll('.gif-container');
  gifs.forEach(gif => {
    if (gif.dataset.ignoreClick) return;
    
    const playButton = gif.getElementsByClassName('play-button')[0];
    const picEl = gif.getElementsByTagName('picture')[0];

    gif.addEventListener('click', () => {
      const wasPlaying = gif.dataset.playing == "true";
      gif.dataset.playing = !wasPlaying;
      if (!wasPlaying) {
        playButton.remove();
      }
      else {
        gif.appendChild(playButton);
      }

      const img = document.createElement('img');
      if (gif.dataset.oldSource) {
        img.src = gif.dataset.oldSource;  
        const oldImg = gif.getElementsByTagName('img')[0];
        gif.dataset.oldSource = oldImg.src;
        oldImg.replaceWith(img);
        return;
      }

      img.src = picEl.dataset.fullSource;
      gif.dataset.oldSource = picEl.getElementsByTagName('img')[0].src;
      picEl.replaceWith(img);
    });
  });
})();
