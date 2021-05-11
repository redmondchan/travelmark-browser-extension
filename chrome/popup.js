window.onload = function() {
  // document.getElementById("myInput").addEventListener("click", myFunction);
  //
  // let dropdownOptions = document.getElementsByClassName("dropdown-option")
  // for(let i = 0; i < dropdownOptions.length; i++) {
  //     dropdownOptions[i].addEventListener("click", (e) => {
  //       console.log(e.currentTarget.textContent)
  //       document.getElementById("myInput").value = e.currentTarget.textContent
  //       document.getElementById("myDropdown").classList.toggle("show");
  //     })
  // }
  // console.log("add")
  fetch('http://localhost:8083/countries')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].name)
        let countriesDropdown = document.getElementById("countries")
        let option = document.createElement("option")
        option.value = data[i].name
        option.id = data[i].id
        countriesDropdown.append(option)
      }
    });
  console.log("test");
  document.getElementById("input__country").addEventListener('change', (event) => {
    if (event.target.value != "") {
      document.getElementById("input__city").removeAttribute("disabled")
    } else {
      document.getElementById("input__city").setAttribute("disabled", true)
    }
  })

  chrome.tabs.getSelected(null, function(tab) {

    document.getElementById("title").value = tab.title;
    document.getElementById("link").value = tab.url;

  });
}

// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
//   console.log("testttttttt")
// }
//
// function filterFunction() {
//   var input, filter, ul, li, a, i;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   div = document.getElementById("myDropdown");
//   a = div.getElementsByTagName("a");
//   for (i = 0; i < a.length; i++) {
//     txtValue = a[i].textContent || a[i].innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       a[i].style.display = "";
//     } else {
//       a[i].style.display = "none";
//     }
//   }
// }
