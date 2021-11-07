console.info('[[ Auto Play started ]]');

const hideList = [
    "Boris Faitout",
    "Steevan Barboyon",
    "Nicolas Zimmermann",
    "Guillaume Decitre",
    "Charly Martins",
    "Daniela Moncada Alvarez",
    "Benjamin Dolard",
    "Sana Bekaddour",
    "Anthony Abramo",
    "Mireille Gutton"
];

let timeoutHandler = null;
let resultCount = 0;
let failCount = 0;

function autoRemove(answers) {
    for (const answer of Array.from(answers)) {
        if (!hideList.includes(answer.textContent.trim())) {
            answer.click();
            if (answer.classList.contains('is-right')) {
                resultCount++;
            } else {
                failCount++;
                if (failCount >= 4) {
                    clearTimeout(timeoutHandler);
                    location.reload();
                }
            }
            break;
        }
    }
}

const callback = function (mutationsList) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const answerList = document.querySelector('.answers');
            if (answerList) {
                autoRemove(answerList.querySelectorAll('button.answer'));
                return;
            }

            const goLogo = document.querySelector('.rotation-loader');
            if (goLogo) {
                resultCount = 0;
                failCount = 0;
                goLogo.click();
                timeoutHandler = setTimeout(() => location.reload(), 45000);
                return;
            }

            const reloadBtn = document.querySelector('app-game-state-loading button');
            if (reloadBtn) {
                reloadBtn.click();
                return;
            }

            const replayBtn = document.querySelector('app-game-state-over button');
            if (replayBtn) {
                console.log(`Result: ${resultCount / 2} / 8`);
                clearTimeout(timeoutHandler);
                replayBtn.click();
            }
        }
    }
};

const observer = new MutationObserver(callback);
const appRoot = document.querySelector('app-root');
const config = {attributes: false, childList: true, subtree: true};
observer.observe(appRoot, config);
