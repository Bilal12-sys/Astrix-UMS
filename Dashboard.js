console.log("loaded")
import { auth, signOut , collection, getDocs , db , doc, getDoc} from "./config/firebase.js"


function profileloader() {
    const loader = document.createElement("div");
    loader.innerHTML = "<span></span>";
    loader.classList.add("ploader");

    document.body.appendChild(loader);

    return loader;
}
const items = document.querySelectorAll(".items h4");

items.forEach(item => {
    item.addEventListener("click", () => {
        // Remove active from all items
        items.forEach(i => i.classList.remove("active"));

        // Add active to clicked item
        item.classList.add("active");
    });
});


function boxes(user) {
    
    const bm = document.createElement("div");
    const box = document.createElement("div");
    const closeBtn = document.createElement("button");

    const imgContainer = document.createElement("div");
    const profileImg = document.createElement("img");

    const infoContainer = document.createElement("div");
    const ut = document.createElement("h2");
    const ue = document.createElement("div");
    const ua = document.createElement("div");
    const uc = document.createElement("div");
    const up = document.createElement("div");

    bm.className = "bm";
    box.className = "box";
    closeBtn.className = "close-btn";
    imgContainer.className = "img-container";
    profileImg.className = "profile-img";
    infoContainer.className = "info-container";

    ut.className = "ut";
    ue.className = "info-row";
    ua.className = "info-row";
    uc.className = "info-row";
    up.className = "info-row";

    closeBtn.innerHTML = "&times;";

    profileImg.src = user.image && user.image.trim() !== ""
        ? user.image
        : "image/unknown.png";

    profileImg.alt = "Profile Picture";

    ut.textContent = user.name || "Unknown User";

    ue.innerHTML = `
    <span class="label">
        <i class="fa-solid fa-envelope"></i>
    </span>
    <span class="value">${user.email || "-"}</span>
`;

ua.innerHTML = `
    <span class="label">
        <i class="fa-solid fa-cake-candles"></i>
    </span>
    <span class="value">${user.age || "-"}</span>
`;

uc.innerHTML = `
    <span class="label">
        <i class="fa-solid fa-location-dot"></i>
    </span>
    <span class="value">${user.city || "-"}</span>
`;

up.innerHTML = `
    <span class="label">
        <i class="fa-solid fa-phone"></i>
    </span>
    <span class="value">${user.phone || "-"}</span>
`;

    imgContainer.appendChild(profileImg);
    infoContainer.append(ut, ue, ua, uc, up);
    box.append(closeBtn, imgContainer, infoContainer);
    bm.appendChild(box);

    document.body.appendChild(bm);

    closeBtn.addEventListener("click", () => {
        bm.classList.remove("active");
        bm.remove()
    });

    bm.addEventListener("click", (e) => {
        if (e.target === bm) {
            bm.classList.remove("active");
             bm.remove()
        }
    });

    return { bm, box };
}



async function getCurrentUserProfile() {
    
    const user = auth.currentUser;

    if (!user) return null;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data();
    }

    return null;
}

const prof = document.getElementById("prof");

if (prof) {
    prof.addEventListener("click", async () => {
        const loader = profileloader();
        try {
            const userData = await getCurrentUserProfile();

            if (!userData) return;

            const show = boxes(userData);
            show.bm.classList.add("active");
        } catch (err) {
            console.error(err);
        } finally {
            if (loader && typeof loader.remove === 'function') loader.remove();
        }
    });
} else {
    console.warn("Profile element not found: #prof");
}




const sb = document.getElementById("sidebar")
const sopen = document.getElementById("open")

sopen.addEventListener("click", () => {
    sb.classList.toggle("active")
})

const logout = document.getElementById("logout")

if (logout) {
    logout.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully");
                
                location.href = "index.html"
            })
            .catch((error) => {
                console.error("Sign out error:", error);
            });
    });
} else {
    console.warn("Logout button not found!");
}

const tuser = document.getElementById("tu")
const tcity = document.getElementById("tc")
const  tp = document.getElementById("tp")


async function getStats() {
    const snapshot = await getDocs(collection(db, "users"));

    const cities = new Set();
    const professions = new Set();

    snapshot.forEach((doc) => {
        const data = doc.data();

        if (data.city) cities.add(data.city);
        if (data.Profession) professions.add(data.Profession);
    });

    tuser.textContent = snapshot.size;
    tcity.textContent = cities.size;
    tp.textContent = professions.size;
}

getStats();


function showLoader() {
    const loader = document.createElement("div");
    loader.innerHTML = "<strong></strong>";
    loader.classList.add("loader");

    document.body.appendChild(loader);

    return loader;
}

const usert = document.getElementById("usert");


async function getUser() {
    const loader = showLoader();

    try {
        usert.innerHTML = "";

        const snapshot = await getDocs(collection(db, "users"));

        snapshot.forEach((doc) => {
            const data = doc.data();

            usert.innerHTML += `
                <tr>
                    <td>${data.name || ""}</td>
                    <td>${data.age || ""}</td>
                    <td>${data.city || ""}</td>
                    <td>${data.Profession || ""}</td>

                    <td class="actions">
                        <button class="view">
                            <i class="fa-solid fa-eye"></i>
                        </button>

                        <button class="edit">
                            <i class="fa-solid fa-pen"></i>
                        </button>

                        <button class="delete">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    }
    catch (error) {
        console.error(error);
    }
    finally {
        loader.remove();
    }
}

getUser();

