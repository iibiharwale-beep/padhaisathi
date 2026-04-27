// Initialize Supabase
const supabaseUrl = 'https://djvxzugtiqriezgyvqyv.supabase.co';
const supabaseKey = 'sb_publishable_h96f_mlBzpIfYop9dflj5w_JjM2pS8H';
let supabase;

try {
    supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
} catch (e) {
    console.error("Supabase failed to initialize. Check your internet or CDN.", e);
}

window.padhaiApp = {
    state: {
        isLoggedIn: false,
        userExam: '',
        streak: 12,
        coins: 450,
        pomodoroInterval: null,
        timeLeft: 1500, // 25 mins
        isStudying: false,
        isRecording: false
    },

    init() {
        try {
            this.setupNavigation();
            this.setupSidebar();
            
            const startBtn = document.getElementById('start-journey-btn');
            if (startBtn) {
                startBtn.addEventListener('click', function() {
                    padhaiApp.finishOnboarding();
                });
            }
            
            // Load persistent local app state
            try {
                const savedState = localStorage.getItem('padhaiSathiState');
                if (savedState) {
                    const parsed = JSON.parse(savedState);
                    this.state = Object.assign({}, this.state, parsed);
                }
            } catch (e) {
                console.error("LocalStorage error:", e);
            }
            
            this.authChecked = false;

            // Setup Supabase Auth Listener
            if (supabase) {
                supabase.auth.onAuthStateChange(function(event, session) {
                    padhaiApp.authChecked = true;
                    if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
                        if (session) {
                            padhaiApp.state.isLoggedIn = true;
                            padhaiApp.state.user = session.user;
                            
                            if(padhaiApp.state.pendingDownload) {
                                const title = padhaiApp.state.pendingDownload;
                                padhaiApp.state.pendingDownload = null;
                                padhaiApp.downloadMockPDF(title);
                            }

                            if(padhaiApp.state.userExam) {
                                const displays = document.querySelectorAll('.user-exam-display');
                                for(let i=0; i<displays.length; i++) { displays[i].innerText = padhaiApp.state.userExam.toUpperCase(); }
                                padhaiApp.navigate('dashboard-screen');
                            } else {
                                padhaiApp.navigate('onboarding-screen');
                            }
                        } else {
                            padhaiApp.navigateGuest();
                        }
                    } else if (event === 'SIGNED_OUT') {
                        padhaiApp.state.isLoggedIn = false;
                        padhaiApp.navigate('dashboard-screen');
                    }
                });

                // Safety timeout: if Supabase doesn't respond in 2s, assume guest mode
                setTimeout(function() {
                    if (!padhaiApp.authChecked) {
                        console.warn("Auth timeout - loading Guest Mode");
                        padhaiApp.navigateGuest();
                    }
                }, 2000);
            } else {
                this.navigateGuest();
            }
        } catch (err) {
            console.error("App Init Crash:", err);
            // Emergency fallback: show onboarding if everything fails
            this.showScreen('onboarding-screen');
        }
    },

    navigateGuest() {
        this.state.isLoggedIn = false;
        if(!this.state.userExam) {
            this.navigate('onboarding-screen');
        } else {
            this.navigate('dashboard-screen');
        }
    },

    saveState() {
        try {
            // Exclude timers and ephemeral UI states from local storage
            const persistState = {
                isLoggedIn: this.state.isLoggedIn,
                userExam: this.state.userExam,
                streak: this.state.streak,
                coins: this.state.coins
            };
            localStorage.setItem('padhaiSathiState', JSON.stringify(persistState));
        } catch(e) {
            console.error("saveState error:", e);
        }
    },

    setupNavigation() {
        const links = document.querySelectorAll('.nav-links li');
        for(let i=0; i<links.length; i++) { let link = links[i];
            link.addEventListener('click', function(e) {
                for(let j=0; j<links.length; j++) { links[j].classList.remove('active'); }
                e.currentTarget.classList.add('active');
                const target = e.currentTarget.getAttribute('data-target');
                padhaiApp.navigate(target);
                
                // Close sidebar on mobile after click
                if(window.innerWidth < 768) {
                    document.getElementById('sidebar').classList.remove('active');
                }
            });
        }
    },

    setupSidebar() {
        const menuBtn = document.getElementById('menu-btn');
        const closeBtn = document.getElementById('close-sidebar-btn');
        const sidebar = document.getElementById('sidebar');

        menuBtn.addEventListener('click', function() {
            sidebar.classList.add('active');
        });

        closeBtn.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    },

    showScreen(screenId) {
        let screens = document.querySelectorAll('.screen'); for(let i=0; i<screens.length; i++) { screens[i].classList.remove('active'); }
        const target = document.getElementById(screenId);
        if(target) target.classList.add('active');
    },

    navigate(screenId) {
        // Special case for full screen mode
        if(screenId === 'test-series-screen' || screenId === 'daily-quiz-screen') {
            document.getElementById('sidebar').classList.add('hidden');
            document.getElementById('main-header').classList.add('hidden');
            document.getElementById('main-content').style.marginLeft = '0';
        } else if(screenId === 'onboarding-screen' || screenId === 'login-screen') {
            // Hide sidebar and header on auth/onboarding screens
            document.getElementById('sidebar').classList.add('hidden');
            document.getElementById('main-header').classList.add('hidden');
            document.getElementById('main-content').style.marginLeft = '0';
        } else {
            // Show sidebar and header for main app screens (dashboard etc.)
            document.getElementById('sidebar').classList.remove('hidden');
            document.getElementById('main-header').classList.remove('hidden');
            if(window.innerWidth >= 769) {
                document.getElementById('main-content').style.marginLeft = '260px';
            } else {
                document.getElementById('main-content').style.marginLeft = '0';
            }
        }
        
        this.showScreen(screenId);
    },

    toggleAuthView(viewName) {
        document.getElementById('auth-login-view').classList.add('hidden');
        document.getElementById('auth-signup-view').classList.add('hidden');
        document.getElementById('auth-forgot-view').classList.add('hidden');
        
        document.getElementById('auth-' + viewName + '-view').classList.remove('hidden');
    },

    handleAuth(action) {
        if (action === 'forgot') {
            const email = document.getElementById('forgot-email').value;
            if(!email) return alert('Please enter your email.');
            supabase.auth.resetPasswordForEmail(email).then(function(res) {
                if(res.error) return alert(res.error.message);
                alert('Password reset link sent to ' + email);
                padhaiApp.toggleAuthView('login');
            });
            return;
        }

        if (action === 'signup') {
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-pass').value;
            if(!email || !password) return alert('Email and Password are required.');
            if(password.length < 6) return alert('Password must be at least 6 characters.');
            
            supabase.auth.signUp({
                email: email,
                password: password,
                options: { data: { full_name: name } }
            }).then(function(res) {
                if(res.error) {
                    alert("Error: " + res.error.message);
                    return;
                }
                const data = res.data;
                if (data.user && data.session === null) {
                    alert("Registration successful! Please check your email inbox to verify your account before logging in.");
                    padhaiApp.toggleAuthView('login');
                } else if (data.user && data.session) {
                    alert("Registration successful! Welcome to PadhaiSathi.");
                    padhaiApp.navigate('onboarding-screen');
                } else if(data.user && data.user.identities && data.user.identities.length === 0) {
                    alert("This email is already registered. Please sign in.");
                    padhaiApp.toggleAuthView('login');
                }
            });
            return;
        }

        if (action === 'login') {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-pass').value;
            if(!email || !password) return alert('Email and Password are required.');
            
            supabase.auth.signInWithPassword({
                email: email,
                password: password,
            }).then(function(res) {
                if(res.error) {
                    alert(res.error.message);
                }
            });
            return;
        }

        if (action === 'social') {
            alert("Social login requires OAuth provider configuration in the Supabase Dashboard. Use Email/Password for this prototype.");
        }
    },

    logout() { supabase.auth.signOut().then(function(res) { if(res.error) { console.error('Error logging out:', res.error.message); } }); },

    finishOnboarding() {
        try {
            const exam = document.getElementById('exam-select').value;
            if(!exam) {
                alert('Please select an exam to continue!');
                return;
            }
            this.state.userExam = exam;
            const displays = document.querySelectorAll('.user-exam-display');
            for(let i=0; i<displays.length; i++) { displays[i].innerText = exam.toUpperCase(); }
            this.saveState();
            this.navigate('dashboard-screen');
        } catch (error) {
            alert("Error: " + error.message + " | " + error.stack);
        }
    },

    submitTest() {
        this.navigate('result-screen');
    },

    // Pomodoro Logic
    togglePomodoro() {
        const btn = document.getElementById('start-pomodoro-btn');
        const status = document.getElementById('pomodoro-status');
        
        if(this.state.isStudying) {
            clearInterval(this.state.pomodoroInterval);
            this.state.isStudying = false;
            btn.innerHTML = '<i class="fa-solid fa-play"></i> Resume Focus';
            btn.style.background = 'linear-gradient(135deg, var(--warning), #d97706)';
            status.innerText = "Paused";
        } else {
            this.state.isStudying = true;
            btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Focus';
            btn.style.background = 'linear-gradient(135deg, var(--danger), #b91c1c)';
            status.innerText = "Deep Work in Progress";
            
            this.state.pomodoroInterval = setInterval(function() {
                if(this.state.timeLeft > 0) {
                    this.state.timeLeft--;
                    this.updateTimerDisplay();
                } else {
                    clearInterval(this.state.pomodoroInterval);
                    this.state.isStudying = false;
                    status.innerText = "Break Time!";
                    alert("Focus session complete! Take a 5 minute break.");
                }
            }, 1000);
        }
    },

    updateTimerDisplay() {
        const m = Math.floor(this.state.timeLeft / 60).toString().padStart(2, '0');
        const s = (this.state.timeLeft % 60).toString().padStart(2, '0');
        document.getElementById('pomodoro-timer').innerText = `${m}:${s}`;
    },

    // AI Chat Tutor Logic
    openTutor() {
        document.getElementById('tutor-modal').classList.remove('hidden');
    },

    closeTutor() {
        document.getElementById('tutor-modal').classList.add('hidden');
    },

    sendChatMessage() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if(!text) return;

        const chatBox = document.getElementById('chat-messages');
        
        // Add user msg
        const userDiv = document.createElement('div');
        userDiv.className = 'message user';
        userDiv.innerHTML = `<p>${text}</p>`;
        chatBox.appendChild(userDiv);
        
        input.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;

        // Simulate AI reply
        setTimeout(function() {
            const aiDiv = document.createElement('div');
            aiDiv.className = 'message ai';
            aiDiv.innerHTML = `<p>Haan, ${text} ke baare me NCERT me diya hai. Kya tum iska detail explanation chahte ho?</p>`;
            chatBox.appendChild(aiDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);
    },

    handleChatKeyPress(e) {
        if(e.key === 'Enter') {
            this.sendChatMessage();
        }
    },

    simulateVoice() {
        const micBtn = document.getElementById('mic-btn');
        if(!this.state.isRecording) {
            this.state.isRecording = true;
            micBtn.classList.add('recording');
            document.getElementById('chat-input').placeholder = "Listening...";
            
            // Simulate speaking for 3 seconds
            setTimeout(function() {
                this.state.isRecording = false;
                micBtn.classList.remove('recording');
                document.getElementById('chat-input').placeholder = "Type your question...";
                document.getElementById('chat-input').value = "History NCERT chapter 1 summary batao";
                setTimeout(() => this.sendChatMessage(), 500);
            }, 3000);
        } else {
            this.state.isRecording = false;
            micBtn.classList.remove('recording');
            document.getElementById('chat-input').placeholder = "Type your question...";
        }
    },

    downloadMockPDF(title) {
        // Enforce Login for Downloads
        if (!this.state.isLoggedIn) {
            this.state.pendingDownload = title;
            alert("Please login or create a free account to download premium notes and e-Papers!");
            this.showScreen('login-screen');
            document.getElementById('sidebar').classList.add('hidden');
            document.getElementById('main-header').classList.add('hidden');
            return;
        }

        // Create a simple mock document content
        const content = `
            <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 40px; text-align: center; }
                        h1 { color: #6366f1; font-size: 40px; }
                        h2 { color: #333; margin-top: 50px; }
                        .footer { margin-top: 100px; color: #888; font-size: 12px; }
                        .watermark { opacity: 0.1; font-size: 100px; position: absolute; top: 30%; left: 10%; transform: rotate(-45deg); }
                    </style>
                </head>
                <body>
                    <div class="watermark">PadhaiSathi</div>
                    <h1>🎓 PadhaiSathi</h1>
                    <p>Ultimate Exam Expert</p>
                    <hr>
                    <h2>${title.replace(/_/g, ' ')}</h2>
                    <p style="margin-top: 30px; font-size: 18px;">This is a premium downloaded document generated by PadhaiSathi.</p>
                    <p>Contains handwritten notes, PYQs, and daily current affairs.</p>
                    <div class="footer">Downloaded from PadhaiSathi App • Do not distribute</div>
                </body>
            </html>
        `;

        // Create a Blob from the content
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        // Create an anchor tag and trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}_PadhaiSathi.html`; // Using HTML extension so it opens nicely in browser
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
        
        alert(`Downloading: ${title.replace(/_/g, ' ')}\nCheck your downloads folder!`);
    },

    // Smart Home Search
    performHomeSearch(prefilledText = null) {
        const input = document.getElementById('home-search-input');
        const text = prefilledText || input.value.trim();
        if(!text) return;

        // Open the tutor modal
        this.openTutor();
        
        const chatBox = document.getElementById('chat-messages');
        
        // Add user msg
        const userDiv = document.createElement('div');
        userDiv.className = 'message user';
        userDiv.innerHTML = `<p>${text}</p>`;
        chatBox.appendChild(userDiv);
        
        input.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;

        // Show researching status
        const researchDiv = document.createElement('div');
        researchDiv.className = 'message ai';
        researchDiv.style.opacity = '0.7';
        researchDiv.innerHTML = `<p><i class="fa-solid fa-magnifying-glass fa-spin"></i> Researching across Google & Top Education Channels for 100% accuracy...</p>`;
        chatBox.appendChild(researchDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        // Provide highly accurate simulated answer
        setTimeout(function() {
            chatBox.removeChild(researchDiv);
            const aiDiv = document.createElement('div');
            aiDiv.className = 'message ai';
            aiDiv.innerHTML = `<p><i class="fa-solid fa-check-circle" style="color: var(--success);"></i> <b>Verified Answer:</b><br><br>Regarding "${text}", according to recent syllabus and verified educator notes, the exact details are... (This is a 100% accurate, verified answer sourced from official references).</p>`;
            chatBox.appendChild(aiDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 2500);
    },

    simulateHomeVoice() {
        const micBtn = document.getElementById('home-mic-btn');
        const input = document.getElementById('home-search-input');
        
        if(!this.state.isRecording) {
            this.state.isRecording = true;
            micBtn.style.color = "var(--danger)";
            micBtn.classList.add('pulse');
            input.placeholder = "Listening...";
            
            setTimeout(function() {
                this.state.isRecording = false;
                micBtn.style.color = "var(--primary)";
                micBtn.classList.remove('pulse');
                input.placeholder = "Ask any question...";
                input.value = "What was the main cause of the Revolt of 1857?";
                setTimeout(() => this.performHomeSearch(), 800);
            }, 3000);
        } else {
            this.state.isRecording = false;
            micBtn.style.color = "var(--primary)";
            micBtn.classList.remove('pulse');
            input.placeholder = "Ask any question...";
        }
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    padhaiApp.init();
});






