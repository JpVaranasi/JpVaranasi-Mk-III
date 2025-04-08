let arr = ["projects", "chess", "guitar", "certifications", "cricket","photography"];
sessionStorage.setItem('savedList', JSON.stringify(arr));

function controlCenter() {
    let savedList = JSON.parse(sessionStorage.getItem('savedList'));
    
    if (savedList.length === 0) {
        alert("No more items left to navigate!");
        return; // Exit if no more items in the list
    }
    
    let i = Math.floor(Math.random() * savedList.length); // Use savedList.length dynamically
    let nextPage = savedList[i];
    
    // Remove the selected item from savedList
    savedList.splice(i, 1);
    
    // Save the updated list back to sessionStorage
    sessionStorage.setItem('savedList', JSON.stringify(savedList));
    
    // Navigate to the section using hash without reloading the page
    window.location.hash = nextPage;
    
    // Optionally hide the index section if you need to
    document.getElementById('index').style.display = "none";
}
