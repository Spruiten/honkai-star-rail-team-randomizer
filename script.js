const popButton = document.getElementById("popup");
const sideMenu = document.getElementById("side-menu");
const randButton = document.getElementById("randomize-button");
const selChar = document.getElementsByClassName("sel-char");
const selTitle = document.getElementsByClassName("chosen-title");
const toggleAllButton = document.getElementById('toggle-all');
const charButtons = document.querySelectorAll('.character-card');

function randomValueFromArray(array){
    const random = Math.floor(Math.random() * array.length);
    // console.log(array[random]);
    return array[random];
};

popButton.addEventListener('click', function () {
    if (popButton.textContent == ">") {
        popButton.textContent = "<";
        sideMenu.style.width = "260px";
        sideMenu.classList.add('active');
        popButton.style.marginLeft = "260px";
    } else {
        popButton.textContent = ">"
        sideMenu.style.width = "0";
        popButton.style.marginLeft = "0";
        sideMenu.classList.remove('active');
    }
});

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
    if (litUpButtons.length <= 4) { // won't be in random order, it will be alphabetical order
        for (let i = 0; i < litUpButtons.length; i++) {
            selTitle[i].textContent = litUpButtons[i].getAttribute('title');
            selChar[i].src = litUpButtons[i].querySelector('.char-face').getAttribute('src');
          }
    } else {
        for (let i = 0; i < 4; i++) {
            chosen.push(randomValueFromArray(litUpButtons));
            index = litUpButtons.indexOf(chosen[i]);
            litUpButtons.splice(index, 1);
          }
        i = 0;
        for (const name of selTitle) {
            name.textContent = chosen[i].getAttribute('title');
            i += 1;
        }
        i = 0;
        for (const icon of selChar) {
            icon.src = chosen[i].querySelector('.char-face').getAttribute('src');
            i += 1;
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
