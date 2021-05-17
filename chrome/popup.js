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

//creates city dropdown elements
  fetch('http://localhost:8083/countries')
    .then(response => response.json())
    .then(countries => {
      for (let i = 0; i < countries.length; i++) {
        let countriesDropdown = document.getElementById("countries")
        let countryOption = document.createElement("option")
        countryOption.value = countries[i].name
        countryOption.id = countries[i].id
        countriesDropdown.append(countryOption)
      }
    });

//removes all child nodes
function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
//creates city dropdown elements
  document.getElementById("input__country").addEventListener('change', (event) => {
    //clears all city options so cities from other countries are not there when a user selects a different coutnry
    let citiesDropdown = document.getElementById("cities")
    removeAllChildNodes(cities)
    //clears selected city when user changes country
    let cityInput = document.getElementById("input__city")
    cityInput.value = ""

    if (event.target.value != "") {
      cityInput.removeAttribute("disabled")
      let selectedCountryId = document.querySelector(`[value=${event.target.value}]`)
      fetch(`http://localhost:8083/findCitiesByCountryId/${selectedCountryId.id}`)
        .then(response => response.json())
        .then(cities => {
          for (let i = 0; i < cities.length; i++) {
            //let citiesDropdown = document.getElementById("cities")
            let cityOption = document.createElement("option")
            cityOption.value = cities[i].name
            cityOption.id = cities[i].id
            citiesDropdown.append(cityOption)
          }
          //alerts me if a country has cities with the same name
          let citiesArr = []
          for (let j = 0; j < cities.length; j++) {
            citiesArr.push(cities[j].name)
          }
          let uniqueCities = [...new Set(citiesArr)]
          if(citiesArr.length != uniqueCities.length){
            alert("Duplicate Cities")
          }
        })
    } else {
      document.getElementById("input__city").setAttribute("disabled", true)
    }
  })

//grabs title and url from current chrome tab
  chrome.tabs.getSelected(null, function(tab) {
    document.getElementById("title").value = tab.title;
    document.getElementById("link").value = tab.url;
  });

//grabs info from form and submits it to save article 
  document.getElementById("form").addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("submit")
    let article = {}
    article.title = document.getElementById("title").value
    article.link = document.getElementById("title").value
    let cityName = document.getElementById("input__city").value
    article.city = {}
    article.city.id = document.querySelector(`option[value="${cityName}"]`).id;
    console.log(article)
    fetch("http://localhost:8083/article", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(article)
    }).then(res => {
      console.log(JSON.stringify(article))
      console.log("Request complete! response:", res);
      });
    })

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
