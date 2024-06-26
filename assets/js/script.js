$(document).ready(function() {
    // Initialize Materialize components
    $('.modal').modal();
    $('select').formSelect();

    // Variable to store fetched deals data
    var dealsData;

    // Function to fetch deals from CheapShark API
    function fetchDeals() {
        var sortValue = $('#sortSelect').val(); // Get selected sort option
        var storeID = $('#storeSelect').val(); // Get selected store ID
        var searchTerm = $('#searchInput').val().trim().toLowerCase(); // Get search term
        var sortBy = 'price';
        var desc = sortValue === 'price_desc' ? 1 : 0;

        var settings = {
            url: 'https://www.cheapshark.com/api/1.0/deals',
            method: 'GET',
            data: {
                sortBy: sortBy, // Sort by price
                desc: desc, // Sort order
                pageSize: 100 // Number of deals per page
            },
            timeout: 0
        };

        // Only include storeID if a specific store is selected
        if (storeID) {
            settings.data.storeID = storeID;
        }

        $.ajax(settings)
        .done(function(response) {
            console.log(response);
            dealsData = response; // Store fetched data in dealsData variable
            displayDeals(dealsData, searchTerm); // Pass search term to displayDeals function
        })
        .fail(function(xhr, status, error) {
            console.error('Request failed:', status, error);
        });
    }

    // Function to display fetched deals on the webpage
    function displayDeals(deals, searchTerm = '') {
        var dealListElement = $('#dealList');
        dealListElement.empty(); // Clear previous deals

        // Filter deals based on search term
        var filteredDeals = deals.filter(function(deal) {
            return deal.title.toLowerCase().includes(searchTerm);
        });

        filteredDeals.forEach(function(deal) {
            var storeName = getStoreName(deal.storeID); // Get store name from store ID

            var dealItem = `
                <div class="deal-item">
                    <div class="deal-title">${deal.title}</div>
                    <div class="store-name">Store: ${storeName}</div>
                    <div class="price">Price: $${deal.salePrice}</div>
                </div>
            `;
            dealListElement.append(dealItem);
        });
    }

    // Function to get store name from store ID
    function getStoreName(storeID) {
        var storeName;
        switch (storeID) {
            case '1':
                storeName = 'Steam';
                break;
            case '2':
                storeName = 'GamersGate';
                break;
            case '3':
                storeName = 'GreenManGaming';
                break;
            case '4':
                storeName = 'Amazon';
                break;
            case '5':
                storeName = 'GameStop';
                break;
            case '6':
                storeName = 'Direct2Drive';
                break;
            case '7':
                storeName = 'GOG';
                break;
            case '8':
                storeName = 'Origin';
                break;
            case '9':
                storeName = 'Get Games';
                break;
            case '10':
                storeName = 'Shiny Loot';
                break;
            case '11':
                storeName = 'Humble Store';
                break;
            case '12':
                storeName = 'Desura';
                break;
            case '13':
                storeName = 'Uplay';
                break;
            case '14':
                storeName = 'IndieGameStand';
                break;
            case '15':
                storeName = 'Fanatical';
                break;
            case '16':
                storeName = 'Gamesrocket';
                break;
            case '17':
                storeName = 'Games Republic';
                break;
            case '18':
                storeName = 'SilaGames';
                break;
            case '19':
                storeName = 'Playfield';
                break;
            case '20':
                storeName = 'ImperialGames';
                break;
            case '21':
                storeName = 'WinGamesStore';
                break;
            case '22':
                storeName = 'FunStockDigital';
                break;
            case '23':
                storeName = 'GameBillet';
                break;
            case '24':
                storeName = 'Voidu';
                break;
            case '25':
                storeName = 'Epic Games Store';
                break;
            case '26':
                storeName = 'Razer Game Store';
                break;
            case '27':
                storeName = 'Gamesplanet';
                break;
            case '28':
                storeName = 'Gamesload';
                break;
            case '29':
                storeName = '2game';
                break;
            case '30':
                storeName = 'IndieGala';
                break;
            case '31':
                storeName = 'Blizzard Shop';
                break;
            case '32':
                storeName = 'AllYouPlay';
                break;
            case '33':
                storeName = 'DLGamer';
                break;
            case '34':
                storeName = 'Noctre';
                break;
            case '35':
                storeName = 'DreamGame';
                break;
            default:
                storeName = 'Unknown';
                break;
        }
        return storeName; // Return the store name
    }

    // Event listener for applying filters
    $('#applyFiltersBtn').on('click', function() {
        fetchDeals(); // Fetch deals based on selected filters
        $('#modal1').modal('close'); // Close modal after applying filters
    });
});
