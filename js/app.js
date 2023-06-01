var cookies = 0;
var cursors = 0;

var save = {
    cookies: cookies,
    cursors: cursors
}

function cookieClick(number){
    cookies = cookies + number;
    document.getElementById("cookies").innerHTML = cookies;
};

function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.2,cursors));    //calc cost of next cursor
    if (cookies >= cursorCost) {                                // check if player can actually afford the cursor
        cursors = cursors + 1;                                  // increment number of cursors
        cookies = cookies - cursorCost;                         // remove cost of cursor upgrade from current cookies count
        document.getElementById('cursors').innerHTML = cursors  // update number of current cursors user has
        document.getElementById('cookies').innerHTML = cookies  // update current cookie count to reflect purchase
    };
    var nextCost = Math.floor(10 * Math.pow(1.2,cursors));      // calculate cost of next cursor
    document.getElementById("cursorCost").innerHTML = nextCost; // update cursor cost for the user
}

function save() {
    localStorage.setItem("save",JSON.stringify(save));
}

window.setInterval(function(){
    cookieClick(cursors);
}, 1000);