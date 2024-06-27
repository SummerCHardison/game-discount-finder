$(document).ready(function () {

    // Initialize Materialize components
    $('.modal').modal();
    $('select').formSelect();

    // Variable to store fetched deals data
    var dealsData;

    //pull items from local memory if it exists
    if (localStorage.getItem("gameList")) {
        const gameList = JSON.parse(localStorage.getItem("gameList"));
        for (game of gameList) {
            const gameCard =
                `<div>
                <h3> ${game}<h3>
            </div>`;
            $('#dealList').append(gameCard);
        }
    }

    // Initialize Materialize components
    $('.modal').modal();
    $('select').formSelect();

    // Variable to store fetched deals data
    var dealsData;


    //pull items from local memory if it exists
    if(localStorage.getItem("gameList")){
        const gameList = JSON.parse(localStorage.getItem("gameList"));
        for (game of gameList){
            const gameCard =
            `<div>
                <h3> ${game}<h3>
            </div>`;
            $('#dealList').append(gameCard);
        }
    }

    // Function to fetch deals from CheapShark API
    function fetchDeals() {
        var sortValue = $('#sortSelect').val(); // Get selected sort option
        var storeID = $('#storeSelect').val(); // Get selected store ID
        var searchTerm = $('#searchInput').val().trim().toLowerCase(); // Get search term, the title
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

        //change the url if there are parameter
        //needs to be nested to avoid multiple '?'
        if (storeID) { //check if there is a store id
            if (searchTerm) { //check for game title
                let searchTermJoined = searchTerm.replace(' ', '%20'); //turn the title into a string seperated by %20 b/c that is how the api needs it
                let parameter = 'title=' + searchTermJoined; //make a string to hold the parameter
                parameter = parameter + '&' + (storeID - 1); //store id is 1 higher than store number for search
                settings.url = 'https://www.cheapshark.com/api/1.0/deals' + '?' + parameter; //change the url to reflect the parameters
            }
            else {
                settings.url = 'https://www.cheapshark.com/api/1.0/deals' + '?' + (storeID - 1); //just add the store data
            }
        }
        else if (searchTerm) { //just add the title
            let searchTermJoined = searchTerm.replace(' ', '%20');
            let parameter = 'title=' + searchTermJoined; //make a string to hold the parameter
            settings.url = 'https://www.cheapshark.com/api/1.0/deals' + '?' + parameter;
        }

        //local memory management
        if (searchTerm) {
            //check if local memory exists
            if (localStorage.getItem("gameList")) { //if yes, add to local memory
                let gameList = JSON.parse(localStorage.getItem("gameList"));
                if (!(gameList.includes(searchTerm))) { //check if the entry is in the array already
                    gameList.push(searchTerm);
                    localStorage.setItem("gameList", JSON.stringify(gameList));
                }
            }
            else { //if no, create memory array
                let gameList = [searchTerm];
                localStorage.setItem("gameList", JSON.stringify(gameList));
            }
        }

        // Only include storeID if a specific store is selected
        if (storeID) {
            settings.data.storeID = storeID;
        }
        console.log(settings);
        $.ajax(settings)
            .done(function (response) {
                console.log(response);
                dealsData = response; // Store fetched data in dealsData variable
                displayDeals(dealsData, searchTerm); // Pass search term to displayDeals function
            })
            .fail(function (xhr, status, error) {
                console.error('Request failed:', status, error);
            });
    }


    // Function to display fetched deals on the webpage
    function displayDeals(deals, searchTerm = '') {
        var dealListElement = $('#dealList');
        dealListElement.empty(); // Clear previous deals


        // Filter deals based on search term
        var filteredDeals = deals.filter(function (deal) {
            //i think this is pointless, but the filter may do something
            return deal; //.title.toLowerCase().includes(searchTerm)
        });

        filteredDeals.forEach(function (deal) {
            var storeName = getStoreName(deal.storeID); // Get store name from store ID

            //store the deal item as an html literal
            //added the base price
            //added the steam link
            var dealItem = `
                <div class="row deal-item valign-wrapper">
                    <img class="col s2" src=${deal.thumb} alt="Image Thumbnail"> 
                    <div class="col s10"> 
                        <div class="deal-title">${deal.title}</div>
                        <div class="store-name">Store: ${storeName}</div>
                        <div class="price">Discount Price: $${deal.salePrice}</div>
                        <div class="base-price">Base Price: $${deal.normalPrice}</div>
                        <a href="https://store.steampowered.com/app/${deal.steamAppID}" class="steam-link"> Steam Link </a>
                    </div>
                </div>
            `;
            //add the new entry to the html
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

    // Modal functionality
    var modal = $('#myModal');
    var openModalBtn = $('#openModalBtn');
    var closeModalBtn = $('.close');
    var applyFiltersBtn = $('#applyFiltersBtn');
    var sortSelect = $('#sortSelect');
    var storeSelect = $('#storeSelect');
    var searchInput = $('#searchInput');

    openModalBtn.on('click', function() {
        modal.css('display', 'block');
    });

    closeModalBtn.on('click', function() {
        modal.css('display', 'none');
    });

    window.onclick = function(event) {
        if (event.target === modal[0]) {
            modal.css('display', 'none');
        }
    };

    // Event listener for applying filters
    $('#applyFiltersBtn').on('click', function () {
        fetchDeals(); // Fetch deals based on selected filters
        $('#modal1').modal('close'); // Close modal after applying filters
    });

    //the side bard free things
    function freeDeals() {
        

        const url = 'https://gamerpower.p.rapidapi.com/api/filter?&type=game';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '6d70cf00a3msh2af3f6a737a8eafp173c58jsn6abc269c9605',
                'x-rapidapi-host': 'gamerpower.p.rapidapi.com'
            }
        };

        try {
            const response = fetch(url, options).then( function(response){
                console.log(response);
                return response.json();
                
            })
            .then(function (data){
                const listTarget = $('#slide-out');
                console.log(data);
                //append to html id slide out it is an unordered list
                for (item of data){
                    //img class="col s2" src=${deal.thumb} alt="Image Thumbnail"> 
                    
                    const freeGame =`
                    <li>
                        <img src=${item.thumbnail} alt="Game Thumbnail">
                        <p>${item.title} <p>
                        <p>Normal price: ${item.worth}<p>
                        <a href=${item.open_giveaway_url}> Link to game </a>
                    </li>
                    `
                    $('#slide-out').append(freeGame);

                }
            })
        } catch (error) {
            console.error(error);
        }

    }

    freeDeals();

});

    //the side bard free things
    function freeDeals() {
        // https://gamerpower.com/api
        ///giveaways?sort-by={sort_name}
        ///giveaways?type={type_name}
        //to find free games sorted by value descending: https://www.gamerpower.com/api/giveaways?sort-by=value&type=game
        //https://rapidapi.com/digiwalls/api/gamerpower/giveaways?sort-by=value&type=game
        // const powerUrl = `https://www.gamerpower.com/api/giveaways`;
        // fetch(powerUrl)
        //     .then(function (response){
        //         console.log(response);
        //         return response.json();
        //     })
        //     .then(function (data){
        //         console.log(data);
        //     })

        // var powerSettings = {
        //     url: 'https://www.gamerpower.com/api/giveaways?sort-by=value&type=game',
        //     method: 'GET',
        //     data: {
        //         // sortBy: sortBy, // Sort by price
        //         // desc: desc, // Sort order
        //         pageSize: 100 // Number of deals per page
        //     },
        //     timeout: 0
        // };

        // $.ajax(powerSettings)
        // .done(function(response) {
        //     console.log(response);
        //     // dealsData = response; // Store fetched data in dealsData variable
        //     // displayDeals(dealsData, searchTerm); // Pass search term to displayDeals function
        // })
        // .fail(function(xhr, status, error) {
        //     console.error('Request failed:', status, error);
        // });

        const url = 'https://gamerpower.p.rapidapi.com/api/filter?&type=game';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '6d70cf00a3msh2af3f6a737a8eafp173c58jsn6abc269c9605',
                'x-rapidapi-host': 'gamerpower.p.rapidapi.com'
            }
        };

        try {
            const response = fetch(url, options).then( function(response){
                console.log(response);
                return response.json();
                
            })
            .then(function (data){
                console.log(data);
            })
        } catch (error) {
            console.error(error);
        }

    }

    freeDeals();

});
