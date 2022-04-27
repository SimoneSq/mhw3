//NOTA L'EMAIL VALIDATOR HA UN TOT DI USI

//Key Email 
const email_key = 'ddac3e7fcaec413c9445a1365ffd553b';
const email_key_endpoint = 'https://emailvalidation.abstractapi.com/v1/?api_key=';

//Spotify key
const client_id='b3d6fddbe2684067b1b64ce228ad43dc';
const client_secret= 'b18142a76f924cd689f6bedecce41099';

//MODALE

function onClick(event){
    console.log('Cliccato');
    const modale = document.querySelector('#register-view');
    modale.classList.add('modal');
    modale.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

function ChiudiModale(event){
    const modale = document.querySelector('#register-view');
    modale.classList.remove('modal');
    modale.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

function onJson(json){
    console.log(json);
    let result= document.querySelector('#register-window');
    const controllo=document.querySelector('h3');
    const validita=json.deliverability;
    if(controllo!=null){
        if(validita === 'DELIVERABLE'){
            console.log('Valido');
            controllo.textContent='Email Valida';
        }
        if(validita === 'UNDELIVERABLE'){
            console.log('Valido');
            controllo.textContent='Email non valida';
        }
        return;
    }
    if(validita === 'DELIVERABLE'){
        console.log('Valido');
        let result= document.querySelector('#register-window');
        let text = document.createElement('h3');
        text.textContent='Email Valida';
        result.appendChild(text);
        
    }
    if(validita === 'UNDELIVERABLE'){
        console.log('Non Valido');
        let result= document.querySelector('#register-window');
        let text = document.createElement('h3');
        text.textContent='Email non valida';
        result.appendChild(text);
    }
}

function onResponse(response){
    //Trasformo la risposta in un json per poter leggere i campi
    if(response.status===400){
        console.log('Errore');
        let result= document.querySelector('#register-window');
        const controllo=document.querySelector('h3');
        if(controllo!=null){
            controllo.textContent='Inserire Email';
        }
        else{
            let result= document.querySelector('#register-window');
            let text = document.createElement('h3');
            text.textContent='Inserire Email';
            result.appendChild(text);
        }
        return;
    }
    return response.json();
}
//--------------------------

//EMAIL
function Verifica(event){
    const text = document.querySelector('#email-content').value;
    console.log(text);
    const encodedText = encodeURIComponent(text);
    
    email_request=email_key_endpoint+email_key+'&email='+encodedText;
    fetch(email_request).then(onResponse).then(onJson);
}

//Spotify

function onToken(json){
    token = json;
}

function onResponseToken(response){
    if(response.status=== 401){
        console.log('ERRORE AUTORIZZAZIONE SPOTIFY');   
    }
    return response.json();
}

function onResponseSpotify(response){
    if(response.status === 400){
        console.log('ERRORE RICHIESTA SPOTIFY');
    }
    return response.json();
}

function onSpotify(json){
    console.log(json);
//Hidden Elementi Precedenti
   const bottone = document.querySelector('#clickSpoty');
   bottone.classList.add('hidden');
   const title = document.querySelector('#SpotyTitle');
   title.classList.add('hidden');
//Inserimento Dati
    let result= document.querySelector('.random');
    let text = document.createElement('h4');
    text.textContent=json.name;
    result.appendChild(text);
    let img = document.createElement('img');
    img.src=json.images[0].url;
    img.classList.add('flex');
    result.appendChild(img);
    let par = document.createElement('p');
    par.textContent=json.description;
    result.appendChild(par);
    let link = document.createElement('a');
    link.textContent=json.href;
    result.appendChild(link);
    
}

//Nella richiesta della playlist, ho utilizzato direttamente l'id della playlist, senza prenderla da tastiera o altro
function onClickPlaylist(event){
    fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DXdxcBWuJkbcy?si=231f68f805854e10',{
        headers:{
            'Authorization':'Bearer '+ token.access_token
        }
    }).then(onResponseSpotify).then(onSpotify);
}

// General

const button = document.querySelector('#register');
button.addEventListener('click',onClick);
const close = document.querySelector('#close');
close.addEventListener('click',ChiudiModale)
const accept = document.querySelector('#accept');
accept.addEventListener('click',Verifica);
const random=document.querySelector('#clickSpoty');
random.addEventListener('click',onClickPlaylist);
let token;


fetch('https://accounts.spotify.com/api/token',{
    method:'post',
    body: 'grant_type=client_credentials',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'Basic '+ btoa(client_id+':'+client_secret)
    }
}).then(onResponseToken).then(onToken);