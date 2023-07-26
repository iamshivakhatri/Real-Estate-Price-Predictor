 /*function getPrice(){
// Prevent the form from submitting normally
  
      // Get form values
      const totalSqft = parseFloat(form.total_sqft.value);
      const bhk = parseInt(form.bhk.value);
      const bath = parseInt(form.bath.value);
      const location = form.location.value;

      $.post( "http://localhost:5000/predict_home_prices", {
        total_sqft: totalSqft,
        bhk: bhk,
        bath: bath,
        location: location
      }, 
      function( data ) {
          console.log("check me out", data.estimated_price);
          resultSection.style.display = "block";
          const estimatedPriceElement = document.getElementById("estimatedPrice");
          estimatedPriceElement.innerText = "Estimated Price: $" + data.estimated_price;
      });
 }
 **/

const form = document.getElementById("predictionForm");
const resultSection = document.getElementById("result");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form values
    const totalSqft = parseFloat(form.total_sqft.value);
    const bhk = parseInt(form.bhk.value);
    const bath = parseInt(form.bath.value);
    const location = form.location.value;

 

    // Make an API call to the server to get the estimated price
    fetch("http://localhost:5000/predict_home_prices", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Set the content type to form data
      },
      body: new URLSearchParams({ // Convert the form data to URL-encoded format
        total_sqft: totalSqft,
        bhk: bhk,
        bath: bath,
        location: location,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the result
         console.log("check me out", data.estimated_price);
          resultSection.style.display = "block";
          const estimatedPriceElement = document.getElementById("estimatedPrice");
          estimatedPriceElement.innerText = "Estimated Price: $" + data.estimated_price;
        
      })
      .catch((error) => {
        console.error("Error fetching estimated price:", error);
        // Optionally, display an error message if the request fails
      });
  });


function onPageLoad() {
    console.log("Document Loaded");
    let url = "http://localhost:5000/get_location_names";
  
    $.get(url, function (data, status) {
      console.log("got response for get_location_names request");
      if (data) {
        let locations = data.locations;
        let uiLocation = document.getElementById("uiLocation");
        $('#uilocation').empty();
        for (let i in locations[0]) {
          let opt = new Option(locations[0][i]);
          $('#uiLocation').append(opt);
        }
      }
    });
  }
  
  window.onload = onPageLoad;
  