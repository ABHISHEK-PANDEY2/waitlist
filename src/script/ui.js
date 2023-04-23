"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
  increment,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBfeubHUJrNzGlBOTnQcOmn9PP0nCBggZY",
  authDomain: "developerpass-co.firebaseapp.com",
  projectId: "developerpass-co",
  storageBucket: "developerpass-co.appspot.com",
  messagingSenderId: "582660964991",
  appId: "1:582660964991:web:4b8d7c577b1727f940b54a",
  measurementId: "G-YQ5MGHHDX7",
};

const form_html = `<section class="form-section">
<form action="">
  <h3 id="title">Signup for the waitlist</h3>
  <div class="input_box">
    <label for="">Email</label>
    <input
      id="email"
      name="email"
      type="email"
      placeholder="example@domain.com"
    />
  </div>
  <div class="input_box" id="questionBox">
    <label for="">Question</label>
    <input
      id="subject"
      name="subject"
      type="text"
      placeholder="Subject"
    />
    <input
      id="question"
      name="question"
      type="text"
      placeholder="Ask us anything"
    />
  </div>
  <button type="submit" class="submit_btn" id="formBtn">Sign up</button>
  <p class="footer" id="footer">
    Signed up before? &nbsp;
    <span class="pointer" id="footerAction"
      ><strong> Check your status</strong>
    </span>
  </p>
</form>

<div class="form_stats hidden">
  <h3>Successfully signed up for demo</h3>
  <div class="stats_box">
    <div class="box">
      <p>Your Position</p>
      <h3 id="position">514</h3>
    </div>
    <div class="box">
      <p>People on Waitlist</p>
      <h3 id="total">514</h3>
    </div>
  </div>
  <div class="box">
    <p>Referral Link</p>
    <h3 id="referral">https://companyname.com?ref_id=1234</h3>
  </div>
  <p>Share and refer your friends to move up the line!</p>
  <div class="btn_container">
    <button class="submit_btn">Twitter</button>
    <button class="submit_btn">Whatsapp</button>
  </div>
</div>
</section>`;

const formHolder = document.getElementById("embeded-waitlist");
formHolder.innerHTML = form_html;
const form = document.querySelector(".form-section form");
const stats = document.querySelector(".form_stats");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const listId = params.id || formHolder.getAttribute("data-waitlist_id"); // waitlist id
const refId = params.ref_id; // user id of reffer
console.log(listId);
let total;
let flag = true;

const ref = collection(db, `waitlists/${listId}/waiters`);

async function getStatus(data) {
  console.log(data);
  document
    .querySelector(".form-section form .submit_btn")
    .classList.add("disable");
  document.querySelector(".form-section form .submit_btn").textContent =
    "Loading...";
  document
    .querySelector(".form-section form .submit_btn")
    .setAttribute("disabled", true);
  // adding user to list
  const queryString = query(ref, where("email", "==", data.email));

  await getDocs(ref).then((snap) => {
    total = snap.size;
  });

  await getDocs(queryString).then((snap) => {
    const data = snap.docs[0].data();
    form.classList.add("hidden");
    stats.classList.remove("hidden");
    document.querySelector("#total").textContent = total;
    document.querySelector("#position").textContent = data.waiting_position;
    document.querySelector(
      "#referral"
    ).textContent = `https://waitlist-site.web.app/?id=${listId}&ref_id=${data.uid}`;
  });
}

async function postData(data) {
  console.log(data);
  document
    .querySelector(".form-section form .submit_btn")
    .classList.add("disable");
  document.querySelector(".form-section form .submit_btn").textContent =
    "Loading...";
  document
    .querySelector(".form-section form .submit_btn")
    .setAttribute("disabled", true);
  // adding user to list
  const docRef = await addDoc(ref, data);
  console.log(docRef);

  if (refId) {
    const referralUser = doc(db, `waitlists/${listId}/waiters`, refId);

    await updateDoc(referralUser, {
      refferals_made: increment(1),
    });
  }

  await getDocs(ref).then((snap) => {
    total = snap.size;
    form.classList.add("hidden");
    stats.classList.remove("hidden");
    document.querySelector("#total").textContent = total;
    document.querySelector("#position").textContent = total;
    document.querySelector(
      "#referral"
    ).textContent = `https://waitlist-site.web.app/?id=${listId}&ref_id=${docRef.id}`;
  });

  const userRef = doc(db, `waitlists/${listId}/waiters`, docRef.id);

  await updateDoc(userRef, {
    uid: docRef.id,
    waiting_position: total,
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const subject = document.querySelector("#subject").value;
  const question = document.querySelector("#question").value;
  const isReferred = refId ? true : false;
  const joined_at = serverTimestamp();
  const data = {
    email,
    subject,
    question,
    isReferred,
    joined_at,
    refferals_made: 0,
  };
  flag ? postData(data) : getStatus(data);
});

function statusForm() {
  const questionBox = document.querySelector("#questionBox");
  const title = document.querySelector("#title");
  const formBtn = document.querySelector("#formBtn");
  const footer = document.querySelector("#footer");
  questionBox.classList.toggle("hidden");
  flag = !flag;
  const titleText = flag
    ? "Signup for the waitlist"
    : "Get your waiting status";
  const btnText = flag ? "Sign up" : "Check Status";
  const footerHtml = flag
    ? `Signed up before? &nbsp;
  <span class="pointer" id="footerAction"
    ><strong> Check your status</strong>
  </span>`
    : `Haven't signedup yet? &nbsp;
  <span class="pointer" id="footerAction"
    ><strong>Signup</strong>
  </span>`;
  title.textContent = titleText;
  formBtn.textContent = btnText;
  footer.innerHTML = footerHtml;
  document.querySelector("#footerAction").addEventListener("click", statusForm);
}

document.querySelector("#footerAction").addEventListener("click", statusForm);
