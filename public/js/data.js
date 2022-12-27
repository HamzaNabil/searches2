let userInput = document.querySelector("#login-username");
let passInput = document.querySelector("#login-password");
let buttonEl = document.querySelector("#login-btn");

let containerWrapper = document.querySelector("#container-wrapper");
let loginWrapper = document.querySelector(".login-wrapper");

function getSearches() {
  containerWrapper && (containerWrapper.style.display = "block");
  loginWrapper && (loginWrapper.style.display = "none");

  fetch("/api/searches")
    .then((res) => res.json())
    .then((data) => uiSearches(data))
    .catch((err) => {});
}

function handleLogin() {
  let userValue = userInput.value.trim();
  let passValue = passInput.value.trim();

  if (userValue == "" || passValue == "") {
    alert("Please Fill Data !");
  } else {
    if (userValue == "Srcams" && passValue == "p@ss.w0Rdd!") {
      getSearches();
    } else {
      alert("username or password is incorrect !!");
    }
  }
}

buttonEl.addEventListener("click", handleLogin);

function uiSearches(data) {
  document.querySelector("#d").innerHTML = "";
  data.forEach((item) => {
    document.querySelector("#d").innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>${item.email} </td> 
          <td> <a href="${item.researchGateId}" target="_blank"> ${
      item.researchGateId
    } </a> </td> 
          <td> <a href="${item.scopusId}" target="_blank"> ${
      item.scopusId
    } </a> </td> 
          <td> <a href="${item.wosId}" target="_blank"> ${
      item.wosId
    } </a>  </td> 
          <td>${item.dp} </td> 
          <td>${item.searchTerm} </td> 
          <td>${item.membersNumber} </td> 
          <td>${item.addCoriatMembers} </td> 
          <td>${item.addGofMembers} </td> 
          <td>${item.gofMembers} </td> 
          <td>${item.dbEle} </td> 
          <td> <a href="${item.doi}" target="_blank"> ${item.doi} </a>  </td> 
          <td>${moment(item.date).format("MM-DD-YYYY")} </td> 
          <td>${item.factor} </td> 
          <td>${item.citations} </td> 
          <td>${item.jobNumber} </td> 
          <td>${item.magPage} </td> 
          <td>${item.mgStars} </td> 
          <td>${item.searchTmwil} </td> 
          <td>${item.shatr} </td> 
          <td>${item.statusPublish} </td> 
          <td>${item.tamwilDir} </td> 
          <td>${item.editor} </td> 
          <td>${item.journal} </td> 
          <td> <button class="btn btn-danger" onclick="deleteItem('${
            item._id
          }')"> حذف</button> </td> 
        </tr> 
        `;
  });
}

function deleteItem(id) {
  console.log(id);
  fetch("/api/searches/" + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => getSearches());
}

let printBtn = document.querySelector("#print");

if (printBtn) {
  printBtn.onclick = function () {
    window.print();
  };
}

function html_table_to_excel(type) {
  var data = document.querySelector("#data");
  console.log(data);

  var file = XLSX.utils.table_to_book(data, { sheet: "sheet1" });

  XLSX.write(file, { bookType: type, bookSST: true, type: "base64" });

  XLSX.writeFile(file, "search." + type);
}

const export_button = document.getElementById("export_button");

if (export_button) {
  export_button.addEventListener("click", () => {
    html_table_to_excel("xlsx");
  });
}
