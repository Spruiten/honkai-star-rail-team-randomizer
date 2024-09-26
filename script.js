const popButton = document.getElementById("popup");
const sideMenu = document.getElementById("side-menu");
const randButton = document.getElementById("randomize-button");
const selChar = document.getElementsByClassName("sel-char");
const selTitle = document.getElementsByClassName("chosen-title");
const toggleAllButton = document.getElementById('toggle-all');
const charButtons = document.querySelectorAll('.character-card');
const changelogMenu = document.getElementById('changelog');
const changelogButton = document.getElementById('changelog-button');
const closeChangelog = document.getElementById('close-changelog');
const settingsMenu = document.getElementById('settings');
const settingsButton = document.getElementById('settings-button');
const closeSettings = document.getElementById('close-settings');
const scrollToTopButton = document.getElementById('scroll-top');
const filterButtons = Array.from(document.getElementsByClassName('filters'));
const physChars = Array.from(charButtons).filter(button => button.classList.contains('physical'));
const fireChars = Array.from(charButtons).filter(button => button.classList.contains('fire'));
const physicalFilterButton = document.getElementById('physical-filter');
const fireFilterButton = document.getElementById('fire-filter');
let activeChars = [];

filterButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        button.classList.toggle('active');
    });
});

function filter(array) {
    if (activeChars.includes(array)) {
        const index = activeChars.indexOf(array);
        activeChars.splice(index, 1);
        console.log('Removing Array!');
    } else {
        activeChars.push(array);
        console.log('Pushing Array!');
    }
    if (activeChars.length == 0) {
        for (let char of charButtons) {
            char.style.display = "inline-block";
        }
    } else {
        let activeCharButtons = [];
        for (let chars of activeChars) {
            for (let char of chars) {
                if (activeCharButtons.includes(char)) {
                     continue;
                }
                activeCharButtons.push(char);
                console.log(char.getAttribute('title'));
            }
        }
        for (let char of charButtons) {
            if (activeCharButtons.includes(char)) {
                char.style.display = "inline-block";
                continue;
            }
            char.style.display = "none";
        }
    }
}

physicalFilterButton.addEventListener('click', ()=> {
    filter(physChars);
});

fireFilterButton.addEventListener('click', ()=> {
    filter(fireChars);
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
}

function randomValueFromArray(array){
    const random = Math.floor(Math.random() * array.length);
    // console.log(array[random]);
    return array[random];
};

popButton.addEventListener('click', function () {
    if (popButton.textContent == ">") {
        popButton.textContent = "<";
        sideMenu.classList.add('active');
        popButton.classList.add('active');
    } else {
        popButton.textContent = ">"
        sideMenu.classList.remove('active');
        popButton.classList.remove('active');
    }
});

changelogButton.addEventListener('click', () => {
    changelogMenu.classList.add("open");
});

closeChangelog.addEventListener('click', () => {
    changelogMenu.classList.remove("open");
});

settingsButton.addEventListener('click', () => {
    settingsMenu.classList.add("open");
});

closeSettings.addEventListener('click', () => {
    settingsMenu.classList.remove("open");
});

scrollToTopButton.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

function removeDuplicates(selectedValue, index, randPool) {
    randPool.splice(index, 1);
    const duplicates = randPool.filter(button => button.hasAttribute('data-duplicate'));
    const dupeValue = selectedValue.getAttribute('data-duplicate');
    const selectedDupes = [];
    for (let dupe of duplicates) {
        let tempo = dupe.getAttribute('data-duplicate');
        if (tempo == dupeValue) {
            selectedDupes.push(dupe);
        }
    }
    let dupeindex = 0;
    let i = 0;
    for (let dupe of selectedDupes) {
        dupeindex = randPool.indexOf(selectedDupes[i]);
        randPool.splice(dupeindex, 1);
        i += 1;
    }
};

randButton.addEventListener('click', function () {
    for (const name of selTitle) { // clears names so previous leftovers won't appear once chars < 4
        name.textContent = "---";
      }
    for (const icon of selChar) {
        icon.src = "images/icons/char holder copy.png";
    }
    const litUpButtons = Array.from(charButtons).filter(button => button.classList.contains('lit-up'));
    const chosen = [];
    let index = 0;
    if (litUpButtons.length == 0) {
        const funny = ["..Seriously?", "You may need more nurturing...", "Uh, take your time.",
             "You can click the buttons below to add them to the pool of characters so the randomizer can properly function as intended."];
        for (let i = 0; i < 4; i++) {
            selTitle[i].textContent = funny[i];
        }
        selChar[0].src = "images/icons/Herta-Avatar.webp";
        selChar[1].src = "images/icons/Ruan-Mei-Avatar.webp";
        selChar[2].src = "images/icons/Stephen-Lloyd-Avatar.webp";
        selChar[3].src = "images/icons/Screwllum-Avatar.webp";
    } else {
        for (let i = 0; i < 4; i++) {
            chosen.push(randomValueFromArray(litUpButtons));
            index = litUpButtons.indexOf(chosen[i]);
            // prevents duplicate Trailblazer and March 7th
            if (litUpButtons[index].hasAttribute('data-duplicate')) {
                removeDuplicates(litUpButtons[index], index, litUpButtons);
            } else {
                litUpButtons.splice(index, 1);
            }
            if (litUpButtons.length == 0) {
                break;
            }
          }
        let maxLen = chosen.length;
        i = 0;
        for (const name of selTitle) {
            name.textContent = chosen[i].getAttribute('title');
            i += 1;
            if (i >= maxLen) {
                break;
            }
        }
        i = 0;
        for (const icon of selChar) {
            icon.src = chosen[i].querySelector('.char-face').getAttribute('src');
            i += 1;
            if (i >= maxLen) {
                break;
            }
        }
    }
});

toggleAllButton.addEventListener('click', () => {
    // Check if all buttons are lit up
    const allLit = Array.from(charButtons).every(button => button.classList.contains('lit-up'));

    // Toggle the 'lit-up' class on all buttons
    charButtons.forEach(button => {
        const buttonId = button.getAttribute('title');
        if (allLit) {
            button.classList.remove('lit-up');
            localStorage.setItem(`button-${buttonId}`, false);
        } else {
            button.classList.add('lit-up');
            localStorage.setItem(`button-${buttonId}`, true);
        }
    });

    if (allLit) {
        toggleAllButton.textContent = "Select All";
    } else {
        toggleAllButton.textContent = "Deselect All";
    }
});

// DOMContentLoaded makes sure the HTML body has fully loaded or event won't run if otherwise
document.addEventListener('DOMContentLoaded', (event) => {
    // loading button states
    charButtons.forEach(button => {
        const buttonId = button.getAttribute('title');
        const isLitUp = localStorage.getItem(`button-${buttonId}`) === 'true';
        if (isLitUp) {
            button.classList.add('lit-up');
        } else {
            button.classList.remove('lit-up');
        }
    });
    
    // checking if all buttons are lit once page loads
    const allLit = Array.from(charButtons).every(button => button.classList.contains('lit-up'));
    if (allLit) {
        toggleAllButton.textContent = "Deselect All";
    } else {
        toggleAllButton.textContent = "Select All";
    }

    charButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle the 'lit-up' class on the clicked button
            const buttonId = button.getAttribute('title');
            button.classList.toggle('lit-up');
            localStorage.setItem(`button-${buttonId}`, button.classList.contains('lit-up'));

            const allLit = Array.from(charButtons).every(button => button.classList.contains('lit-up'));
            if (allLit) {
                toggleAllButton.textContent = "Deselect All";
            } else {
                toggleAllButton.textContent = "Select All";
            }
        });
    });
});
