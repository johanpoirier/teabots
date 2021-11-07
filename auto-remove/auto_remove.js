console.info('[[ Auto Remove started ]]');

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

function autoRemove(answers) {
    let removedAnswerCount = 0;
    let lastAnswer = null;
    Array.from(answers).forEach(answer => {
        if (hideList.includes(answer.textContent.trim())) {
            console.log(`Hide ${answer.textContent}`);
            answer.style['visibility'] = 'hidden';
            answer.textContent = '';
            removedAnswerCount++;
        } else {
            lastAnswer = answer;
        }
    });
    if (removedAnswerCount === 3) {
        lastAnswer.click();
    }
}

const callback = function (mutationsList) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const goLogo = document.querySelector('.rotation-loader');
            if (!goLogo) {
                const answerList = document.querySelector('.answers');
                answerList && autoRemove(answerList.querySelectorAll('button.answer'));
            }
        }
    }
};

const observer = new MutationObserver(callback);
const appRoot = document.querySelector('app-root');
const config = {attributes: false, childList: true, subtree: true};
observer.observe(appRoot, config);
