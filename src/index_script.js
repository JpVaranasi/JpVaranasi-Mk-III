const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";

let interval = null;

document.querySelector("h1").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
}



function hideIndex(){
  doc = document.getElementById('index').style.visibility = "hidden";
  document.getElementById('skills').style.visibility = "visible";
  
}
function revealIndex(){
  doc = document.getElementById('index').style.visibility = "visible";
  document.getElementById('skills').style.visibility = "hidden";
  
}