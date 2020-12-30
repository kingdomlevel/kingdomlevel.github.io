window.document.getElementsByClassName("sprite")[0].onmousemove = function(ev) {
    this.classList.add("animate");
}

window.document.getElementsByClassName("sprite")[0].addEventListener("animationend", function() {
    this.classList.remove("animate");
});
