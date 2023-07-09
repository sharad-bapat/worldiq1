

// Create a new div element
const modalContainer = document.createElement('div');

// Set the inner HTML of the div to the provided code
modalContainer.innerHTML = `
  <!-- Fullscreen Modal For details -->
  <div class="modal fade" id="fullscreenModal" tabindex="-1" aria-labelledby="fullscreenModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen-md-down" style="background-color: #242424;">
      <div class="modal-content" style="background-color: #242424;">
        <div class="modal-header">
          <h6 class="modal-title" id="fullscreenModalLabel" style="color:#fff">Details</h6>
          <button class="btn btn-sm btn-danger" type="button" data-bs-dismiss="modal" aria-label="Close" onclick="closeModal()" style="background-color:red; color:#fff">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16" style="color:#fff">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
          </button>
        </div>
        <div class="modal-body" style="background-color: #242424;color:#fff">
          <p class="mb-2 mt-4" style="color: #ffc61a">worldiq.app</p>
          <!-- <div class="col-12"><h6 class="text-white lead mt-2" id="detailstitle"></h6></div> -->
          <!-- <div class="col-12"><img id="detailsimgSrc" src="#" class="img-fluid rounded" alt="..." style="width:90vw; max-height:200px; object-fit:cover"></div>  -->
          <p class="my-4 text-white"  id="detailsdesc" style="color:#fff"></p>
          <p class="my-4" id="detailsurl"></p>
        </div>
        <div class="modal-footer">          
          <button type="button" data-bs-dismiss="modal" aria-label="Close" onclick="closeModal()" style="background-color:red; color:#fff">Close</button>
        </div>
      </div>
    </div>
  </div>
`;

// Append the created div to the body element
document.body.appendChild(modalContainer);


const modalElement = document.querySelector('#fullscreenModal');


function openModal(item) {

  // Get the modal element
  const modal = document.getElementById('fullscreenModal');
  const title = item.title
  const imgSrc = item.visual
  const desc = item.content
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
  let contentText = item.summary ? removeHtmlTags(item.summary).slice(0, 150) + "[..]" : ``;

  // Set the modal content
  document.getElementById("detailsdesc").innerHTML = "";
  document.getElementById("detailsurl").innerHTML = `via: <a href="${validUrl}" target="_blank"  style="color:rgb(0, 221, 255);text-decoration:underline">${hostname}</a>`;
  document.getElementById("detailsdesc").innerHTML = `<div class="col-12"><img src="${imgSrc}" class="img-fluid rounded" alt="..." style="width:90vw;height:200px; object-fit:cover" onerror="removeImage(this)"></div> 
    <div class="d-flex align-items-center" style="width:50vw; margin:auto">
          ${contentText}
    </div>`
  fetch(`https://api-panda.com/v2/feeds/story/full?url=${validUrl}`)
    .then(data => data.json())
    .then(results => {
      if (results.data) {
        if (results.data.html.includes("<img")) {
          document.getElementById("detailsdesc").innerHTML = `
            <p class="small my-2" style="color:#e9e9e9 !important">${results.data.html}</p>
         `;

        } else {
          if (imgSrc) {
            document.getElementById("detailsdesc").innerHTML = `
            <div class="col-12"><img src="${imgSrc}" class="img-fluid rounded" alt="..." style="width:90vw; max-height:200px; object-fit:cover"></div>
            <p class="small my-2" style="color:#e9e9e9 !important">${results.data.html}</p>
         `;
          } else {
            document.getElementById("detailsdesc").innerHTML = `            
            <p class="small my-2" style="color:#e9e9e9 !important">${results.data.html}</p>
         `;
          }

        }
      } else {
        fetch(`https://metascraper.t1m3.workers.dev/?url=${validUrl}`)
          .then(data => data.json())
          .then(results => {
            if (results.textContent) {
              document.getElementById("detailsdesc").innerHTML = ` 
              <div class="col-12"><h6 class="text-white">${results.title}</h6></div>
              <div class="col-12"><img src="${results.image}" class="img-fluid rounded" alt="..." style="width:90vw; max-height:200px; object-fit:cover"></div>                  
              <p class="text-white">${results.description}</p>
              <p class="small my-2" style="color:#e9e9e9 !important">${results.textContent}</p>
            `;
            } else {
              document.getElementById("detailsdesc").innerHTML = "";
            }
            document.getElementById("detailsurl").innerHTML = `via: <a href="${validUrl}" target="_blank"  style="color:rgb(0, 221, 255);text-decoration:underline">${hostname}</a>`
          })
          .catch(error => console.log(error));
      }


    })
    .catch(error => console.log(error));

  // Show the modal
  modal.style.display = 'block';

}

function closeModal() {
  // Get the modal element
  const modal = document.getElementById('fullscreenModal');
  // Hide the modal
  modal.style.display = 'none';
}
