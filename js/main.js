const maincontainer = document.querySelector("#main-container");
//Gábor's one liner solution
//const fetchMock = async () => await (await fetch(api_url)).json();
//My solution
const fetchMock = async () => {
  const api_url = "https://my.api.mockaroo.com/w3.json?key=55760d70";
  const res = await fetch(api_url);
  return await res.json();
};

const dataMapping = async () => {
  const payload = await fetchMock();
  maincontainer.style.display = "flex";
  document.querySelector("#loading-div").style.display = "none";
  let dataDisplay = payload
    .map((object) => {
      const { image, name, state, email, phonenumber } = object;
      return `<tr id=table-elements>
      <td class=data-element id="data-img"><img src="${image}" id="image"></img></td>
    <td class="data-element" id="data-name">${name}</td>
    <td class="data-element" id="data-state">${state}</td>
    <td class="data-element" id="data-email">${email}</td>
    <td class="data-element" id="data-phonenumber">${phonenumber}</td>
    </tr>
    `;
    })
    .join("");
  const body = document.querySelector("#table");
  body.innerHTML += dataDisplay;
};

function hideItems() {
  window.onload = function () {
    maincontainer.style.display = "none";
  };
}

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.querySelector("#table");
  switching = true;
  dir = "ascend";
  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;

      x = rows[i].getElementsByTagName("td")[n + 1];
      y = rows[i + 1].getElementsByTagName("td")[n + 1];

      if (dir == "ascend") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "descend") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "ascend") {
        dir = "descend";
        switching = true;
      }
    }
  }
}

function run() {
  hideItems();
  dataMapping();
}

run();
