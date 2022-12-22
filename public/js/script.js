// get inputs
let searcherName = document.querySelector("#name");
let searcherEmail = document.querySelector("#email");
let searcherJobNumber = document.querySelector("#job-number");
let searchTerm = document.querySelector("#search-term");
let scopusId = document.querySelector("#scopus-id");
let wosId = document.querySelector("#wos-id");
let researchGateId = document.querySelector("#research-gate-id");
let membersNumber = document.querySelector("#members-number");
let addCoriatMembers = document.querySelector("#add-coriat-members");
let gofMembers = document.querySelector("#gof-members");
let addGofMembers = document.querySelector("#add-gof-members");
let magName = document.querySelector("#mag-name");
let magPage = document.querySelector("#mag-page");
let doi = document.querySelector("#doi");
let journal = document.querySelector("#journal");
let date = document.querySelector("#date");
let factor = document.querySelector("#factor");
let citations = document.querySelector("#citations");

let statusPublish = document.querySelectorAll("[name=status]");
let dp = document.querySelectorAll("[name=department]");
let shatr = document.querySelectorAll("[name=satr]");
let gofMember = document.querySelectorAll("[name=gof-member]");
let dbEle = document.querySelectorAll("[name=db]");
let editor = document.querySelectorAll("[name=editor]");
let mgStars = document.querySelectorAll("[name=mg-stars]");
let searchTmwil = document.querySelectorAll("[name=search-tmwil]");
let tamwilDir = document.querySelector("[name=tamwil]");
// let sampleFile = document.querySelectorAll("[name=sampleFile]");
// Array.from(editor).find((x) => x.checked == true).value
let formSubmit = document.querySelector("#form-submit");

formSubmit.addEventListener("submit", addSearchToDb);

function addSearchToDb(e) {
  e.preventDefault();
  let searchData = {
    name: searcherName.value,
    email: searcherEmail.value,
    jobNumber: searcherJobNumber.value,
    searchTerm: searchTerm.value.toLowerCase(),
    scopusId: scopusId.value,
    wosId: wosId.value,
    researchGateId: researchGateId.value,
    membersNumber: membersNumber.value,
    addCoriatMembers: addCoriatMembers.value,
    gofMembers: gofMembers.value,
    addGofMembers: addGofMembers.value,
    magName: magName.value,
    magPage: magPage.value,
    doi: doi.value,
    date: date.value,
    factor: factor.value,
    journal: journal.value,
    tamwilDir: tamwilDir.value,

    citations: citations.value,
    statusPublish: Array.from(statusPublish).find((x) => x.checked == true)
      .value,
    dp: Array.from(dp).find((x) => x.checked == true).value,
    shatr: Array.from(shatr).find((x) => x.checked == true).value,
    gofMember: Array.from(gofMember).find((x) => x.checked == true).value,
    dbEle: Array.from(dbEle).find((x) => x.checked == true).value,
    mgStars: Array.from(mgStars).find((x) => x.checked == true).value,
    searchTmwil: Array.from(searchTmwil).find((x) => x.checked == true).value,
    editor: Array.from(editor).find((x) => x.checked == true).value,
  };

  fetch("/api/searches", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        document.querySelector("#err").innerHTML = data.error;
        document.querySelector("#err-msg").style.display = "block";
        document.querySelector("#success").style.display = "none";
      } else {
        if (window.location.pathname === "/enlang") {
          window.location.href = "/done_en";
        } else {
          window.location.href = "/done";
        }
        // const fd = new FormData();
        // fd.append("file", sampleFile.files[0]);

        // fetch("/upload-file", {
        //   method: "POST",
        //   body: fd,
        // })
        //   .then((res) => res.json())
        //   .then((json) => {
        //     if (json.status) {
        //       window.location.href = "/done";
        //     }
        //   })
        //   .catch((err) => console.error(err));
      }
    })
    .catch((err) => {});
}
