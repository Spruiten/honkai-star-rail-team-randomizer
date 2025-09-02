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
const bgChangerButton = document.getElementById('bg-changer-button');
const filterButtons = Array.from(document.getElementsByClassName('filters'));

const physChars = Array.from(charButtons).filter(button => button.classList.contains('physical'));
const fireChars = Array.from(charButtons).filter(button => button.classList.contains('fire'));
const iceChars = Array.from(charButtons).filter(button => button.classList.contains('ice'));
const lightningChars = Array.from(charButtons).filter(button => button.classList.contains('lightning'));
const windChars = Array.from(charButtons).filter(button => button.classList.contains('wind'));
const quantumChars = Array.from(charButtons).filter(button => button.classList.contains('quantum'));
const imaginaryChars = Array.from(charButtons).filter(button => button.classList.contains('imaginary'));

const destructionChars = Array.from(charButtons).filter(button => button.classList.contains('destruction'));
const huntChars = Array.from(charButtons).filter(button => button.classList.contains('hunt'));
const eruditionChars = Array.from(charButtons).filter(button => button.classList.contains('erudition'));
const harmonyChars = Array.from(charButtons).filter(button => button.classList.contains('harmony'));
const nihilityChars = Array.from(charButtons).filter(button => button.classList.contains('nihility'));
const preservationChars = Array.from(charButtons).filter(button => button.classList.contains('preservation'));
const abundanceChars = Array.from(charButtons).filter(button => button.classList.contains('abundance'));
const remembranceChars = Array.from(charButtons).filter(button => button.classList.contains('remembrance'));

const physicalFilterButton = document.getElementById('physical-filter');
const fireFilterButton = document.getElementById('fire-filter');
const iceFilterButton = document.getElementById('ice-filter');
const lightningFilterButton = document.getElementById('lightning-filter');
const windFilterButton = document.getElementById('wind-filter');
const quantumFilterButton = document.getElementById('quantum-filter');
const imaginaryFilterButton = document.getElementById('imaginary-filter');

const destructionFilterButton = document.getElementById('destruction-filter');
const huntFilterButton = document.getElementById('hunt-filter');
const eruditionFilterButton = document.getElementById('erudition-filter');
const harmonyFilterButton = document.getElementById('harmony-filter');
const nihilityFilterButton = document.getElementById('nihility-filter');
const preservationFilterButton = document.getElementById('preservation-filter');
const abundanceFilterButton = document.getElementById('abundance-filter');
const remembranceFilterButton = document.getElementById('remembrance-filter');

let activeElements = [];
let activePaths = [];

filterButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        button.classList.toggle('active');
    });
});

function elementFilter(array) {
    if (activeElements.includes(array)) {
        const index = activeElements.indexOf(array);
        activeElements.splice(index, 1);
    } else {
        activeElements.push(array);
    }
}

function pathFilter(array) {
    if (activePaths.includes(array)) {
        const index = activePaths.indexOf(array);
        activePaths.splice(index, 1);
    } else {
        activePaths.push(array);
    }
}

function filter() {
    if (activeElements.length == 0 && activePaths.length == 0) {
        for (let char of charButtons) {
            char.style.display = "inline-block";
        }
    } else {
        let activeCharButtons = [];
        for (let chars of activeElements) {
            for (let char of chars) {
                if (activeCharButtons.includes(char)) {
                     continue;
                }
                activeCharButtons.push(char);
            }
        }
        let activePathButtons = [];
        for (let chars of activePaths) {
            for (let char of chars) {
                if (activePathButtons.includes(char)) {
                     continue;
                }
                activePathButtons.push(char);
            }
        }
        if (activePaths.length == 0) {
            for (let char of charButtons) {
                if (activeCharButtons.includes(char)) {
                    char.style.display = "inline-block";
                    continue;
                }
                char.style.display = "none";
            }
        } else if (activeElements.length == 0) {
            for (let char of charButtons) {
                if (activePathButtons.includes(char)) {
                    char.style.display = "inline-block";
                    continue;
                }
                char.style.display = "none";
            }
        } else {
            for (let char of charButtons) {
                if (activeCharButtons.includes(char) && activePathButtons.includes(char)) {
                    char.style.display = "inline-block";
                    continue;
                }
                char.style.display = "none";
            }
        }
    }
}

physicalFilterButton.addEventListener('click', ()=> {
    elementFilter(physChars);
    filter();
});

fireFilterButton.addEventListener('click', ()=> {
    elementFilter(fireChars);
    filter();
});

iceFilterButton.addEventListener('click', ()=> {
    elementFilter(iceChars);
    filter();
});

lightningFilterButton.addEventListener('click', ()=> {
    elementFilter(lightningChars);
    filter();
});

windFilterButton.addEventListener('click', ()=> {
    elementFilter(windChars);
    filter();
});

quantumFilterButton.addEventListener('click', ()=> {
    elementFilter(quantumChars);
    filter();
});

imaginaryFilterButton.addEventListener('click', ()=> {
    elementFilter(imaginaryChars);
    filter();
});

destructionFilterButton.addEventListener('click', ()=> {
    pathFilter(destructionChars);
    filter();
});

huntFilterButton.addEventListener('click', ()=> {
    pathFilter(huntChars);
    filter();
});

eruditionFilterButton.addEventListener('click', ()=> {
    pathFilter(eruditionChars);
    filter();
});

harmonyFilterButton.addEventListener('click', ()=> {
    pathFilter(harmonyChars);
    filter();
});

nihilityFilterButton.addEventListener('click', ()=> {
    pathFilter(nihilityChars);
    filter();
});

preservationFilterButton.addEventListener('click', ()=> {
    pathFilter(preservationChars);
    filter();
});

abundanceFilterButton.addEventListener('click', ()=> {
    pathFilter(abundanceChars);
    filter();
});

remembranceFilterButton.addEventListener('click', ()=> {
    pathFilter(remembranceChars);
    filter();
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
}

popButton.addEventListener('click', () => {
  const active = popButton.textContent === ">";
  popButton.textContent = active ? "<" : ">";
  sideMenu.classList.toggle('active', active);
  popButton.classList.toggle('active', active);
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

bgChangerButton.addEventListener('click', () => {
    document.body.classList.toggle('true-herta');
    if (bgChangerButton.textContent == "Madam Herta") {
        bgChangerButton.textContent = "Herta Puppet";
        localStorage.setItem("background", "puppet");
    } else {
        bgChangerButton.textContent = "Madam Herta";
        localStorage.setItem("background", "madam");
    }
})

scrollToTopButton.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

function randomValueFromArray(array){
    const random = Math.floor(Math.random() * array.length);
    // console.log(array[random]);
    return array[random];
};

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
    selectedDupes.forEach(dupe => randPool.splice(randPool.indexOf(dupe), 1));
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
        chosen.forEach((char, i) => {
            selTitle[i].textContent = char.getAttribute('title');
            selChar[i].src = char.querySelector('.char-face').src;
        });
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

    // loading chosen Herta background avatar
    const hertaBG = localStorage.getItem("background") == "puppet";
    if (hertaBG) {
        document.body.classList.remove('true-herta');
        bgChangerButton.textContent = "Herta Puppet";
    }
    
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
