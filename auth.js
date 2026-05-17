// ==========================================================================
// KISHAN E-KART - AUTHENTICATION LOGIC (LOCAL STORAGE)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. SIGNUP / REGISTER LOGIC ---
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault(); // પેજ રિફ્રેશ થતું અટકાવશે

            // ફોર્મમાંથી બધી વેલ્યુ મેળવવી
            const fullName = document.getElementById("regName").value.trim();
            const mobile = document.getElementById("regMobile").value.trim();
            const password = document.getElementById("regPassword").value;
            const confirmPassword = document.getElementById("regConfirmPassword").value;

            // બન્ને પાસવર્ડ મેચ થાય છે કે નહીં તે ચેક કરવું
            if (password !== confirmPassword) {
                alert("❌ Password and Confirm Password do not match!");
                return;
            }

            // પેલાથી જ આ મોબાઈલ નંબરથી એકાઉન્ટ બનેલું છે કે નહીં તે ચેક કરવું
            let users = JSON.parse(localStorage.getItem("users")) || [];
            const userExists = users.some(user => user.mobile === mobile);

            if (userExists) {
                alert("❌ This mobile number is already registered! Please Login.");
                return;
            }

            // નવો યુઝર ઓબ્જેક્ટ બનાવીને લિસ્ટમાં ઉમેરવો
            const newUser = {
                name: fullName,
                mobile: mobile,
                password: password
            };

            users.push(newUser);

            // Local Storage માં ડેટા સેવ કરવો (સ્ટ્રિંગ ફોર્મેટમાં)
            localStorage.setItem("users", JSON.stringify(users));

            alert("🎉 Registration Successful! Please Login.");

            // લોગિન પેજ પર રીડાયરેક્ટ કરવું
            window.location.href = "index.html";
        });
    }

    // --- 2. LOGIN LOGIC ---
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const mobile = document.getElementById("loginMobile").value.trim();
            const password = document.getElementById("loginPassword").value;

            // Local Storage માંથી બધા રજિસ્ટર્ડ યુઝર્સ લાવવા
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // યુઝર મેચ થાય છે કે નહીં તે ચેક કરવું
            const validUser = users.find(user => user.mobile === mobile && user.password === password);

            if (validUser) {
                alert(`👋 Welcome back, ${validUser.name}!`);

                // સેશન મેનેજ કરવા માટે કરન્ટ યુઝરને સેવ કરવો
                localStorage.setItem("currentUser", JSON.stringify(validUser));

                // હોમ પેજ પર રીડાયરેક્ટ કરવું
                window.location.href = "home.html";
            } else {
                alert("❌ Invalid Mobile Number or Password! Please try again.");
            }
        });
    }

    // --- 3. LOGOUT LOGIC ---
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // કરન્ટ યુઝરનું સેશન ડીલીટ કરવું
            localStorage.removeItem("currentUser");
            alert("🔒 Logged out successfully.");

            // લોગિન પેજ પર મોકલી દેવું
            window.location.href = "index.html";
        });
    }

    // --- 4. SECURITY CHECK (પ્રોટેક્શન) ---
    // જો યુઝર લોગિન ન હોય તો તે હોમ પેજ કે બીજા પેજ ડાયરેક્ટ ઓપન ના કરી શકે
    const currentPage = window.location.pathname.split("/").pop();
    const currentUser = localStorage.getItem("currentUser");

    // જો લોગિન વગર કોઈ ગુપ્ત રીતે અંદરના પેજ ખોલવાનો ટ્રાય કરે તો એને બહાર કાઢવો
    if (!currentUser && currentPage !== "index.html" && currentPage !== "register.html" && currentPage !== "") {
        alert("⚠️ Please login first to access this page!");
        window.location.href = "index.html";
    }
});