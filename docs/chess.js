const boardDiv = document.getElementById("board");
let board = [];
let selected = null;
let turn = "w";
const pieces = {r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",p:"♟",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔",P:"♙"};
const start = [
  "r","n","b","q","k","b","n","r",
  "p","p","p","p","p","p","p","p",
  "","","","","","","","",
  "","","","","","","","",
  "","","","","","","","",
  "","","","","","","","",
  "P","P","P","P","P","P","P","P",
  "R","N","B","Q","K","B","N","R"
];

board = [...start];
render();

// Initialize Stockfish
const engine = STOCKFISH();
engine.onmessage = (event)=>{
    const line = event.data || event;
    if(line.startsWith("bestmove")){
        const move = line.split(" ")[1];
        makeMove(move);
    }
};
engine.postMessage("uci");
engine.postMessage("setoption name Skill Level value 5");
engine.postMessage("setoption name UCI_Elo value 1500");

function render(){
    boardDiv.innerHTML="";
    for(let i=0;i<64;i++){
        const sq=document.createElement("div");
        sq.className="square "+((Math.floor(i/8)+i)%2==0?"light":"dark");
        sq.textContent=pieces[board[i]]||"";
        sq.addEventListener("click",()=>clickSquare(i));
        if(selected===i) sq.classList.add("selected");
        boardDiv.appendChild(sq);
    }
}

// Helper functions
function posToCoord(i){ return String.fromCharCode(97+(i%8))+(8-Math.floor(i/8)); }
function coordToPos(c){ return (8-parseInt(c[1]))*8 + (c.charCodeAt(0)-97); }

// Click logic
function clickSquare(i){
    if(selected!==null){
        if(isValidMove(selected,i)){
            const move = posToCoord(selected)+posToCoord(i);
            makeMove(move);
            selected=null;
            render();
            if(turn==="b") aiMove();
            return;
        }
    }
    if(board[i] && ((board[i].toUpperCase()===board[i] && turn==="w") || (board[i].toLowerCase()===board[i] && turn==="b"))){
        selected=i;
    } else selected=null;
    render();
}

function isValidMove(from,to){
    // Minimal validation: cannot capture same color
    if(!board[from]) return false;
    if(board[to] && ((board[to].toUpperCase()===board[to])==(board[from].toUpperCase()===board[from]))) return false;
    return true;
}

function makeMove(move){
    const from = coordToPos(move.slice(0,2));
    const to = coordToPos(move.slice(2,4));
    board[to]=board[from];
    board[from]="";
    turn = turn==="w"?"b":"w";
    render();
}

function aiMove(){
    const fen = getFEN();
    engine.postMessage("position fen "+fen);
    engine.postMessage("go depth 15");
}

// Convert board to simple FEN
function getFEN(){
    let fen="";
    for(let r=0;r<8;r++){
        let empty=0;
        for(let f=0;f<8;f++){
            const p=board[r*8+f];
            if(!p){ empty++; }
            else { if(empty>0){ fen+=empty; empty=0; } fen+=p; }
        }
        if(empty>0) fen+=empty;
        if(r!==7) fen+="/";
    }
    fen+=" "+(turn==="w"?"w":"b")+" - - 0 1";
    return fen;
}
