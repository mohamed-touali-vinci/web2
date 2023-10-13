const message = "This is the best moment to have a look at this website !";

const fullMessage = addDateTime(message);
alert(fullMessage);

function addDateTime(message) {
    const dateTimeNow = new Date();
    const date = dateTimeNow.toLocaleDateString(); // 17/08/2020
    const hour = dateTimeNow.toLocaleTimeString(); // 13:26:15
    return date + " " + hour + " : " + message;

}