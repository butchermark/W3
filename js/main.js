const body = document.querySelector("#datas");
const api_url = "https://my.api.mockaroo.com/w3.json?key=55760d70";
const fetchMock = async () => {
  const res = await fetch(api_url);
  const data = await res.json();
  return data;
};

const dataMapping = async () => {
  const payload = await fetchMock();

  let dataDisplay = payload
    .map((object) => {
      const { name, state, email, phonenumber } = object;

      return `<div class="container>
    <p>Name: ${name}</p>
    <p>State: ${state}</p>
    <p>Email: ${email}</p>
    <p>Phone: ${phonenumber}</p>
    </div>`;
    })
    .join("");
  body.innerHTML = dataDisplay;
};

dataMapping();
