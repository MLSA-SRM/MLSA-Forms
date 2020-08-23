var obj = {};
var arr = [];
var s = "";
var heading = "";

function addHeading() {
    heading = document.getElementById('heading').value;
    console.log(heading);
}

function add() {
    var desc = document.getElementById('desc').value;
    var option = document.getElementById('options').value;
    obj = {
        'desc': desc,
        'option': option,
        'noOfItem': []
    };
    arr.push(obj);
    document.getElementById('desc').value = "";
    printData();
}

function deleteItem(e) {
    arr[e.id].noOfItem.splice(e.value, 1);
    printData();
}

function deleteOption(e) {
    arr.splice(e.id, 1);
    printData();
}

function addOption(e) {
    // console.log(e.classList[0]);
    arr[e.classList[0]].noOfItem.push(document.getElementsByClassName(e.id)[0].value);
    console.log(arr[e.id]);
    printData();
    // console.log(e.id);
    // console.log();
}

function printData() {
    s = "";
    arr.map(function(item, index) {
        if (item.option === 'radio' || item.option === 'checkbox') {
            s += ("<div class='contentItems'>" + (index + 1) + " - " + item.desc + "<br><input type='text' placeholder='Add Option' class=" + index + item.desc + "><button id=" + index + item.desc + " class='" + index + " btn btn-primary' onclick='addOption(this)'>Add+</button><br>");
            if (item.noOfItem != []) {
                item.noOfItem.map(function(items, oindex) {
                    s += ("<input type =" + item.option + " id=" + index + "></input>      " + items + "<button value=" + oindex + " id=" + index + " class='btn btn-sm btn-danger' onclick='deleteItem(this)'>Remove</button><br>");
                });
            }
            s += ("<button id=" + index + " class='btn btn-danger' onclick='deleteOption(this)'>Remove</button></div>");
        } else if (item.option === 'text') {
            s += ("<div class='contentItems'>" + (index + 1) + " - " + item.desc + "<br><input type =" + item.option + " id = " + index + " class='textF'><button id=" + index + " class='btn btn-danger' onclick='deleteOption(this)'>Remove</button></div>");
        } else {
            s += ("<div class='contentItems'>" + (index + 1) + " - " + item.desc + "<br><textarea rows='5' id=" + index + "></textarea><button id=" + index + " class='btn btn-danger' onclick='deleteOption(this)'>Remove</button></div>");
        }
    });
    document.getElementById('customForm').innerHTML = s;
}

function submit() {
    console.log(arr);
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch('/user/form/create', {
            credentials: 'same-origin',
            headers: {
                'CSRF-Token': token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                data: arr,
                heading: document.getElementById('heading').value
            })
        })
        .then(d => {
            return d.json();
        }).then(data => {
            console.log(data)
            if (data.msg === 'OK') {
                location.replace(data.url);
            } else {
                alert('Something went wrong');
            }
        }).catch(e => {
            console.log(e);
        })
}