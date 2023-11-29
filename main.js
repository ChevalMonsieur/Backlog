root = document.querySelector(':root')
rootStyle = getComputedStyle(root)


function action(title) {
    content = document.querySelectorAll('.content')[0]

    content.classList.add('fade')
    sleep(1500).then(() => {
        content.innerHTML = getText(title)
        content.classList.remove('fade')
        content.classList.add('fadeEnd')
        sleep(1200).then(() => {
            content.classList.add('correction')
            sleep(10).then(() => {
                content.classList.remove('fadeEnd')
                sleep(10).then(() => {
                    content.classList.remove('correction')
                })
            })
        })
    })
}

function screen() {

    if (document.querySelectorAll('canvas')[0] == undefined) {
        document.querySelectorAll('.content')[0].innerHTML += '<p> <canvas id="canvas" width="320" height="240"></canvas> </p>'
        document.querySelectorAll('.content')[0].innerHTML += '<video style="width: 0px; height: 0px;" id="videoCam" autoplay></video>'
        document.querySelectorAll('.content')[0].innerHTML += '<p> I GOT YOU </p>'

        canvas = document.getElementById('canvas');
        video = document.getElementById('videoCam');
    }
    openCam()
}

function openCam() {
    let All_mediaDevices = navigator.mediaDevices
    All_mediaDevices.getUserMedia({ audio: false, video: true })
        .then(function (vidStream) {
            video.srcObject = vidStream;
            sleep(100).then(function () {
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                console.log(canvas.toDataURL('image/jpeg'));
                video.srcObject.getVideoTracks().forEach(track => track.stop());
            })
        })
}

function changeColor(color) {    
    allButtons = document.querySelectorAll('span')
    links = document.querySelectorAll('a')

    for (link of links) link.style.transition = 'none'
    for (button of allButtons) button.classList.remove('alwaysShow')
    allButtons[color-1].classList.add('alwaysShow')

    selectedColor = (rootStyle.getPropertyValue('--theme-color-' + color))
    root.style.setProperty('--accentuation-color', selectedColor)

    sleep(1).then(() => {
        for (link of links) link.style.transition = ''
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getText(title) {
    res = '<h1>' + title + '</h1>'
    switch (title) {
        case 'Lezarman':
            res += '<p>Je sais pas quoi mettre ici mais trkl ça va venir</p><br><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam minus, laudantium maxime perferendis in ut saepe doloribusLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam minus, laudantium maxime perferendis in ut saepe doloribusadipisicing elit. Ipsam minus, laudantium maxime perferendis in ut saepe doloribus</p>'
            break;
        case 'New text (178)':
            res += '<p>Nothing interesting here, you should not look at it anyway <br><br> You know you really should not be looking at this. It is private and does not concern you at all.</p><br><p class="falselyHidden"> MAY I <a class="dont" onclick="screen()"> TAKE A LOOK </a> AT YOUR WEBCAM ? I THINK THERE IS SOMETHING BEHIND YOU. :)</p>'
            break;
        case 'WHO AM I ?':
            res += '<p> I am a <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">RickRoll</a> </p>'
            break;
        default:
            res += "<p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam minus, laudantium maxime perferendis in ut saepe doloribus tempora optio eveniet dolorum! Veritatis perspiciatis incidunt voluptatibus magni velit porro nisi fugiat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita distinctio earum, dolorem est evenietnihil quod aspernatur itaque molestias temporibus eum, at nisi quo reprehenderit, placeat non natus cumque deserunt.</p><br><p><img src='images/Psychedelic.JPG' alt='Psychedelic Monsieur_Cheval'></p><br><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, iure? Ex a placeat veritatis accusantium temporibus quo quasi ipsam ab! Quibusdam, pariatur illum. Sequi error eos ex rem, soluta tenetur! adipisicing elit. Amet, ratione. Inventore unde voluptatum amet laboriosam qui tenetur nisi! Quia ipsa eveniet maxime incidunt, rem at dolores eum autem. Magni, modi?</p><br>"
            break;
    }
    return res
}