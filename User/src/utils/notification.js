export const requestNotificationPermission = async () => {

    if (!("Notification" in window)) {

        alert("This browser does not support notifications.");

        return false;

    }

    if (Notification.permission === "granted") {

        return true;

    }

    const permission = await Notification.requestPermission();

    return permission === "granted";

};

export const showNotification = (title, body, icon = "/logo.png") => {

    if (Notification.permission !== "granted") return;

    new Notification(title, {
        body,
        icon,
    });

};