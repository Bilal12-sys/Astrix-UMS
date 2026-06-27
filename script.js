// 1. Keep ALL your Firebase imports unified from your configuration file
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, setDoc} from "./config/firebase.js";
// import { getFirestore, c } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const tabLogin = document.getElementById("tab-login");
const tabSignup = document.getElementById("tab-signup");
const panelLogin = document.getElementById("panel-login");
const panelSignup = document.getElementById("panel-signup");

tabLogin.addEventListener("click", () => switchTab("login"));
tabSignup.addEventListener("click", () => switchTab("signup"));

document.getElementById("go-signup").addEventListener("click", (e) => {
  e.preventDefault();
  switchTab("signup");
});
document.getElementById("go-login").addEventListener("click", (e) => {
  e.preventDefault();
  switchTab("login");
});

function switchTab(tab) {
  panelLogin.classList.toggle("active", tab === "login");
  panelSignup.classList.toggle("active", tab === "signup");
  tabLogin.classList.toggle("active", tab === "login");
  tabSignup.classList.toggle("active", tab === "signup");
}

const lemail = document.getElementById("login-email");
const lpas = document.getElementById("lpass");
const lbtn = document.getElementById("login-btn");

const semail = document.getElementById("signup-email");
const sname = document.getElementById("signup-name");
const spas = document.getElementById("spass");
const sbtn = document.getElementById("signup-btn");

const age = document.getElementById("sage");
const city = document.getElementById("city");
const pf = document.getElementById("profession");

const eye = document.getElementById("eye-c");
const ey = document.getElementById("eye-cs");

const eyeOpen = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const eyeClosed = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

let passwordVisible = false;

function setPasswordVisibility(visible) {
  const icon = visible ? eyeOpen : eyeClosed;

  if (eye) eye.innerHTML = icon;
  if (ey) ey.innerHTML = icon;

  if (lpas) lpas.type = visible ? "text" : "password";
  if (spas) spas.type = visible ? "text" : "password";
}

function togglePasswordVisibility() {
  passwordVisible = !passwordVisible;
  setPasswordVisibility(passwordVisible);
}

setPasswordVisibility(false);

if (eye) eye.addEventListener("click", togglePasswordVisibility);
if (ey) ey.addEventListener("click", togglePasswordVisibility);

function showLoader() {
  const loader = document.createElement("div");
  loader.innerHTML = "<span></span>";
  loader.classList.add("loader");
  document.body.appendChild(loader);
  return loader;
}

function boxes() {
  const eb = document.createElement("div");
  const ebp = document.createElement("div");
  const titlet = document.createElement("h2");

  titlet.classList.add("t");
  eb.classList.add("eb");
  ebp.classList.add("ebp");

  eb.appendChild(titlet);
  ebp.appendChild(eb);
  document.body.appendChild(ebp);

  return { ebp, eb, titlet };
}

const card = document.getElementById("card");
const lm = document.getElementById("lm");
const tn = document.getElementById("tn");
const tt = document.getElementById("tt");
const fp = document.getElementById("fp");
function runIntroAnimation() {
  
  gsap.set(["#card", "#lm", "#tn", "#tt", ".field-group", "#fp", ".btn-primary"], { 
    willChange: "transform, opacity, filter" 
  });

  const tl = gsap.timeline({
    defaults: {
      ease: "power4.out",
      duration: 0.45
    }
  });

  tl.from("#card", {
    y: 60,
    scale: 0.92,
    opacity: 0,
    rotateX: 12,
    filter: "blur(12px)", 
    duration: 0.55
  })

  
  .from("#lm", {
    x: -30,
    opacity: 0,
    scale: 0.8,
    duration: 0.25
  }, "-=0.25")

  
  .from("#tn", {
    x: 30,
    opacity: 0,
    scale: 0.8,
    duration: 0.25
  }, "<")

  .from("#tt", {
    y: -15,
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
    duration: 0.3
  }, "-=0.15")

  .from(".field-group", {
    y: 20,
    opacity: 0,
    scale: 0.97,
    stagger: 0.06, 
    duration: 0.3
  }, "-=0.15")

  .from("#fp", {
    opacity: 0,
    y: 10,
    duration: 0.2
  }, "-=0.1")

.fromTo(".btn-primary", 
  { opacity: 0, scale: 0.9, y: 15 }, 
  { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.5)" }, // To state
  "-=0.1"
);
  
  return tl; 
}

// SIGNUP LOGIC
sbtn.addEventListener("click", async (e) => {
  e.preventDefault(); // Stop form submission reloading the browser
  const loader = showLoader();

  try {
    const res = await createUserWithEmailAndPassword(auth, semail.value, spas.value);

    await setDoc(doc(db, "users", res.user.uid), {
      name: sname.value,
      age: age.value,
      email: semail.value,
      city: city.value,
      Profession: pf.value,
      uid: res.user.uid
    });

    console.log("User profile saved as document:", res.user.uid);

    const ab = boxes();
    ab.titlet.innerText = "Account created Successfully";

    setTimeout(() => {
      ab.ebp.remove();
      switchTab("login");
    }, 1000);

    lemail.value = semail.value;
    lpas.value = spas.value;

  } catch (error) {
    console.error(error);
    const ab = boxes();
    ab.titlet.innerText = "Signup Error";

    setTimeout(() => {
      ab.ebp.remove();
    }, 1000);
  } finally {
    loader.remove();
  }
});

// LOGIN LOGIC
lbtn.addEventListener("click", (e) => {
  e.preventDefault(); // Stop form submission reloading the browser
  const loader = showLoader();

  signInWithEmailAndPassword(auth, lemail.value, lpas.value)
    .then(() => {
      loader.remove();
      const ab = boxes();
      ab.titlet.innerText = "Login Successfully";

      setTimeout(() => {
        ab.ebp.remove();
        location.href = "Dashboard.html";
      }, 1000);
    })
    .catch((error) => {
      loader.remove();
      const ab = boxes();
      ab.titlet.innerText = "Email or Password Incorrect";

      setTimeout(() => {
        ab.ebp.remove();
      }, 1000);
    });
});

// AUTH STATE OBSERVER (Handles hiding card and redirection instantly)
card.style.display = "none";
const authLoader = showLoader();
let initialCheck = true;

onAuthStateChanged(auth, (user) => {
  authLoader.remove();

  if (user) {
    if (!initialCheck) return;

    initialCheck = false;
    location.href = "Dashboard.html";
  } else {
    initialCheck = false;
    card.style.display = "block";
    runIntroAnimation();
  }
});