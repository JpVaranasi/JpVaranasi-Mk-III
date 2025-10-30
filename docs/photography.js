const images = document.getElementsByClassName("image");

let globalIndex = 0,
    last = { x: 0, y: 0 };

// Define boundaries as % of screen
const X_MIN = 10; // 10% from left
const X_MAX = 85; // 90% from left
const Y_MIN = 35; // 10% from top
const Y_MAX = 80; // 90% from top

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const activate = (image, x, y) => {
  const rect = image.getBoundingClientRect();

  // Clamp x/y to bounds
  const boundedX = clamp(x, window.innerWidth * X_MIN/100 + rect.width/2, window.innerWidth * X_MAX/100 - rect.width/2);
  const boundedY = clamp(y, window.innerHeight * Y_MIN/100 + rect.height/2, window.innerHeight * Y_MAX/100 - rect.height/2);

  image.style.left = `${boundedX - rect.width/2}px`;
  image.style.top = `${boundedY - rect.height/2}px`;
  image.style.zIndex = globalIndex;

  image.dataset.status = "active";
  last = { x, y };
}

const distanceFromLast = (x, y) => Math.hypot(x - last.x, y - last.y);

const handleOnMove = e => {
  const x = e.clientX;
  const y = e.clientY;

  if(distanceFromLast(x, y) > (window.innerWidth / 20)) {
    const lead = images[globalIndex % images.length];
    const tail = images[(globalIndex - 5 + images.length) % images.length];

    activate(lead, x, y);

    if(tail) tail.dataset.status = "inactive";
    globalIndex++;
  }
}

window.onmousemove = handleOnMove;
window.ontouchmove = e => {
  e.preventDefault();
  handleOnMove(e.touches[0]);
};
