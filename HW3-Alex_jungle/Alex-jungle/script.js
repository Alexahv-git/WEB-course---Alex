// מוזיקת רקע שמתנגנת בעת טעינת הדף
let bgMusic = new Audio('music/background.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.2; // עוצמה נמוכה
bgMusic.play();

// מנגנון שיאפשר השמעה אחרי פעולה של המשתמש
document.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
    }
  });

// משתנים לניהול הצליל הנוכחי של חיה
let currentSound = null;
let currentSoundTimeout = null;

// פונקציה להשמעת צליל של חיה בעוצמה מלאה, ומניעת השמעה כפולה
function playAnimalSound(soundName) {
    // עצירה של צליל קודם אם יש
    if (currentSound) {
        currentSound.pause();
        currentSound.currentTime = 0;
        clearTimeout(currentSoundTimeout);
    }

    // יצירת הצליל החדש
    currentSound = new Audio('sounds/' + soundName + '.mp3');
    currentSound.volume = 1.0; // עוצמה מלאה
    currentSound.play();

    // הפסקה אוטומטית אחרי 5 שניות
    currentSoundTimeout = setTimeout(() => {
        currentSound.pause();
        currentSound.currentTime = 0;
        currentSound = null;
    }, 5000);
}

// אפקט אנימציה זמני בלחיצה על חיה
function animateAnimal(animalName) {
    const animalElement = document.querySelector('[data-sound="' + animalName + '"]');
    if (animalElement) {
        animalElement.classList.add("pressed");
        setTimeout(() => {
            animalElement.classList.remove("pressed");
        }, 100);
    }
}

// האזנה ללחיצות עכבר על חיות
document.querySelectorAll('.animal').forEach(animal => {
    animal.addEventListener('click', () => {
        const soundName = animal.dataset.sound;
        playAnimalSound(soundName);
        animateAnimal(soundName);
    });
});

// האזנה ללחיצות מקלדת לפי מקשים מוגדרים
document.addEventListener('keydown', (event) => {
    const keyMap = {
        'l': 'lion',
        'e': 'elephant',
        'm': 'monkey',
        'd': 'dog',
        'c': 'cat',
        'w': 'cow',
        'u': 'duck'
    };

    const soundName = keyMap[event.key.toLowerCase()];
    if (soundName) {
        playAnimalSound(soundName);
        animateAnimal(soundName);
    }
});

// שימוש ב-Object.keys() - אלמנט שלא למדנו בכיתה:
// מדפיס את רשימת המקשים הפעילים בקונסול בצורה דינאמית
console.log("Available keys: ", Object.keys({l:1, e:1, m:1, d:1, c:1, w:1, u:1}));
