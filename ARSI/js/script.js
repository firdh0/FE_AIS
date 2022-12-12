let ecommerceBaseUrl = "http://localhost:3000";
const reqHeader = {}

function getEwalletURL(wallet, namaEndPoint){
    if (wallet == 'shopeePay') {
        if (namaEndPoint == 'login') return 'http://localhost:8080/login'
        if (namaEndPoint == 'daftar') return 'http://localhost:8080/profile'
    }
    if (wallet == 'coinless') {
        if (namaEndPoint == 'login') return 'https://coinless.herokuapp.com/api/login'
        if (namaEndPoint == 'daftar') return 'https://coinless.herokuapp.com/api/profile'
        if (namaEndPoint == 'topUp') return 'https://coinless.herokuapp.com/api/profile/:id'
        if (namaEndPoint == 'profile') return 'https://coinless.herokuapp.com/api/profile'
    }
    if (wallet == 'diglet'){
        if (namaEndPoint == 'profile') return 'https://diggie.herokuapp.com/profile'
        if (namaEndPoint == 'daftar') return 'https://diggie.herokuapp.com/profile'
        if (namaEndPoint == 'topUp') return 'https://diggie.herokuapp.com/profile/saldo/'
        if (namaEndPoint == 'login') return 'https://diggie.herokuapp.com/login'
    }
}

function JSON_to_URLEncoded(element,key,list){
    var list = list || [];
    if(typeof(element)=='object'){
        for (let idx in element)
        JSON_to_URLEncoded(element[idx],key?key+'['+idx+']':idx,list);
    } else {
        list.push(key+'='+encodeURIComponent(element));
    }
    return list.join('&');
}

// function sendPostRequest(endPoint, _data, sukses){

//     fetch(`${ecommerceBaseUrl}${endPoint}`, { 
//         method: "POST",
//         body: JSON_to_URLEncoded(_data),
//         headers: reqHeader,
//     })
//     .then(response => response.json())
//     .then(response => {
//         if(response.status === 200) sukses(response)
//         else displayError(response.message)
//     })
//     .catch(err => console.log(err));
// }

async function sendPostRequest(endPoint, _data, sukses){
    let status
    let response = await fetch(`${ecommerceBaseUrl}${endPoint}`, {
        method: "POST",
        body: JSON_to_URLEncoded(_data),
        headers: reqHeader,
    })
    status = response.status
    response = response.json()  
    response.then(response => {
        if(status === 200) sukses(response)
        else displayError(response.message)
    })
    .catch(err => displayError(err));
}

async function sendGetRequest(endPoint, sukses){
    let status
    let response = await fetch(`${ecommerceBaseUrl}${endPoint}`, {
        method: "GET",
        headers: reqHeader,
    })
    //console.log(response)
    status = response.status
    response = response.json()  
    response.then(response => {
        if(status === 200) sukses(response)
        else displayError(response.message)
    })
    .catch(err => displayError(err));
}

async function ewalletPutRequest(url, _data, sukses){
    let status
    let response = await fetch(url, {
        method: "PUT",
        body: _data,
        headers: reqHeader,
    })
    status = response.status
    response = response.json()  
    response.then(response => {
        if(status === 200) sukses(response)
        else displayError(response.message != undefined ? response.message : response.msg)
    })
    .catch(err => console.log(err));
}

async function ewalletPatchRequest(url, _data, sukses){
    let status
    let response = await fetch(url, {
        method: "PATCH",
        body: _data,
        headers: reqHeader,
    })
    status = response.status
    response = response.json()  
    response.then(response => {
        if(status === 200) sukses(response)
        else displayError(response.message != undefined ? response.message : response.msg)
    })
    .catch(err => console.log(err));
}

async function ewalletPostRequest(url, _data, sukses){
    let status
    let response = await fetch(url, {
        method: "POST",
        body: _data,
        headers: reqHeader,
    })
    status = response.status
    response = response.json()  
    response.then(response => {
        if(status === 200) sukses(response)
        else displayError(response.message != undefined ? response.message : response.msg)
    })
    .catch(err => console.log(err));
}

async function ewalletGetRequest(url, sukses){
    let status
    let response = await fetch(url, {
        method: "GET",
        headers: reqHeader,
    })
    status = response.status
    response = response.json()  
    response.then(response => {
        if(status === 200) sukses(response)
        else displayError(response.message != undefined ? response.message : response.msg)
    })
    .catch(err => console.log(err));
}

function _sendGetRequest(endPoint, sukses){

    fetch(`${ecommerceBaseUrl}${endPoint}`, {
        method: "GET",
        headers: reqHeader,
    })
    .then(response => response.json())
    .then(response => {
        if(response.status === 200) sukses(response)
        else displayError(response.message)
    })
    .catch(err => console.log(err));
}

function toastDisplay(error){
    return `<div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header bg-danger">
            <strong class="me-auto text-white">ERROR</strong>
            <small class="text-white">Just Now</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${error}
        </div>
    </div>`
}

function displayError(error){
    const container = document.getElementById('toast-container')
    container.innerHTML = toastDisplay(error)
    const toastLiveExample = document.getElementById('liveToast')
    const toast = new bootstrap.Toast(toastLiveExample)
    document.getElementById('loading-effect').style.display = '';
    toast.show()
}

function setCookie(cname, cvalue, exhour) {
    const d = new Date();
    d.setTime(d.getTime() + (exhour*3600*1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
