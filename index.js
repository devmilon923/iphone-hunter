const loader = document.getElementById("spinner");
const searchData = document.getElementById("search-box");
const phoneDisplay = document.getElementById("phone-display");
const modalContent = document.getElementById("modalContent");
const showAll = document.getElementById("show-all");

function getData(status) {
  loader.style.display = "none";
  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchData.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (status) {
        viewData(data.data);
        showAll.style.display = "none";
      } else {
        showAll.style.display = "block";
        viewData(data.data.slice(0, 6));
      }
    });
}
showAll.style.display = "none";
const handleShowAll = () => {
  getData(true);
  
};
function modalData(id) {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((data) => {
      my_modal_5.showModal();
      modalContent.innerHTML = "";
      document.getElementById("name").innerText = data.data.name;
      modalContent.innerHTML = `
    <img class="pt-2 mx-auto" src=${data.data.image} />
     <p class="py-2 text-violet-700 text-lg font-bold">Main Features</p> 
  <hr>
    <p class="pt-2"><b>Storage </b> </p>
 
<p>${data.data.mainFeatures.storage}</p>

<p class="pt-2"><b>Display Size </b></p> 
<p>${data.data.mainFeatures.displaySize}</p>

<p class="pt-2"><b>ChipSet</b></p> 
<p>${data.data.mainFeatures.chipSet}</p>

<p class="pt-2"><b>Memory </b></p> 
<p>${data.data.mainFeatures.memory}</p>

<p class="py-2 text-violet-700 text-lg font-bold">Sensors</p> 
<div class="flex items-center gap-3 flex-wrap" id="sensor-list">

</div>
${
  data.data.others && data.data.others.WLAN
    ? `<div>
<p class="py-2 text-violet-700 text-lg font-bold">Others</p> 

 <p class="pt-2"><b>WLAN</b></p>
    <p>${
      data.data.others && data.data.others.WLAN ? data.data.others.WLAN : "N/A"
    }</p>

    <p class="pt-2"><b>Bluetooth</b></p>
    <p>${
      data.data.others && data.data.others.Bluetooth
        ? data.data.others.Bluetooth
        : "N/A"
    }</p>

    <p class="pt-2"><b>GPS</b></p>
    <p>${
      data.data.others && data.data.others.GPS ? data.data.others.GPS : "N/A"
    }</p>

    <p class="pt-2"><b>NFC</b></p>
    <p>${
      data.data.others && data.data.others.NFC ? data.data.others.NFC : "N/A"
    }</p>

    <p class="pt-2"><b>Radio</b></p>
    <p>${
      data.data.others && data.data.others.Radio
        ? data.data.others.Radio
        : "N/A"
    }</p>

    <p class="pt-2"><b>USB</b></p>
    <p>${
      data.data.others && data.data.others.USB ? data.data.others.USB : "N/A"
    }</p>
</div>`
    : ""
}


`;

      const sensorListDiv = document.getElementById("sensor-list");
      const sensors = data.data.mainFeatures.sensors;

      for (let sensor of sensors) {
        const sensorElement = document.createElement("b");
        sensorElement.classList =
          "px-3 py-2 bg-gray-200 text-sm rounded-lg cursor-pointer";
        sensorElement.textContent = sensor; // সেন্সরের নাম বা যেকোনো ডাটা যোগ করো
        sensorListDiv.appendChild(sensorElement);
      }
    });
}

function viewData(data) {
  phoneDisplay.innerHTML = "";
  data.forEach((product) => {
    phoneDisplay.innerHTML += `
        <div class="card bg-base-100 shadow-md">
          <figure class="px-6 pt-10">
            <img
              src=${product.image}
              alt="Shoes"
              class="rounded-md"
            />
          </figure>
          <div class="card-body px-3 items-center text-center">
            <h2 class="card-title">${product.phone_name}</h2>
            <p class="text-gray-500 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              praesentium exercitationem repudiandae?
            </p>
            <h1 class="text-xl font-bold">$9900</h1>
            <div class="card-actions">
              <button onclick="modalData('${product.slug}')" class="btn btn-primary font-bold">Show Details</button>
            </div>
          </div>
        </div>`;
  });
}
function handleSearch() {
  loader.style.display = "block";
  setTimeout(() => {
    getData();
  }, 4000);
}
