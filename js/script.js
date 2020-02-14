var hours = 0;
var minutes = 0;
var seconds = 0;
var intervalId = 0;
var timezone = "05:30";

function setClockValues(elementId, value) {
    document.getElementById(elementId).innerHTML = value < 10 ? "0" + value : value;
}

document.addEventListener("DOMContentLoaded", function () {
    setInterval(function () {
        var date = new Date();
        offsetHours = timezone.split(":")[0];
        offsetMinutes = timezone.split(":")[1];
        var hours = date.getUTCHours() + parseInt(offsetHours);
        var minutes = (date.getUTCMinutes() + parseInt(offsetMinutes)) % 60;
        var seconds = date.getUTCSeconds();
        var meridie = hours > 12 ? 'PM' : 'AM';
        hours = hours % 12 == 0 ? 12 : hours % 12;
        setClockValues("clockHours", hours);
        setClockValues("clockMinutes", minutes);
        setClockValues("clockSeconds", seconds);
        document.getElementById("meridie").innerHTML = meridie;
    }, 1000);
});

function changeTimezone(obj) {
    if (obj.value == "chi")
        timezone = "08:00";
    else if (obj.value == "ita")
        timezone = "01:00";
    else
        timezone = "05:30";
}

function toggleApp(to, from) {
    document.querySelector("." + from + "-btn").classList.remove("active");
    document.querySelector("." + to + "-btn").classList.add("active");
    document.getElementById("seeker").classList.replace(from + "-seeker", to + "-seeker");
    document.getElementById(from + "Container").classList.replace("active", "deactive");
    document.getElementById(to + "Container").classList.replace("deactive", "active");
}

function checkInput(obj) {
    if (
        isNaN(obj.value) ||
        obj.value == "" ||
        parseInt(obj.value) < 0 ||
        parseInt(obj.value) > 59 ||
        obj.value.length > 2
    ) {
        obj.value = "00";
        return;
    }
}

function runTimer() {
    intervalId = setInterval(function () {
        setClockValues("hours", hours);
        setClockValues("minutes", minutes);
        setClockValues("seconds", seconds);

        seconds++;

        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }, 1000);
}

function setControl(controlValue, functionName) {
    document.getElementById("startBtn").innerHTML = controlValue;
    document
        .getElementById("startBtn")
        .setAttribute("onclick", functionName);
}

function initState() {
    hours = 0;
    minutes = 0;
    seconds = 0;
    setControl("Start", "startTimer()");
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
}

function resetTimer() {
    initState();
    clearInterval(intervalId);
}

function startTimer() {
    clearInterval(intervalId);
    hours = parseInt(document.getElementById("initHours").value);
    minutes = parseInt(document.getElementById("initMinutes").value);
    seconds = parseInt(document.getElementById("initSeconds").value);
    runTimer();
    setControl("Pause", "pauseTimer()");
}

function pauseTimer() {
    clearInterval(intervalId);
    setControl("Resume", "resumeTimer()");
}

function resumeTimer() {
    runTimer();
    setControl("Pause", "pauseTimer()");
}

function toggleTheme(themeId) {
    document.getElementById("themeDiv").querySelectorAll("span").forEach(span => span.classList.toggle("night"));
    document.querySelectorAll("input").forEach(input => input.classList.toggle("night"));
    document.querySelectorAll("button").forEach(button => button.classList.toggle("night"));
    document.querySelectorAll(".dial").forEach(dial => dial.classList.toggle("night"));

    document.querySelector(".active").classList.remove("active");
    document.getElementById(themeId).classList.add("active");

    document.querySelector("body").classList.toggle("night");
    document.querySelector("select").classList.toggle("night");
    document.getElementById("seeker").classList.toggle("night");
}