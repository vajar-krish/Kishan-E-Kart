// ==========================================================================
// KISHAN E-KART - MAIN WEBSITE LOGIC (CART & SELL LISTINGS)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // પેજ લોડ થાય ત્યારે પ્રોડક્ટ લિસ્ટિંગ અને કાર્ટ લોડ કરવા
    displayMyListings();

    // --- 1. ADD NEW LISTING LOGIC (નવી પ્રોડક્ટ વેચવા માટે ઉમેરવી) ---
    const addListingForm = document.getElementById("addListingForm");
    if (addListingForm) {
        addListingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // ફોર્મમાંથી ડેટા મેળવવો
            const category = document.getElementById("listCategory").value;
            const name = document.getElementById("listName").value.trim();
            const desc = document.getElementById("listDesc").value.trim();
            const price = document.getElementById("listPrice").value;
            const unit = document.getElementById("listUnit").value;

            // નવો લિસ્ટિંગ ઓબ્જેક્ટ બનાવવો
            const newListing = {
                id: 'prod_' + Date.now(), // યુનિક આઈડી માટે ટાઈમસ્ટેમ્પ
                name: name,
                price: `DefaultCurrencySymbol${Number(price).toLocaleString('en-IN')}`,
                unit: unit,
                category: category,
                description: desc,
                views: 0,
                status: "Active"
            };

            // લોકલ સ્ટોરેજમાંથી જૂની લિસ્ટિંગ મેળવવી
            let myListings = JSON.parse(localStorage.getItem("myListings")) || [];
            myListings.push(newListing);

            // લોકલ સ્ટોરેજમાં અપડેટ કરવું
            localStorage.setItem("myListings", JSON.stringify(myListings));

            alert("🎉 Your product has been listed successfully!");
            
            // લિસ્ટિંગ ટેબલ વાળા પેજ પર મોકલી દેવું
            window.location.href = "my-listings.html";
        });
    }
});

// --- 2. DISPLAY MY LISTINGS (ટેબલમાં લાઈવ ડેટા બતાવવો) ---
function displayMyListings() {
    const tableBody = document.getElementById("listingsTableBody");
    if (!tableBody) return; // જો આ પેજ પર ટેબલ ન હોય તો અહીંથી જ કોડ અટકી જશે

    let myListings = JSON.parse(localStorage.getItem("myListings")) || [];

    // જો લોકલ સ્ટોરેજમાં કોઈ ડેટા હોય, તો જ ડિફોલ્ટ ડેટાને ક્લીન કરીને નવો બતાવવો
    if (myListings.length > 0) {
        tableBody.innerHTML = ""; // જૂનો સ્ટેટિક કોડ સાફ કરવો

        myListings.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price} / ${item.unit}</td>
                <td><span class="status-active">${item.status}</span></td>
                <td>${item.views}</td>
                <td>
                    <button class="edit-btn" onclick="alert('Edit Feature coming soon!')">Edit</button>
                    <button class="delete-btn" onclick="deleteListing('${item.id}')">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// --- 3. DELETE LISTING LOGIC (વેચવા મુકેલી આઇટમ ડીલીટ કરવી) ---
function deleteListing(id) {
    if (confirm("Are you sure you want to delete this listing?")) {
        let myListings = JSON.parse(localStorage.getItem("myListings")) || [];
        
        // જે આઈડી મેચ ન થતી હોય તેને રાખીને બાકીની ફિલ્ટર કરવી
        myListings = myListings.filter(item => item.id !== id);
        
        localStorage.setItem("myListings", JSON.stringify(myListings));
        displayMyListings(); // ટેબલ ફરીથી રિફ્રેશ કરવું
    }
}

// --- 4. ADD TO CART LOGIC (કાર્ટમાં આઇટમ ઉમેરવી) ---
function addToCart(prodName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ચેક કરવું કે આ આઇટમ કાર્ટમાં પેલાથી છે કે નહીં
    const existingItem = cart.find(item => item.name === prodName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: prodName,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`🛒 ${prodName} added to Cart successfully!`);
}

// --- 5. DETAILED PAGE CART LOGIC (પ્રોડક્ટ ડિટેલ્સ પેજ માટે) ---
function addDetailedToCart() {
    const name = document.getElementById("prodName").innerText;
    const priceText = document.getElementById("prodPrice").innerText;
    const quantity = parseInt(document.getElementById("prodQuantity").value) || 1;

    // કિંમતમાંથી માત્ર નંબર અલગ કાઢવો (જેમ કે ₹350 માંથી 350)
    const price = parseInt(priceText.replace(/[^0-9]/g, ''));

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`🛒 ${quantity} kg ${name} added to Cart!`);
}

// ==========================================================================
// KISHAN E-KART - MAIN WEBSITE LOGIC (CART & SELL LISTINGS)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // પેજ લોડ થાય ત્યારે લોડિંગ પ્રી-લોડરને હટાવી દેવો
    removeLoader();

    // પેજ લોડ થાય ત્યારે પ્રોડક્ટ લિસ્ટિંગ અને કાર્ટ લોડ કરવા
    displayMyListings();

    // --- 1. ADD NEW LISTING LOGIC (સેમ) ---
    /* ... (જૂનો કોડ અહીં પેસ્ટ કરો) ... */
});

// --- ૧. REMOVE LOADER LOGIC (લોડિંગ એનિમેશન હટાવવું) ---
function removeLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        // ૧ સેકન્ડ પછી લોડર હટાવી દેવો (ટેસ્ટિંગ માટે થોડો ટાઈમ વધાર્યો છે)
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    }
}

// --- Display My Listings (સેમ) ---
/* ... (જૂનો કોડ અહીં પેસ્ટ કરો) ... */