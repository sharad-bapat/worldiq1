const params = new URLSearchParams(window.location.search);
const c = params.get('c')
let currentIndex = 0;
let items = [];
const preloader = document.querySelector('.preloader');
// Show the preloader before the fetch call
preloader.style.display = 'block';

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
        console.log(item)

      
        container1.innerHTML = `
        <div class="card bg-img">
        <div class="p-4 h-100 d-flex align-items-center">
        <div class="container p-2">
            <small class="mb-1" style="color: #ffc61a">worldiq.app</small>             
            <div class="col-12"><h2 class="text-white mt-2"> ${item.title}</h2></div>                    
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


function leftArrowClick() {
    if (currentIndex > 0) {
        currentIndex--;
        showItem(currentIndex);
    } else {
        showItem(items.length - 1)
    }
}
function rightArrowClick() {
    if (currentIndex < items.length - 1) {
        currentIndex++;
        showItem(currentIndex);
    } else {
        showItem(0);
    }
}


if (!c) {
    document.title = "Top News | World IQ - The pulse of now";   
}
else if (c && c == `hindi`) {
    document.title = "Hindi News | World IQ - The pulse of now";    
}
else if (c && c == `marathi`) {
    document.title = "Marathi News | World IQ - The pulse of now";    
}
else if (c && c == `i`) {
    document.title = "India News | World IQ - The pulse of now";   
}
else if (c && c == `t`) {
    document.title = "Technology News | World IQ - The pulse of now";    
}
else if (c && c == `e`) {
    document.title = "Enterainment News | World IQ - The pulse of now";   
}
else if (c && c == `b`) {
    document.title = "Business News | World IQ - The pulse of now";  
}
else if (c && c == `w`) {
    document.title = "World News (2) | World IQ - The pulse of now";   
}
else if (c && c == `s`) {
    document.title = "Sports News | World IQ - The pulse of now";    
}
else if (c && c == `ai`) {
    document.title = "AI News | World IQ - The pulse of now";    
}
else if (c && c == `Hyderabad`) {
    document.title = "Hyderabad News | World IQ - The pulse of now";  
} else if (c && c == `indore`) {
    document.title = "Indore News | World IQ - The pulse of now";   
}
else {
    document.title = "Top News | World IQ - The pulse of now";  
}


getNews();
function getNews() {
    items = [];
    if(c){
        if (!getLocalStorage(`${c}News`)) {
            fetch(`https://worldiq-searchnews.t1m3.workers.dev/?&format=json&c=${c}`)
                .then(response => response.json())
                .then(data => { items = data; setLocalStorage(`${c}News`, items, 30 * 60000); showItem(0) })
                .catch(err => console.log(err));
        } else {
            items = getLocalStorage(`${c}News`)
            currentIndex = 0;
            showItem(0);
        }
    }else{
        if (!getLocalStorage(`TopNews`)) {
            fetch(`https://worldiq-searchnews.t1m3.workers.dev/?&format=json`)
                .then(response => response.json())
                .then(data => { items = data; setLocalStorage(`TopNews`, items, 30 * 60000); showItem(0)})
                .catch(err => console.log(err));
        } else {
            items = getLocalStorage(`TopNews`)
            currentIndex = 0;
            showItem(0);
        }
    }
   
}