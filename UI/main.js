if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/' })
        .then(() => console.log("Registration successful"))
        .catch((err) => console.log("Registration unsuccessful ", err))
}

populateEntries();
hideForm();
function populateEntries() {
    const entries = window.localStorage.getItem("gratitude-entries");
    console.log(entries);
    if (entries==undefined || entries==null) {
        const dailyEntries = document.getElementById("gratitude-entries");
        dailyEntries.innerHTML = "No entries found! Why don't you create one!";
        document.getElementById("new-entry").style.visibility="hidden";
    }
    else {
        const g_entries=JSON.parse(entries);
        const dailyEntries = document.getElementById("gratitude-entries");
        dailyEntries.innerHTML = "";
        g_entries.entry.forEach(entry => {
            const gratitudeEntry = document.createElement("div");
            gratitudeEntry.innerHTML=entry;
            document.getElementById("gratitude-entries").appendChild(gratitudeEntry);
        })
    }
}

document.getElementById("save").setAttribute("disabled", "true");

function addEntries(entry) {

    const entries = localStorage.getItem("gratitude-entries");
    console.log(entries);
    if (entries==undefined || entries==null) {
        const check = { "entry": [entry] };
        console.log(check);
        localStorage.setItem("gratitude-entries", JSON.stringify(check));
    }
    else {
        const g_entry=JSON.parse(entries);
        console.log(g_entry);
        g_entry.entry.push(entry);
        localStorage.setItem("gratitude-entries", JSON.stringify(g_entry));
    }
    populateEntries();
}

function fadeOut() {
    addEntries(document.getElementById("gratitude").value);
    document.getElementById("new-entry").className = "fadeOut";
    console.log("hello");

}

function toggleSave() {
    if (document.getElementById("gratitude").value.length > 15) {
        document.getElementById("save").removeAttribute("disabled")
        document.getElementById("save").className = "saveEnabled";
    }
    else {
        document.getElementById("save").setAttribute("disabled", true);
        document.getElementById("save").className = "saveDisabled";
    }
}

function showForm(){
    document.getElementById("new-entry").style.visibility="visible";
    document.getElementById("new-entry").className = "fadeIn";
    document.getElementById("gratitude").value="";
}

function hideForm(){
    document.getElementById("new-entry").className = "fadeOut";
    document.getElementById("gratitude").value="";
}