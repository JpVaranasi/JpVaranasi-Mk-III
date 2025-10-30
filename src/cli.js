const input = document.getElementById("command");
const output = document.getElementById("output");
let mode = "normal";
let hammurabiState = null; // will hold game progress
let prev = []; 
let counter = 0
let commandsList = ['about','skills','help','projects','experience','hammurabi']
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // stop form submission or page reload
    const command = input.value.trim();
    if (mode === "normal"){
      handleCommand(command);
    }
    else if(mode === "hammurabi"){
      console.log('k')
      handleHammurabiInput(command);
    }
    
    input.value = "";
    counter = 0
  }
  if (e.key === "ArrowUp") {
    while (prev[prev.length - counter] == undefined){
        counter += 1
    }
    e.preventDefault(); // stop form submission or page reload
    input.value = prev[prev.length - counter];
    counter += 1;
        
  }
  if (e.key === "ArrowDown") {
    while (prev[prev.length + counter] == undefined){
        counter -= 1
    }
    e.preventDefault(); // stop form submission or page reload
    input.value = prev[prev.length + counter];
    counter -= 1;   
  }
  if (e.key === "Tab") {
    e.preventDefault(); // stop form submission or page reload
    for(var i = 0; i < commandsList.length;i++){
        if(commandsList[i].includes(input.value)){
            input.value = commandsList[i];
        }
    }
  }
});

function handleCommand(cmd) {
  const line = document.createElement("div");
  line.textContent = `> ${cmd}`;
  output.appendChild(line);

  const response = document.createElement("div");
  prev.push(cmd);
  switch (cmd.toLowerCase()) {
    case "help":
      response.textContent = "Commands: help, about, projects, skills, experience, hammurabi, game 2 placeholder,clear.  (PS: there are some easter eggs)";
      break;
    case "about":
      response.textContent = "Hi, I'm Jp — a CS student who sometimes buids projects.";
      break;
    case "clear":
      output.innerHTML = "";
      return;
    case "projects":
        response.textContent = "Ah the projects, why are you here when I already dedicated a page to projects, anyway here ya go:\n\n1.DigiFob - a digital replacement to keyfobs\n2.JpVaranasi - a digital portal to me!\n3.Jarvis- a smart personal assistant with TTS and VTT features\n4.DRS - an F1 SaaS dashboard built with React.js and TailwindCSS\n\nVisit all of them at https://www.github.com/jpvaranasi\nOr for a more detailed overview head over to https://www.projects.jpvaranasi.com"
        break; 
    case 'skills':
        response.textContent = "The important bits huh \n\n Python - \n C++/C# - \n Js - \n React.Js/TailwindCSS - \n Django - "
        break;
    case "hammurabi":
        response.textContent = "The king is sleeping";
        //response.textContent = "\n\nYou are Hammurabi, the king of ancient Sumer!\n\nRemember:you have to be wise AND resourceful\n\nThis is your first year and you start with:\nAcres: 100\nGrains: 1000\nPopulation: 100\n\nHow many acres will you plant this year?"
       // mode = "hammurabi";
        hammurabiState = {
          year: 1,
          grain: 1000,
          acres: 100,
          population: 100,
          awaiting: "plant" 
        };
        break;
    case 'experience':
        response.textContent = "\nI am currently a student at USW studying Computer Science Bsc(Hons).\nBut I am also\n 1. Electronics and Software Department Lead @ USW Racing.\n 2. Developer @ USW Racing. \n 3. Digital Mentor @ USW"
        break;
    case 'game 2 placeholder':
        response.textContent = "Game in development."
        break;
    case 'secret game':
        response.textContent = "Game in development."
        break;
    case 'shh':
        response.textContent = "In Development."
        break;
    default:
      response.textContent = "Unknown command. Type 'help'.";
  }
  output.appendChild(response);
  output.scrollTop = output.scrollHeight; // scroll to bottom
}



function handleHammurabiInput(cmd){
  const line = document.createElement("div");
  line.textContent = `> ${input.value}`;
  output.appendChild(line);

  const response = document.createElement("div");

  if(hammurabiState.awaiting === "plant"){
    const acresToPlant = parseInt(input.value);
    if(isNaN(acresToPlant)|| acresToPlant < 0){
      response.textContent = "Please enter a valid number of acres";
    }
    else{
      hammurabiState.acresPlanted = acresToPlant;
      response.textContent = "You plant " + acresToPlant + " acres. \nHow many bushels of grain will you feed to your people?";
      hammurabiState.awaiting = "feed";
    }
  }
  else if(hammurabiState.awaiting === "feed"){
    const grainFed = parseInt(input.value);
    if(isNaN(grainFed)||grainFed < 0){
      response.textContent = "Please enter a valid number";
    }
    else{
      hammurabiState.grainFed = grainFed;
      response.textContent = `You feed your people ${grainFed} bushels.\nHow many acres will you buy or sell? (negative to sell)`;
      hammurabiState.awaiting = "trade";
    }
  }
  else if (hammurabiState.awaiting === "trade") {
    const acresTraded = parseInt(input.value);
    if (isNaN(acresTraded)) {
      response.textContent = "Enter a number please.";
    } else {
      hammurabiState.acres += acresTraded;
      response.textContent = `You now own ${hammurabiState.acres} acres.\n--- End of Year ${hammurabiState.year} ---`;
      hammurabiState.year++;
      
      if (hammurabiState.year > 10) {
        response.textContent += "\n\nYour reign has ended. Type 'exit' to return.";
        hammurabiState.awaiting = "end";
      } else {
        response.textContent += `\n\nNew Year!\nAcres: ${hammurabiState.acres}\nGrain: ${hammurabiState.grain}\nPopulation: ${hammurabiState.population}\n\n  How many acres will you plant?`;
        hammurabiState.awaiting = "plant";
      }
    }
  } else if (input.value.toLowerCase() === "exit") {
    response.textContent = "The king retires. Returning to main console...";
    mode = "normal";
    hammurabiState = null;
  }

  output.appendChild(response);
  output.scrollTop = output.scrollHeight;
}
