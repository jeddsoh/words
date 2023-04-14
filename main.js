const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

// get the input and search button elements
const inpWord = document.getElementById("inp-word");
const searchBtn = document.getElementById("search-btn");

// add event listener for "keypress" event on the input field
inpWord.addEventListener("keypress", (event) => {
  // check if the key pressed was "Enter"
  if (event.key === "Enter") {
    // trigger a click event on the search button
    searchBtn.click();
  }
});

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
            sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});
function playSound() {
    // create a new Audio object
    const audio = new Audio(sound.getAttribute("src"));
    
    // wait for the loadeddata event to fire
    audio.addEventListener("loadeddata", () => {
      // play the audio
      audio.play();
    });
  }
  