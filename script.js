document.addEventListener('DOMContentLoaded', () => {

    const DEFAULT_FORTUNES = [
        "A beautiful, smart, and loving person will be coming into your life.",
        "A dubious friend may be an enemy in camouflage.",
        "A fresh start will put you on your way.",
        "A pleasant surprise is waiting for you.",
        "All will go well with your new project.",
        "Believe in yourself and others will too.",
        "Generosity will repay you many times over.",
        "The person who is busy is usually the one who is the most efficient.",
        "Today is the day you will discover something wonderful.",
        "You will soon be rewarded for your patience and generosity."
    ];

    let fortunes = [];

    const fortuneBox = document.getElementById('fortune-box');
    const fortuneText = document.getElementById('fortune-text');
    const newFortuneInput = document.getElementById('new-fortune-input');
    const addFortuneBtn = document.getElementById('add-fortune-btn');

    console.log('DOMContentLoaded: script initialized');

    function loadFortunes() {
        const storedFortunes = JSON.parse(localStorage.getItem('myFortunes'));
        fortunes = storedFortunes || DEFAULT_FORTUNES;
        console.log('Fortunes loaded, count =', fortunes.length);
    }

    function saveFortunes() {
        localStorage.setItem('myFortunes', JSON.stringify(fortunes));
    }

    function displayRandomFortune() {
        if (fortunes.length === 0) {
            fortuneText.textContent = "No fortunes available. Add one!";
            return;
        }
        const randomIndex = Math.floor(Math.random() * fortunes.length);
        const chosen = fortunes[randomIndex];
        fortuneText.textContent = chosen;
        console.log('Random fortune selected:', chosen);
    }
    loadFortunes();
    displayRandomFortune();

    if (addFortuneBtn && newFortuneInput) {
        addFortuneBtn.addEventListener('click', () => {
            const newText = newFortuneInput.value.trim();
            if (newText && newText.length > 0) {
                fortunes.push(newText); // Store in the array
                saveFortunes();          // Store in localStorage
                newFortuneInput.value = '';
                // Display the new list size or confirmation (optional)
                newFortuneInput.placeholder = `Added! Total fortunes: ${fortunes.length}`;
                setTimeout(() => newFortuneInput.placeholder = "Add a new fortune line...", 2000);
                console.log('Added new fortune:', newText);
                alert('Fortune added: ' + newText);
            }
        });
    } else console.warn('Add fortune controls missing');

        // -----------------------
        // (Logo background toggle IIFE moved below where bodyBgStyles is declared)
        // -----------------------

        // -----------------------
        // Navbar behavior & section animations
        // -----------------------
        (function setupNavbar(){
            const navToggle = document.getElementById('nav-toggle');
            const navLinks = document.getElementById('nav-links');
            const navAnchors = navLinks ? Array.from(navLinks.querySelectorAll('a')) : [];
            const sections = Array.from(document.querySelectorAll('.section'));

            if (navToggle && navLinks) {
                navToggle.addEventListener('click', () => {
                    navLinks.classList.toggle('open');
                    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
                });
            }

            // close mobile nav on link click
            navAnchors.forEach(a => a.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) navLinks.classList.remove('open');
            }));

            // highlight active link on scroll using IntersectionObserver
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        const id = entry.target.id;
                        const anchor = navLinks ? navLinks.querySelector(`a[data-target="${id}"]`) : null;
                        if (entry.isIntersecting) {
                            // mark as active
                            navAnchors.forEach(a => a.classList.remove('active'));
                            if (anchor) anchor.classList.add('active');
                            entry.target.classList.add('in-view');
                        } else {
                            entry.target.classList.remove('in-view');
                        }
                    });
                }, { root: null, rootMargin: '0px 0px -30% 0px', threshold: 0.15 });

                sections.forEach(sec => observer.observe(sec));
            } else {
                // fallback: make sections visible
                sections.forEach(s => s.classList.add('in-view'));
            }
        })();

    const btnFontColor = document.getElementById('btn-font-color');
    const btnBgColor = document.getElementById('btn-bg-color');
    const btnBorderColor = document.getElementById('btn-border-color');
    const btnFontStyle = document.getElementById('btn-font-style');
    const btnPageBg = document.getElementById('btn-page-bg'); // may be removed; guarded below

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF6', '#000000'];
    const fontStyles = [
        { size: '18px', family: 'Georgia, serif' },
        { size: '20px', family: 'Arial, sans-serif' },
        { size: '16px', family: 'Courier New, monospace' },
        { size: '22px', family: 'Verdana, sans-serif' }
    ];

    const bodyBgStyles = [
        { color: '#000000', image: 'none' },
        { color: '#f9f9f9', image: 'none' },
        { color: 'transparent', image: 'linear-gradient(to right, #e0f7fa, #fce4ec)' } // Light Gradient
    ];

    // -----------------------
    // Top logo: cycle page background styles (replaces the in-page button)
    // Runs after bodyBgStyles is declared
    // -----------------------
    (function setupLogoBgToggle(){
        const logoBtn = document.getElementById('logo-theme-toggle');
        const BG_KEY = 'pageBgIndex';

        // helper to apply a background style object from bodyBgStyles
        function applyBgByIndex(i){
            if (!Array.isArray(bodyBgStyles) || bodyBgStyles.length === 0) return;
            const idx = ((typeof i === 'number' ? i : 0) + bodyBgStyles.length) % bodyBgStyles.length;
            const style = bodyBgStyles[idx];
            document.body.style.backgroundColor = style.color;
            document.body.style.backgroundImage = style.image;
        }

        if (!logoBtn) return;

        // initialize from storage (if any) else keep current (or default 0)
        let currentIndex = 0;
        try{
            const saved = parseInt(localStorage.getItem(BG_KEY), 10);
            if (!Number.isNaN(saved) && saved >= 0 && saved < bodyBgStyles.length) currentIndex = saved;
        } catch(e){ /* ignore */ }

        applyBgByIndex(currentIndex);

        logoBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % bodyBgStyles.length;
            applyBgByIndex(currentIndex);
            try{ localStorage.setItem(BG_KEY, String(currentIndex)); } catch(e){}
        });
    })();

    let colorIndex = 0;
    let fontIndex = 0;
    let bgIndex = 0; 

    function getNextItem(array, currentIndex) {
        return (currentIndex + 1) % array.length;
    }

    if (btnFontColor) {
        btnFontColor.addEventListener('click', () => {
            colorIndex = getNextItem(colors, colorIndex);
            if (fortuneText) fortuneText.style.color = colors[colorIndex];
            console.log('Font color changed to', colors[colorIndex]);
        });
    }

    if (btnBgColor) {
        btnBgColor.addEventListener('click', () => {
            colorIndex = getNextItem(colors, colorIndex);
            if (fortuneBox) fortuneBox.style.backgroundColor = colors[colorIndex];
            console.log('Box background changed to', colors[colorIndex]);
        });
    }

    if (btnBorderColor) {
        btnBorderColor.addEventListener('click', () => {
            colorIndex = getNextItem(colors, colorIndex);
            if (fortuneBox) fortuneBox.style.borderColor = colors[colorIndex];
            console.log('Border color changed to', colors[colorIndex]);
        });
    }

    if (btnFontStyle) {
        btnFontStyle.addEventListener('click', () => {
            fontIndex = getNextItem(fontStyles, fontIndex);
            if (fortuneText) {
                fortuneText.style.fontSize = fontStyles[fontIndex].size;
                fortuneText.style.fontFamily = fontStyles[fontIndex].family;
            }
            console.log('Font style changed to', fontStyles[fontIndex]);
        });
    }

    if (btnPageBg) {
        btnPageBg.addEventListener('click', () => {
            bgIndex = getNextItem(bodyBgStyles, bgIndex);
            const style = bodyBgStyles[bgIndex];
            document.body.style.backgroundColor = style.color;
            document.body.style.backgroundImage = style.image;
            console.log('Page background changed via in-page button to index', bgIndex);
        });
    }


    const timerDisplay = document.getElementById('timer-display');
    const btnStart = document.getElementById('btn-start');
    const btnStop = document.getElementById('btn-stop');
    const btnReset = document.getElementById('btn-reset');

    let timerId = null; 
    let timeInSeconds = 0;
    let isRunning = false;

    function startTimer() {
        if (isRunning) return; 
        isRunning = true;

        timerId = setInterval(() => {
            timeInSeconds += 3; 
            
            if (timeInSeconds >= 30) {
                timeInSeconds = 30; 
                stopTimer(); 
            }
            
            timerDisplay.textContent = timeInSeconds;
        }, 3000); 
        console.log('Timer started, will increment every 3s');
    }

    function stopTimer() {
        if (!isRunning) return;
        isRunning = false;
        clearInterval(timerId); 
        console.log('Timer stopped at', timeInSeconds);
    }

    function resetTimer() {
        stopTimer(); 
        timeInSeconds = 0;
        timerDisplay.textContent = timeInSeconds; 
        console.log('Timer reset to 0');
    }

    if (btnStart) btnStart.addEventListener('click', () => { startTimer(); alert('Timer started'); });
    if (btnStop) btnStop.addEventListener('click', () => { stopTimer(); });
    if (btnReset) btnReset.addEventListener('click', () => { resetTimer(); });


    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    if (taskList) loadTasks();

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => createTaskElement(task.text, task.completed));
    }

    function saveTasks() {
        const tasks = [];
        if (!taskList) return;
        taskList.querySelectorAll('li').forEach(li => {
            const span = li.querySelector('span');
            tasks.push({
                text: span ? span.textContent : '',
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(taskText, isCompleted) {
        const li = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isCompleted;
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            saveTasks(); 
        });

        if (isCompleted) {
            li.classList.add('completed');
        }

        const span = document.createElement('span');
        span.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks(); 
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        if (taskList) taskList.appendChild(li);
    }

    const calculatorDisplay = document.getElementById('calculator-display');

    const calculation = (num1,num2)=>{

        // helper to set display (works whether display is input or div/span)
        const setDisplay = (val) => {
            if (!calculatorDisplay) return;
            if ('value' in calculatorDisplay) calculatorDisplay.value = String(val);
            else calculatorDisplay.textContent = String(val);
        };

        const getDisplay = () => {
            if (!calculatorDisplay) return '';
            return ('value' in calculatorDisplay) ? calculatorDisplay.value : calculatorDisplay.textContent;
        };

        const toNumber = (v) => {
            if (typeof v === 'number') return v;
            const parsed = parseFloat(v);
            return Number.isNaN(parsed) ? 0 : parsed;
        };

        // plus
        const sum = (a, b) => {
            const res = toNumber(a) + toNumber(b);
            setDisplay(res);
            return res;
        };

        // minus
        const minus = (a, b) => {
            const res = toNumber(a) - toNumber(b);
            setDisplay(res);
            return res;
        };

        // multiplication
        const multiplication = (a, b) => {
            const res = toNumber(a) * toNumber(b);
            setDisplay(res);
            return res;
        };

        // division
        const division = (a, b) => {
            const denom = toNumber(b);
            if (denom === 0) {
                setDisplay('Error');
                return NaN;
            }
            const res = toNumber(a) / denom;
            setDisplay(res);
            return res;
        };

        // percentage: converts a value to percentage (value / 100)
        const percentage = (a) => {
            const res = toNumber(a) / 100;
            setDisplay(res);
            return res;
        };

        // square
        const square = (a) => {
            const res = Math.pow(toNumber(a), 2);
            setDisplay(res);
            return res;
        };

        // cube
        const cube = (a) => {
            const res = Math.pow(toNumber(a), 3);
            setDisplay(res);
            return res;
        };

        // equal - compute based on operator string
        const equal = (operator, a, b) => {
            switch (operator) {
                case '+': return sum(a, b);
                case '-': return minus(a, b);
                case '*': return multiplication(a, b);
                case 'x': return multiplication(a, b);
                case '/': return division(a, b);
                case '%': return percentage(a);
                default:
                    // if only one value provided, just display it
                    const val = (b === undefined) ? a : toNumber(a);
                    setDisplay(val);
                    return val;
            }
        };

        // square root
        const sqrt = (a) => {
            const n = toNumber(a);
            const res = n < 0 ? NaN : Math.sqrt(n);
            setDisplay(res);
            return res;
        };

        // cube root
        const cubeRoot = (a) => {
            const res = Math.cbrt(toNumber(a));
            setDisplay(res);
            return res;
        };

        // decimal: append a decimal point to the current display if not present
        const decimal = () => {
            const cur = String(getDisplay());
            if (cur === '' || cur === 'Error') {
                setDisplay('0.');
                return '0.';
            }
            if (cur.indexOf('.') === -1) {
                const updated = cur + '.';
                setDisplay(updated);
                return updated;
            }
            // already has decimal, return current
            return cur;
        };

        // all clear: reset display to 0
        const allClear = () => {
            setDisplay(0);
            return 0;
        };

        // delete last character (backspace)
        const deleteLast = () => {
            const cur = String(getDisplay());
            if (cur === '' || cur === '0' || cur === 'Error') {
                setDisplay(0);
                return '0';
            }
            // if only one char or negative sign, reset to 0
            if (cur.length <= 1 || (cur.length === 2 && cur.startsWith('-'))) {
                setDisplay(0);
                return '0';
            }
            // remove last char
            const updated = cur.slice(0, -1);
            // if the result is just '-' or empty, set to 0
            if (updated === '' || updated === '-') {
                setDisplay(0);
                return '0';
            }
            setDisplay(updated);
            return updated;
        };

        // return all command functions so other code can use them
        return {
            sum,
            minus,
            multiplication,
            division,
            percentage,
            square,
            cube,
            equal,
            sqrt,
            cubeRoot,
            decimal,
            allClear,
            deleteLast,
            setDisplay,
            getDisplay
        };

    };

    if (addTaskBtn && taskInput) {
        addTaskBtn.addEventListener('click', () => {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                createTaskElement(taskText, false);
                saveTasks(); 
                taskInput.value = ''; 
                console.log('Task added:', taskText);
                alert('Task added: ' + taskText);
            }
        });

        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTaskBtn.click();
        });
    }

    // -----------------------
    // Hero Converter (assignment 1.2)
    // Simple converter: transforms input text to UPPERCASE and shows result
    // -----------------------
    const heroInput = document.getElementById('hero-input');
    const heroBtn = document.getElementById('hero-convert-btn');
    const heroOutput = document.getElementById('hero-output');

    function convert() {
        if (!heroInput) return;
        const v = heroInput.value.trim();
        if (v === '') {
            alert('Please enter text to convert.');
            return;
        }
        const converted = v.toUpperCase();
        if (heroOutput) heroOutput.textContent = converted;
        console.log('Hero convert:', v, '→', converted);
        alert('Converted value: ' + converted);
        return converted;
    }

    if (heroBtn) heroBtn.addEventListener('click', convert);

});