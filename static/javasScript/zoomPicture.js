
// let browserWindowWidth;
// let browserWindowHeight;



//   function displayWindowSize(){
//     // Get width and height of the window excluding scrollbars
//     browserWindowWidth = document.documentElement.clientWidth;
//     browserWindowHeight = document.documentElement.clientHeight;

//     console.log("Width: " + browserWindowWidth + ", " + "Height: " + browserWindowHeight);
// }
 
// // Attaching the event listener function to window's resize event
// window.addEventListener("resize", displayWindowSize);

// // Calling the function for the first time
// displayWindowSize();


// if (browserWindowWidth>800) {
//   console.log('image zoom available')
  
// // This function will show the image in the lightbox
// var zoomImg = function () {
//   // Create evil image clone
//   var clone = this.cloneNode();
//   clone.classList.remove("zoomImage");

//   // Put evil clone into lightbox
//   var lb = document.getElementById("lb-img");
//   lb.innerHTML = "";
//   lb.appendChild(clone);

//   // Show lightbox
//   lb = document.getElementById("lb-back");
//   lb.classList.add("show");
// };

// window.addEventListener("load", function(){
//   // Attach on click events to all .zoomImage images
//   var images = document.getElementsByClassName("zoomImage");
//   if (images.length>0) {
//     for (var img of images) {
//       img.addEventListener("click", zoomImg);
//     }
//   }

//   // Click event to hide the lightbox
//   document.getElementById("lb-back").addEventListener("click", function(){
//     this.classList.remove("show");
//   })
// });
// }



// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}