
var counterImages =1;

function addImage() {
    var image=document.createElement("img");
    var list=document.getElementById("imagesList");

    image.src= "https://placeimg.com/250/150/" + counterImages;
    list.appendChild(image);

    var counter= document.getElementById("imageCounter");
    counter.innerText= counterImages.toString();

    counterImages++;
}

function removeImage(){

}