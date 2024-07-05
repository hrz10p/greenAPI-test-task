let baseUrl = "https://id.api.greenapi.com";
let settings = {}
let state = {}
let idInstance = ""
let apiTokenInstance = ""

const updateAPIURL = (idInstance) => {
    const inst = idInstance.substring(0, 4);
    baseUrl = `https://${inst}.api.greenapi.com`;
}

const getSettings = async () => {
    try {
        updateAPIURL(idInstance);

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
        idInstance = document.getElementById('idInstance').value;
        apiTokenInstance = document.getElementById('apiTokenInstance').value;
        getSettings(idInstance, apiTokenInstance).then(data => {
            document.getElementById('response').value = JSON.stringify(data, null, 2);
            settings = data
        });
    });

    document.getElementById('getStateInstance').addEventListener('click', () => {
        getState().then(data => {
            document.getElementById('response').value = JSON.stringify(data, null, 2);
            state = data
        });
    });

    document.getElementById('sendMessage').addEventListener('click', () => {
        const phoneNumber = document.getElementById('phoneNumber').value;
        const message = document.getElementById('message').value;
        sendMessage(phoneNumber , message).then(data => {
            document.getElementById('response').value = JSON.stringify(data, null, 2);
        } )
    });

    document.getElementById('sendFileByUrl').addEventListener('click', () => {
        const phoneNumberFile = document.getElementById('phoneNumberFile').value;
        const fileUrl = document.getElementById('fileUrl').value;
        sendFileByUrl(phoneNumberFile , fileUrl).then(data => {
            document.getElementById('response').value = JSON.stringify(data, null, 2);
        })
    });
});