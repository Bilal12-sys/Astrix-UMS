console.log("loaded")
import { auth, signOut , collection, getDocs , db} from "./config/firebase.js"

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

const usert = document.getElementById("usert");

function showLoader() {
    const loader = document.createElement("div");
    loader.innerHTML = "<span></span>";
    loader.classList.add("loader");

    document.body.appendChild(loader);

    return loader;
}

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
                    <td>${data.profession || ""}</td>

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