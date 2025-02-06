// Replace 'https://api.example.com/data' with the API URL you want to use
fetch('https://api.chess.com/pub/player/jpvaranasi7/stats')
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        document.getElementById("blitz_rating").innerText = data.chess_blitz.last.rating
        document.getElementById("blitz_win").innerText = Math.round((data.chess_blitz.record.win/(data.chess_blitz.record.win+data.chess_blitz.record.loss+data.chess_blitz.record.draw))*100) + "%";
        document.getElementById("blitz_draw").innerText = Math.round((data.chess_blitz.record.draw/(data.chess_blitz.record.win+data.chess_blitz.record.loss+data.chess_blitz.record.draw))*100) + "%";

        document.getElementById("bullet_rating").innerText = data.chess_bullet.last.rating
        document.getElementById("bullet_win").innerText = Math.round((data.chess_bullet.record.win/(data.chess_bullet.record.win+data.chess_bullet.record.loss+data.chess_bullet.record.draw))*100) + "%";
        document.getElementById("bullet_draw").innerText = Math.round((data.chess_bullet.record.draw/(data.chess_bullet.record.win+data.chess_bullet.record.loss+data.chess_bullet.record.draw))*100) + "%";

        document.getElementById("rapid_rating").innerText = data.chess_rapid.last.rating
        document.getElementById("rapid_win").innerText = Math.round((data.chess_rapid.record.win/(data.chess_rapid.record.win+data.chess_rapid.record.loss+data.chess_rapid.record.draw))*100) + "%";
        document.getElementById("rapid_draw").innerText = Math.round((data.chess_rapid.record.draw/(data.chess_rapid.record.win+data.chess_rapid.record.loss+data.chess_rapid.record.draw))*100) + "%";

    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
