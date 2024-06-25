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

            //turn the store ID into the store name with a fancy if else block
            let storeName;
            switch(deal.storeID){
                case "1":
                    storeName = "Steam";
                    break;
                case "2":
                    storeName = "GamersGate";
                    break;
                case "3":
                    storeName = "GreenManGaming";
                    break;
                case "4":
                    storeName = "Amazon";
                    break;
                case "5":
                    storeName = "GameStop";
                    break;
                case "6":
                    storeName = "Direct2Drive"
                    break;
                case "7":
                    storeName = "GOG";
                    break;
                case "8":
                    storeName = "Origin";
                    break;
                case "9":
                    storeName = "Get Games";
                    break;
                case "10":
                    storeName = "Shiny Loot";
                    break;
                case "11":
                    storeName = "Humble Store";
                    break;
                case "12":
                    storeName = "Desura";
                    break;
                case "13":
                    storeName = "Uplay";
                    break;
                case "14":
                    storeName = "IndieGameStand";
                    break;
                case "15":
                    storeName = "Fanatical";
                    break;
                case "16":
                    storeName = "Gamesrocket";
                    break;
                case "17":
                    storeName = "Games Republic";
                    break;
                case "18":
                    storeName = "SilaGames";
                    break;
                case "19":
                    storeName = "Playfield";
                    break;
                case "20":
                    storeName = "ImperialGames";
                    break;
                case "21":
                    storeName = "WinGamesStore";
                    break;
                case "22":
                    storeName = "FunStockDigital";
                    break;
                case "23":
                    storeName = "GameBillet";
                    break;
                case "24":
                    storeName = "Voidu";
                    break;
                case "25":
                    storeName = "Epic Games Store";
                    break;
                case "26":
                    storeName = "Razer Game Store";
                    break;
                case "27":
                    storeName = "Gamesplanet";
                    break;
                case "28":
                    storeName = "Gamesload";
                    break;
                case "29":
                    storeName = "2game";
                    break;
                case "30":
                    storeName = "IndieGala";
                    break;
                case "31":
                    storeName = "Blizzard Shop";
                    break;
                case "32":
                    storeName = "AllYouPlay";
                    break;
                case "33":
                    storeName = "DLGamer";
                    break;
                case "34":
                    storeName = "Noctre";
                    break;
                case "35":
                    storeName = "DreamGame";
                    break;  
                default:
                    storeName = "Missed"
            }

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

    // Call fetchDeals function when the page loads
    fetchDeals();
});
