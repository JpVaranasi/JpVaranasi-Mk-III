let downArr = ["skills", "projects"];
let leftArr = ["certs", "experience"];
let rightArr = ["chess", "photography"];

sessionStorage.setItem('downList', JSON.stringify(downArr));
sessionStorage.setItem('leftList', JSON.stringify(leftArr));
sessionStorage.setItem('rightList', JSON.stringify(rightArr));

window.addEventListener('DOMContentLoaded', () => {
  // Delay scroll just enough for layout to settle
  requestAnimationFrame(() => {
    window.scrollTo({ left: window.innerWidth, top: 0, behavior: 'instant' });
  });
});

let checkPoint = false;
function controlCenter(direction) {
    if(direction == "down"){
        let savedDownArr  = JSON.parse(sessionStorage.getItem('downList'));
        let i = Math.floor(Math.random() * savedDownArr.length); // Use savedList.length dynamically
        let nextPage = savedDownArr[i];
        savedDownArr.splice(i, 1);
        sessionStorage.setItem('downList', JSON.stringify(savedDownArr));
        if (savedDownArr.length == 1){
            document.getElementById('index').style.visibility = 'hidden';
            document.getElementById(nextPage).style.visibility = 'visible';
            document.getElementById(nextPage).style.top = '100vh';
            document.getElementById(nextPage).style.borderRight = "solid white 4px"
            document.getElementById(nextPage).style.borderLeft= "solid white 4px"
            console.log(nextPage)
            console.log(document.getElementById(nextPage).style.top)
            if(nextPage == 'skills'){
                document.getElementById('skills_l').style.visibility = 'hidden';
            }
            if(nextPage == 'projects'){
                document.getElementById('projects_l').style.visibility = 'hidden';
            }
        }            
        else if(savedDownArr.length < 1 && checkPoint == false){
            document.getElementById('index').style.visibility = 'hidden';
            document.getElementById(nextPage).style.visibility = 'visible';
            document.getElementById(nextPage).style.top = "200vh";
            document.getElementById(nextPage).style.borderBottom = "solid white 4px"
            console.log(document.getElementById(nextPage).style.top)
            if(nextPage == 'skills'){
                document.getElementById('skills_b').style.visibility = 'hidden';
            }
            if(nextPage == 'projects'){
                document.getElementById('projects_b').style.visibility = 'hidden';
            }
            checkPoint = true;
        }
        else if(checkPoint == true){
            console.log('k');
            nextPage = "finalCard";
            document.getElementById('index').style.visibility = 'visible';
            document.getElementById(nextPage).style.visibility = 'visible';
            document.getElementById(nextPage).style.top = ' 300vh';
            document.getElementById(nextPage).style.left = '200vw';
            document.getElementById(nextPage).style.borderRight = "solid white 4px"
            document.getElementById(nextPage).style.borderLeft = "solid white 4px"
            document.getElementById(nextPage).style.borderBottom = "solid white 4px"
            

            
       
        }
        window.location.hash = nextPage;

    }

    if(direction == 'left'){
        console.log('left')
        let savedLeftArr  = JSON.parse(sessionStorage.getItem('leftList'));
        let i = Math.floor(Math.random() * savedLeftArr.length); // Use savedList.length dynamically
        let nextPage = savedLeftArr[i];
        savedLeftArr.splice(i, 1);
        sessionStorage.setItem('leftList', JSON.stringify(savedLeftArr));
        if (savedLeftArr.length == 1){
            document.getElementById('index').style.visibility = 'hidden';
            document.getElementById(nextPage).style.visibility = 'visible';
            document.getElementById(nextPage).style.top = '200vh';
            document.getElementById(nextPage).style.left = '0vw';
            document.getElementById(nextPage).style.borderTop = "solid white 4px"
            document.getElementById(nextPage).style.borderLeft = "solid white 4px"
            document.getElementById(nextPage).style.borderBottom = "solid white 4px"


            console.log(nextPage)
            console.log(document.getElementById(nextPage).style.top)
            if(nextPage == 'certs'){
                document.getElementById('certs_r').style.visibility = 'visible';
            }
            if(nextPage == 'experience'){
                document.getElementById('experience_r').style.visibility = 'visible';
            }
        }            
        else if(savedLeftArr.length < 1){
            document.getElementById('index').style.visibility = 'hidden';
            document.getElementById(nextPage).style.visibility = 'visible';
            document.getElementById(nextPage).style.top = '100vh';
            document.getElementById(nextPage).style.left = '200vw';
            document.getElementById(nextPage).style.borderTop = "solid white 4px"
            document.getElementById(nextPage).style.borderLeft = "solid white 4px"


            console.log(document.getElementById(nextPage).style.top)
            if(nextPage == 'certs'){
                document.getElementById('certs_b').style.visibility = 'visible';
            }
            if(nextPage == 'experience'){
                document.getElementById('experience_b').style.visibility = 'visible';
            }
        }
        window.location.hash = nextPage;

    }
    if(direction == 'up'){
        console.log('up')
        document.getElementById('index').style.visibility = 'hidden';
        document.getElementById('cli').style.visibility = 'visible';
        document.getElementById('cli').style.top = ' 100vh';
        document.getElementById('cli').style.left = '300vw';
        document.getElementById('cli').style.borderRight = "solid white 4px"
        document.getElementById('cli').style.borderTop = "solid white 4px"


        console.log(document.getElementById('cli').style.top)
            
        window.location.hash = 'cli';

    }
    if(direction == 'right'){
        console.log('right')
        let savedRightArr  = JSON.parse(sessionStorage.getItem('rightList'));
        let i = Math.floor(Math.random() * savedRightArr.length); // Use savedList.length dynamically
        let nextPage = savedRightArr[i];
        savedRightArr.splice(i, 1);
        sessionStorage.setItem('rightList', JSON.stringify(savedRightArr));
        if (savedRightArr.length == 1){
            document.getElementById('index').style.visibility = 'hidden';
            document.getElementById(nextPage).style.visibility = 'visible';
            document.getElementById(nextPage).style.top = '200vh';
            document.getElementById(nextPage).style.left = '200vw';
            document.getElementById(nextPage).style.borderLeft = "solid white 4px"


            console.log(nextPage)
            console.log(document.getElementById(nextPage).style.top)
            if(nextPage == 'chess'){
                document.getElementById('chess_r').style.visibility = 'visible';
            }
            if(nextPage == 'photography'){
                document.getElementById('photography_r').style.visibility = 'visible';
            }
        }            
        else if(savedRightArr.length < 1){
            document.getElementById('index').style.visibility = 'hidden';
            document.getElementById(nextPage).style.visibility = 'visible';
            document.getElementById(nextPage).style.top = '200vh';
            document.getElementById(nextPage).style.left = '300vw';
            document.getElementById(nextPage).style.borderRight = "solid white 4px"
            document.getElementById(nextPage).style.borderBottom = "solid white 4px"

            console.log(document.getElementById(nextPage).style.top)
            if(nextPage == 'chess'){
                document.getElementById('chess_u').style.visibility = 'visible';
            }
            if(nextPage == 'photography'){
                document.getElementById('photography_u').style.visibility = 'visible';
            }
        }
        window.location.hash = nextPage;

    }
    
}


