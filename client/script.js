document.addEventListener("DOMContentLoaded", function () {
    // Get the form element, result section, and form submission button
    const form = document.getElementById("predictionForm");
    const resultSection = document.getElementById("result");
    const submitButton = document.getElementById("submitBtn");
  
    // Add event listener to the form submission
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
  });
  