let baseUrl = "https://id.api.greenapi.com";
let settings = {}
let state = {}
let idInstance = ""
let apiTokenInstance = ""

const updateAPIURL = (idInstance) => {
    const inst = idInstance.substring(0, 4);
    baseUrl = `https://${inst}.api.greenapi.com`;
}

const updateInstanceData = () => {
    idInstance = document.getElementById('idInstance').value;
    apiTokenInstance = document.getElementById('apiTokenInstance').value;

    if(!idInstance || !apiTokenInstance) {
        alert("Заполните idInstance и apiTokenInstance")
        return false
    }

    updateAPIURL(idInstance);

    return true
}

const getSettings = async () => {
    try {

        const url = `${baseUrl}/waInstance${idInstance}/getSettings/${apiTokenInstance}`;

        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error getting settings: ", error);
    }
}

const getState = async () => {
    try {

        const url = `${baseUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;

        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error getting settings: ", error);
    }
}

const sendMessage = async (recipient , message) => {
    try {

        const url = `${baseUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
        const chatId = `${recipient}@c.us`
        const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ chatId, message })
                });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error getting settings: ", error);
    }
}

const sendFileByUrl = async (recipient, urlFile) => {
    try {

        const url = `${baseUrl}/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`;
        const chatId = `${recipient}@c.us`
        const parts = urlFile.split('/');
        const fileName = parts[parts.length - 1];
        const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ chatId,  urlFile, fileName})
                });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error getting settings: ", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getSettings').addEventListener('click', () => {
        if(!updateInstanceData()){
            return
        }
        getSettings(idInstance, apiTokenInstance).then(data => {
            document.getElementById('response').value = JSON.stringify(data, null, 2);
            settings = data
        });
    });

    document.getElementById('getStateInstance').addEventListener('click', () => {
        if(!updateInstanceData()){
            return
        }
        getState().then(data => {
            document.getElementById('response').value = JSON.stringify(data, null, 2);
            state = data
        });
    });

    document.getElementById('sendMessage').addEventListener('click', () => {
        if(!updateInstanceData()){
            return
        }
        const phoneNumber = document.getElementById('phoneNumber').value;
        const message = document.getElementById('message').value;
        if(!phoneNumber || !message){
            alert("Заполните поля номера телефона и сообщения")
            return
        }
        sendMessage(phoneNumber , message).then(data => {
            document.getElementById('response').value = JSON.stringify(data, null, 2);
        } )
    });

    document.getElementById('sendFileByUrl').addEventListener('click', () => {
        if(!updateInstanceData()){
            return
        }
        const phoneNumberFile = document.getElementById('phoneNumberFile').value;
        const fileUrl = document.getElementById('fileUrl').value;
        if(!phoneNumberFile || !fileUrl){
            alert("Заполните поля номера телефона и ссылки")
            return
        }
        sendFileByUrl(phoneNumberFile , fileUrl).then(data => {
            document.getElementById('response').value = JSON.stringify(data, null, 2);
        })
    });
});