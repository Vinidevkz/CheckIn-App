import ngrok from "./ngrok/ngrok"

const UserURLs = {
    logon: `https://${ngrok}/api/users/logon`,
    login: `https://${ngrok}/api/users/login`,
    update: `https://${ngrok}/api/users/update`,
    delete: `https://${ngrok}/api/users/delete`
}

export default UserURLs