var obj = {};
var arr = [];
var prr = [];
var s = "",
    formDesc = "";
var heading = "";

function addHeading() {
    heading = document.getElementById('heading').value;
    document.querySelector('h1').innerText = heading;
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

function addDesc() {
    formDesc = document.getElementById('formDesc').value;
}

function deleteOption(e) {
    arr.splice(e.id, 1);
    printData();
}

function addMultiple(e) {
    document.getElementById(e).toggleAttribute('multiple');
    document.getElementById(e).value = null;
}

function addOption(e) {
    // console.log(e.classList[0]);
    arr[e.classList[0]].noOfItem.push(document.getElementsByClassName(e.id)[0].value);
    console.log(arr[e.id]);
    printData();
    // console.log(e.id);
    // console.log();
}
function openNav() {
    var x = document.getElementById("mySidepanel");
    if (x.style.display === "none") {
        x.style.display = "block";
        x.style.width = "22vw";
    } else {
        x.style.width = "0";
        x.style.display = "none";
    }
}
function apply(){
    document.querySelector('#customForm').style.color = document.getElementById('color').value;
    document.querySelector('#customForm').style.fontSize = document.getElementById('fsize').value+"px";
    document.querySelector('#customForm').style.fontFamily = document.getElementById('ffamily').value;
    if(document.getElementById('image1').value == ""){
        document.querySelector('body').style.backgroundImage = "url()";
        document.querySelector('body').style.backgroundColor = document.getElementById('bgcolor').value;
    }else{
        document.querySelector('body').style.backgroundColor = "#3b8cb5";
        document.querySelector('body').style.backgroundImage = "url(document.getElementById('image1').value)";
    }
    printData();
}

function printData() {
    s = "";
    arr.map(function(item, index) {
        if (item.option === 'radio' || item.option === 'checkbox') {
            s += ("<div class='contentItems'>" + (index + 1) + " - " + item.desc + "<br><input type='text' placeholder='Add Option' class='" + index + item.desc + "'><button id=" + index + item.desc + " class='" + index + " btn btn-primary' onclick='addOption(this)'><i class='fas fa-plus'></i></button><br>");
            if (item.noOfItem != []) {
                item.noOfItem.map(function(items, oindex) {
                    s += ("<input type =" + item.option + " class=' " + index + "' name=" + index + item.desc + "></input>      " + items + "<button value=" + oindex + " id=" + index + " class='btn btn-sm btn-danger' onclick='deleteItem(this)'><i class='fas fa-trash-alt'></i></button><br>");
                });
            }
            s += ("<button id=" + index + " class='btn btn-danger' onclick='deleteOption(this)'><i class='fas fa-trash-alt'></i></button></div>");
        } else if (item.option === 'text') {
            s += ("<div class='contentItems'>" + (index + 1) + " - " + item.desc + "<br><input type =" + item.option + " id = " + index + " class='textF'><button id=" + index + " class='btn btn-danger' onclick='deleteOption(this)'><i class='fas fa-trash-alt'></i></button></div>");
        } else if (item.option === 'textarea') {
            s += ("<div class='contentItems'>" + (index + 1) + " - " + item.desc + "<br><textarea id=" + index + "></textarea><button id=" + index + " class='btn btn-danger' onclick='deleteOption(this)'><i class='fas fa-trash-alt'></i></button></div>");
        } else {
            s += ("<div class='contentItems'>" + (index + 1) + " - " + item.desc + "<br><input type =" + item.option + " id = " + index + "><button id=" + index + " class='btn btn-danger' onclick='deleteOption(this)'><i class='fas fa-trash-alt'></i></button></div>");
        }
    });
    document.getElementById('customForm').innerHTML = s;
}

async function submit() {
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
                heading: document.getElementById('heading').value,
                description: document.getElementById('formDesc').value,
                fontFamily: document.getElementById('ffamily').value,
                fontSize: document.getElementById('fsize').value,
                textColor: document.getElementById('color').value,
                backgroundColor: document.getElementById('bgcolor').value,
                // logo: await generateBase64FromImage(document.getElementById('image').files[0]),
                // backgroundImage: await generateBase64FromImage(document.getElementById('image1').files[0]),
            })
        })
        .then(d => {
            // JSON.stringify({
            //     data: arr,
            //     heading: document.getElementById('heading').value,
            //     description: document.getElementById('desc').value,
            //     fontFamily: document.getElementById('ffamily').value,
            //     fontSize: document.getElementById('fsize').value,
            //     textColor: document.getElementById('color').value,
            //     backgroundColor: document.getElementById('bgcolor').value,
            //     icon: document.getElementById('image').value
            // })
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

const generateBase64FromImage = imageFile => {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
        reader.onload = e => resolve(e.target.result);
        reader.onerror = err => reject(err);
    });

    reader.readAsDataURL(imageFile);
    return promise;
};