const currentTime = document.querySelector('h1');
content = document.querySelector('.content');
selectMenu = document.querySelectorAll('select');
buttonSetAlarm = document.querySelector('button');

setInterval(() => {
    let date = new Date(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    ampm = "AM";

    //Ajustando devido ao formato do horário(12 Horas).
    if(hours >= 12){
        hours = hours - 12;
        ampm = "PM"
    }

    //Resolvendo o problema dos números sem o zero antes e imprimindo.
    hours = hours == 0 ? hours = 12 : hours;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    currentTime.innerHTML = `${hours}:${minutes}:${seconds} ${ampm}`;

    //Se a hora "setada" for igual a atual, reproduz o som do alarme em loop.
    if(alarmTime === `${hours}:${minutes} ${ampm}`){
        ringTone.play();
        ringTone.loop = true;
    }
});

let alarmTime, isAlarmSet, ringTone = new Audio("./audio/Alarm.mp3");

//Percorrendo para disponibilizar as options.
for(let i = 12; i > 0; i--){
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 59; i > 0; i--){
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 2; i > 0; i--){
    let ampm = i == 1 ? "AM" : "PM";
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//Evento de clique no botão que define o momento do alarme.
buttonSetAlarm.addEventListener("click", setAlarm);

//Funcção de ativar/desativar.
function setAlarm(){
    if(isAlarmSet){
        alarmTime = "";
        ringTone.pause();
        content.classList.remove("disable");
        buttonSetAlarm.innerHTML = "Ativar Alarme";
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Insira horas e minutos válidos para ativar o alarme, por favor!")
    }
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    buttonSetAlarm.innerHTML = "Desativar Alarme";
}