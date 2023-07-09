let currentIndex = 0
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
            else{
                showItem(items.length-1)
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
        preloader.style.display = 'none';
        var container1 = document.getElementById("newsItem");       
        const item = items[index];
        console.log(item)
        const variables = [item.originID, item.canonicalUrl, item.ampUrl, item.cdnAmpUrl];
        let validUrl = null;
        for (let i = 0; i < variables.length; i++) {
            const variable = variables[i];
            if (isValidUrl(variable)) {
                validUrl = variable;
                break;
            }
        }
        var { hostname } = new URL(validUrl);

        // const imgRegex = /<img\b[^>]*>/gi;
        let contentText = item.summary ? removeHtmlTags(item.summary).slice(0,150) +"[..]" : ``;

        container1.innerHTML = `
        <div class="card bg-img">
        <div class="p-4 h-100 d-flex align-items-center">
        <div class="container p-2">
            <small class="mb-1" style="color: #ffc61a">worldiq.app</small>
            <div class="col-12"><img src="${item.visual}" loading="lazy" class="img-fluid rounded" alt="..." style="width:90vw;height:35vh; object-fit:cover" onerror="removeImage(this)"></div> 
            <div class="col-12"><h2 class="text-white lead mt-2" id="tw${index}"> ${item.title}</h2></div> 
            <p class="mt-4">${contentText}</p>         
            <div><p><small style="color:rgb(0, 221, 255)">Swipe up for details <span class="transition-container"><span class="transition-element">^</span></span> </small></p></div>            
          </div>
        </div>  
      </div>
        `
    } catch (err) {
        console.log(err.stack);
    }
}


function leftArrowClick(){
    if (currentIndex > 0) {
        currentIndex--;
        showItem(currentIndex);
    }else{
        showItem(items.length-1)
    }
}
function rightArrowClick(){
    if (currentIndex < items.length - 1) {
        currentIndex++;
        showItem(currentIndex);
    } else {
        showItem(0);
    }
}


getData();

async function getData() {
    items = [];
    if (!getLocalStorage("MostReadNews")) {
        fetch("https://worldiq-top-feed.t1m3.workers.dev/?format=json")
            .then(response => response.json())
            .then(data => { items = data; setLocalStorage("MostReadNews", data, 30 * 60000)})
            .then(()=>console.log("MostReadDataSaved"))
            .then(()=>showItem(0))
    }else{
        items = getLocalStorage("MostReadNews");
        showItem(0)
    }

    

}


function removeImage(imgElement) {
    imgElement.remove();
}

// URL validation function
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

function removeHtmlTags(str) {
    const element = document.createElement('div');
    element.innerHTML = str;
    return element.textContent || element.innerText;
}
  
function toggleMenuContainer() {
    var menuContainer = document.querySelector('.menu-container');
    menuContainer.style.display = menuContainer.style.display === 'none' ? 'block' : 'none';
}

 