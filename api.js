// Defining async function
async function getapi(phoneNumber) {
    try {
        // Use the phone number to construct the API URL
        const api_url = `https://api.searchmate.info/leads/${encodeURIComponent(phoneNumber)}#find`;
        const currentUrl = window.location.href;

        // Storing response
        const response = await fetch(api_url);

        if (response.ok) {
            // Get the response text
            const responseText = await response.text();

            // Try to parse the response as JSON
            try {
                var data = JSON.parse(responseText);
            } catch (error) {
                // Redirect to the error page if the response is not a valid JSON string
                window.location.href = 'error.html#' + encodeURIComponent(phoneNumber);
                return;
            }
            console.log(data);

            document.querySelector('.spinner-border').remove();
            document.querySelector('#people-section').classList.remove('hidden');
            document.title = `${data['Phone']} | SearchMate Phone, Name, Address Search`;
            document.querySelector('#person-number').innerHTML = `<a href="${currentUrl}">${data['Phone']}</a>`;
            document.querySelector('#api-first-name p').innerHTML = data['First Name'];
            document.querySelector('#api-middle-name p').innerHTML = data['Middle Initial'];
            document.querySelector('#api-last-name p').innerHTML = data['Last Name'];
            document.querySelector('#api-phone p').innerHTML = data['Phone'];
            document.querySelector('#api-address p').innerHTML = data['Physical Address'];
            document.querySelector('#api-city p').innerHTML = data['Physical City'];
            document.querySelector('#api-zip p').innerHTML = data['Physical ZIP'];
            document.querySelector('#api-state p').innerHTML = data['Physical State'];
            document.querySelector('#api-gender p').innerHTML = data['Gender'];
            document.querySelector('#api-stay-years p').innerHTML = data['Length of Residency'];
            document.querySelector('#api-city p').innerHTML = data['Physical City'];
            document.querySelector('#api-house-income p').innerHTML = data['Estimated Household Income'];
            document.querySelector('#api-market-value p').innerHTML = data['Home Market Value'];
            document.querySelector('#map').innerHTML = `
		<iframe style="border:0; width: 100%; height: 340px;" src="https://maps.google.com/maps?q=${data['Latitude']},${data['Longitude']}&hl=es&z=14&amp;output=embed" frameborder="0" allowfullscreen></iframe>`;
        } else {
            // Redirect to the error page
            window.location.href = 'error.html#' + encodeURIComponent(phoneNumber);
            return;
        }
    } catch (error) {
        // Log the error to the console
        console.error(error);

        // Redirect to the error page
        window.location.href = 'error.html#' + encodeURIComponent(phoneNumber);
    }
}

// Get the phone number from the query string
let phoneNumber = new URLSearchParams(window.location.search).get('number');

let phoneNumberRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
if (phoneNumberRegex.test(phoneNumber)) {
    getapi(phoneNumber);
} else {
    window.location.href = 'error.html#' + encodeURIComponent(phoneNumber);
}