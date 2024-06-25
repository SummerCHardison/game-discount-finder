$(document).ready(function() {
    var apiKey = 'YOUR_API_KEY'; // Replace with your actual CheapShark API key

    // Function to fetch deals from CheapShark API
    function fetchDeals() {
        var settings = {
            "url": `https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=Price&desc=0&pageSize=10&apiKey=${apiKey}`,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings)
        .done(function (response) {
            console.log(response);
            displayDeals(response);
        })
        .fail(function (xhr, status, error) {
            console.error("Request failed:", status, error);
        });
    }

    // Function to display fetched deals on the webpage
    function displayDeals(deals) {
        var dealListElement = $('#dealList');

        deals.forEach(function(deal) {
            var dealItem = `
                <div class="deal-item">
                    <div class="deal-title">${deal.title}</div>
                    <div class="store-name">Store: ${deal.storeName}</div>
                    <div class="price">Price: $${deal.salePrice}</div>
                </div>
            `;
            dealListElement.append(dealItem);
        });
    }

    // Call fetchDeals function when the page loads
    fetchDeals();
});
