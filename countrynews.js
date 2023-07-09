let currentIndex = 0
let items = [];
const preloader = document.querySelector('.preloader');
// Show the preloader before the fetch call
preloader.style.display = 'block';
let country= "india";

var container = document.getElementById("main");
container.addEventListener('touchstart', function (event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});
container.addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;

    // calculate swipe direction
    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    // check which direction has greater distance and use that as the swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            console.log('swipe right');
            if (currentIndex > 0) {
                currentIndex--;
                showItem(currentIndex);
            }
            else {
                showItem(items.length - 1)
            }

        } else {
            console.log('swipe left');
            if (currentIndex < items.length - 1) {
                currentIndex++;
                showItem(currentIndex);
            } else {
                showItem(0);
            }
        }
    }

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY > 0) {
            console.log('swipe up');

        } else {
            console.log('swipe down');
            openModal(items[currentIndex]);
        }
    }

});

function showItem(index) {
    try {
        var container1 = document.getElementById("newsItem");
        const item = items[index];
        // console.log(item)
        
        var { hostname } = new URL(item.url);        
        container1.innerHTML = `
        <div class="card bg-img">
        <div class="d-flex align-items-center">
        <div class="container">
            <small class="mb-1" style="color: #ffc61a">worldiq.app</small>
            <div class="col-12"><img src="${item.socialimage}" class="img-fluid rounded" alt="..." style="width:90vw;height:35vh; object-fit:cover" onerror="removeImage(this)"></div> 
            <div class="col-12"><h2 class="text-white lead mt-2"> ${item.title}</h2></div>                   
            <div><p><small style="color:rgb(0, 221, 255)">Swipe up for details <span class="transition-container"><span class="transition-element">^</span></span> </small></p></div>
            <p class="text-white mb-0 mt-4">
                <span style="padding: 5px;" onclick="toggleClass(this)">
                    <i class="bi bi-hand-thumbs-up me-3 fz-24"></i>
                </span>
                <span style="padding: 5px;" onclick="toggleClass(this)">
                    <i class="bi bi-hand-thumbs-down me-3 fz-24"></i>
                </span>              
            </p>
          </div>
        </div>  
      </div>
        `

    } catch (err) {
        console.log(err.stack);
    }
}

function removeImage(imgElement) {
    imgElement.remove();
}



autocomplete();
function autocomplete() {
    var countrytags = ["Afghanistan - AF", "Akrotiri Sovereign Base Area - AX", "Albania - AL", "Algeria - AG", "American Samoa - AQ", "Andorra - AN", "Angola - AO", "Anguilla - AV", "Antarctica - AY", "Antigua and Barbuda - AC", "Argentina - AR", "Armenia - AM", "Aruba - AA", "Ashmore and Cartier Islands - AT", "Australia - AS", "Austria - AU", "Azerbaijan - AJ", "Bahamas, The - BF", "Bahrain - BA", "Baker Island - FQ", "Bangladesh - BG", "Barbados - BB", "Bassas da India - BS", "Belarus - BO", "Belgium - BE", "Belize - BH", "Benin - BN", "Bermuda - BD", "Bhutan - BT", "Bolivia - BL", "Bosnia-Herzegovina - BK", "Botswana - BC", "Bouvet Island - BV", "Brazil - BR", "British Indian Ocean Territory - IO", "British Virgin Islands - VI", "Brunei - BX", "Bulgaria - BU", "Burkina Faso - UV", "Burundi - BY", "Cambodia - CB", "Cameroon - CM", "Canada - CA", "Cape Verde - CV", "Cayman Islands - CJ", "Central African Republic - CT", "Chad - CD", "Chile - CI", "China - CH", "Christmas Island - KT", "Clipperton Island - IP", "Cocos Keeling Islands - CK", "Colombia - CO", "Comoros - CN", "Congo - CF", "Cook Islands - CW", "Coral Sea Islands - CR", "Costa Rica - CS", "Cote dIvoire - IV", "Croatia - HR", "Cuba - CU", "Cyprus - CY", "Czech Republic - EZ", "Czechoslovakia - LO", "Democratic Republic of the Congo - CG", "Denmark - DA", "Dhekelia Sovereign Base Area - DX", "Djibouti - DJ", "Dominica - DO", "Dominican Republic - DR", "East Timor - TT", "Ecuador - EC", "Egypt - EG", "El Salvador - ES", "Equatorial Guinea - GV", "Equatorial Guinea - EK", "Eritrea - ER", "Estonia - EN", "Ethiopia - ET", "Etorofu, Habomai, Kunashiri and Shikotan Islands - PJ", "Europa Island - EU", "Falkland Islands Islas Malvinas - FK", "Faroe Islands - FO", "Fiji - FJ", "Finland - FI", "France - FR", "French Guiana - FG", "French Polynesia - FP", "French Southern and Antarctic Lands - FS", "Gabon - GB", "Gambia - GA", "Gaza Strip - GZ", "Georgia - GG", "Germany - GM", "Ghana - GH", "Gibraltar - GI", "Glorioso Islands - GO", "Greece - GR", "Greenland - GL", "Grenada - GJ", "Guadeloupe - GP", "Guam - GQ", "Guatemala - GT", "Guernsey - GK", "Guinea-Bissau - PU", "Guyana - GY", "Haiti - HA", "Heard Island and McDonald Islands - HM", "Honduras - HO", "Hong Kong - HK", "Howland Island - HQ", "Hungary - HU", "Iceland - IC", "India - IN", "Indonesia - ID", "Iran - IR", "Iraq - IZ", "Ireland - EI", "Isle of Man - IM", "Israel - IS", "Italy - IT", "Jamaica - JM", "Jan Mayen - JN", "Japan - JA", "Jarvis Island - DQ", "Jersey - JE", "Johnston Atoll - JQ", "Jordan - JO", "Juan de Nova Island - JU", "Kazakhstan - KZ", "Kenya - KE", "Kingman Reef - KQ", "Kiribati - KR", "Kosovo - KV", "Kuwait - KU", "Kyrgyzstan - KG", "Laos - LA", "Latvia - LG", "Lebanon - LE", "Lesotho - LT", "Liberia - LI", "Libya - LY", "Liechtenstein - LS", "Lithuania - LH", "Luxembourg - LU", "Macau - MC", "Macedonia - MK", "Madagascar - MA", "Malawi - MI", "Malaysia - MY", "Maldives - MV", "Mali - ML", "Malta - MT", "Marshall Islands - RM", "Martinique - MB", "Mauritania - MR", "Mauritius - MP", "Mayotte - MF", "Mexico - MX", "Micronesia - FM", "Midway Islands - MQ", "Moldova - MD", "Monaco - MN", "Mongolia - MG", "Montenegro - MJ", "Montserrat - MH", "Morocco - MO", "Mozambique - MZ", "Myanmar - BM", "Namibia - WA", "Nauru - NR", "Navassa Island - BQ", "Nepal - NP", "Netherlands - NL", "Netherlands Antilles - NT", "New Caledonia - NC", "New Zealand - NZ", "Nicaragua - NU", "Niger - NG", "Nigeria - NI", "Niue - NE", "No Mans Land - NM", "Norfolk Island - NF", "North Korea - KN", "Northern Mariana Islands - CQ", "Norway - NO", "Oceans - OS", "Oman - MU", "Pakistan - PK", "Palau - PS", "Palmyra Atoll - LQ", "Panama - PM", "Papua New Guinea - PP", "Paracel Islands - PF", "Paraguay - PA", "Peru - PE", "Philippines - RP", "Pitcairn Islands - PC", "Poland - PL", "Portugal - PO", "Puerto Rico - RQ", "Qatar - QA", "Reunion - RE", "Romania - RO", "Russia - RS", "Rwanda - RW", "Saint Helena - SH", "Saint Kitts and Nevis - SC", "Saint Lucia - ST", "Saint Martin - RN", "Saint Pierre and Miquelon - SB", "Saint Vincent and the Grenadines - VC", "Saint-Barthelemy Island - TB", "Samoa - WS", "San Marino - SM", "Sao Tome and Principe - TP", "Saudi Arabia - SA", "Senegal - SG", "Serbia - RI", "Seychelles - SE", "Sierra Leone - SL", "Singapore - SN", "Slovenia - SI", "Solomon Islands - BP", "Somalia - SO", "South Africa - SF", "South Georgia and the South Sandwich Islands - SX", "South Korea - KS", "South Sudan - OD", "Spain - SP", "Spratly Islands - PG", "Sri Lanka - CE", "Sudan - SU", "Suriname - NS", "Svalbard - SV", "Swaziland - WZ", "Sweden - SW", "Switzerland - SZ", "Syria - SY", "Taiwan - TW", "Tajikistan - TI", "Tanzania - TZ", "Thailand - TH", "Togo - TO", "Tokelau - TL", "Tonga - TN", "Trinidad and Tobago - TD", "Tromelin Island - TE", "Tunisia - TS", "Turkey - TU", "Turkmenistan - TX", "Turks and Caicos Islands - TK", "Tuvalu - TV", "Uganda - UG", "Ukraine - UP", "Undersea Features - UF", "Undesignated Sovereignty - UU", "United Arab Emirates - AE", "United Kingdom - UK", "United States - US", "Uruguay - UY", "Uzbekistan - UZ", "Vanuatu - NH", "Vatican City - VT", "Venezuela - VE", "Vietnam, Democratic Republic of - VM", "Virgin Islands - VQ", "Wake Island - WQ", "Wallis and Futuna - WF", "West Bank - WE", "Western Sahara - WI", "Yemen - YM", "Zambia - ZA", "Zimbabwe - ZI"];
    var languagetags = ["Afrikaans - AFR", "Albanian - SQI", "Arabic - ARA", "Armenian - HYE", "Azerbaijani - AXE", "Bengali - BEN", "Bosnian - BOS", "Bulgarian - BUL", "Catalan - CAT", "Chinese - ZHO", "Croatian - HRV", "Czech - CES", "Danish - DAN", "Dutch - NLD", "Estonian - EST", "Finnish - FIN", "French - FRA", "Galician - GLG", "Georgian - KAT", "German - DEU", "Greek - ELL", "Gujarati - GUJ", "Hebrew - HEB", "Hindi - HIN", "Hungarian - HUN", "Icelandic - ISL", "Indonesian - IND", "Italian - ITA", "Japanese - JPN", "Kannada - KAN", "Kazakh - KAZ", "Korean - KOR", "Latvian - LAV", "Lithuanian - LIT", "Macedonian - MKD", "Malay - MSA", "Malayalam - MAL", "Marathi - MAR", "Mongolian - MON", "Nepali - NEP", "Norwegian - NOR", "NorwegianNynorsk - NNO", "Persian - FAS", "Polish - POL", "Portuguese - POR", "Punjabi - PAN", "Romanian - RON", "Russian - RUS", "Serbian - SRP", "Sinhalese - SIN", "Slovak - SLK", "Slovenian - SLV", "Somali - SOM", "Spanish - SPA", "Swahili - SWA", "Swedish - SWE", "Tamil - TAM", "Telugu - TEL", "Thai - THA", "Tibetan - BOD", "Turkish - TUR", "Ukrainian - UKR", "Urdu - URD", "Vietnamese - VIE"];

    var $inputC = $("#inputtext");
    $inputC.typeahead({
        source: countrytags,
        autoSelect: true
    });
    $inputC.on("change", (function () {
        var current = $inputC.typeahead("getActive");
        if (current) {
            if (current.toUpperCase() == $inputC.val().toUpperCase()) {
                country = current.slice(-2);
                getCountryNews(country);
            }
        }
    }));
    //   var $input = $("#languages");
    //   $input.typeahead({
    //       source: languagetags,
    //       autoSelect: true
    //   });
    //   $input.on("change",(function() {
    //       var current = $input.typeahead("getActive");
    //       if (current) {            
    //         if (current.toUpperCase() == $input.val().toUpperCase()) {
    //           languageVal = current.slice(-3);              
    //         //   $("body").css({ "opacity": "0.2" });
    //         //   getLanguageNews(value);            
    //         } 
    //       } 
    //     })); 
}

getCountryNews(country);

function getCountryNews(country) {
    if (country) {      
        const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=sourcecountry:${country}%20sourcelang:eng&mode=artlist&format=json&maxrecords=75&sort=datedesc`;
        fetch(url)
        .then(response => response.json())
        .then(data =>  {items=data.articles; showItem(0)})        
    }
}
