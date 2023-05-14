let tbody = document.querySelector("tbody");
let greenAddBtn = document.querySelector(".add");
let form_for_add = document.querySelector(".form-wrapper");
let blueSaveBtn = document.querySelector(".save");
let cancelBtn = document.querySelector(".cancel");
let nameEle = document.querySelector("#name");
let ageEle = document.querySelector("#age");

let genderEle = document.querySelector("#gender");
let emailEle = document.querySelector("#email");

let httpm = null;

let url = "http://localhost:5001/persons";

let datas = [];

let id = null;

let data = {};

greenAddBtn.onclick = function () {
  // httpm = "POST";
  clearForm();
  form_for_add.classList.add("active");
};

cancelBtn.onclick = function () {
  form_for_add.classList.remove("active");
};

blueSaveBtn.onclick = async function (e) {
  e.preventDefault();
  const personData = {
    name: nameEle.value,
    age: ageEle.value,
    email: emailEle.value,
    gender: genderEle.value,
  };

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(personData),
  });

  getDatas();
};

function clearForm() {
  nameEle.value = "";
  ageEle.value = "";
  genderEle.value = "";
  emailEle.value = "";
}

// function getDatas() {
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       datas = data;
//       updateTable();
//     });
// }
async function getDatas() {
  const response = await fetch(url);
  const data = await response.json();
  datas = data;
  updateTable();
}

getDatas();

function updateTable() {
  let data = "";

  if (datas.length > 0) {
    for (i = 0; i < datas.length; i++) {
      data += `<tr id = "${datas[i]["id"]}">
                        <td>${datas[i]["id"]}</td>
                        <td>${datas[i]["name"]}</td>
                        <td>${datas[i]["age"]}</td>
                        <td>${datas[i]["gender"]}</td>
                        <td>${datas[i]["email"]}</td>
                        <td><button class="btn btn-primary edit_btn" onclick = "editData(event)">Edit</button></td>
                        <td><button class="btn btn-danger" onclick = "deleteData(event)">Delete</button></td>
                    </tr>`;
    }
    tbody.innerHTML = data;
  }
}

async function editData(e) {
  e.preventDefault();
  form_for_add.classList.add("active");
  const personData = {
    id: e.target.parentElement.parentElement.id,
    name: nameEle.value,
    age: ageEle.value,
    email: emailEle.value,
    gender: genderEle.value,
  };
  // send a put request to the server
  await fetch(url + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(personData),
  });

  getDatas();
}

function deleteData(e) {
  id = e.target.parentElement.parentElement.id;
  fetch(url + "/" + id, { method: "DELETE" }).then(() => {
    getDatas();
  });
}

// make the edit
// document.querySelector(".edit-form-wrapper").style.display = "none";

// const blueEditBtn = document.querySelector(".edit");

// arr to get all edit buttons
let blueEditBtns = document.querySelectorAll(".edit_btn");
// blueEditBtns.forEach((btn) => {
//   btn.onclick = async function (e) {
//     e.preventDefault();
// document.querySelector(".edit-form-wrapper").style.display = "none";

//     await editData(e);
//     await getDatas();
//   };
// });

// blueEditBtns.forEach(async (btn) => {
//   btn.onclick = async function (e) {
//     e.preventDefault();
//     document.querySelector(".edit-form-wrapper").style.display = "none";

//     await editData(e);
//     await getDatas();
//   };
// });
