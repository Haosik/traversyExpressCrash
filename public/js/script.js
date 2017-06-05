let deleteBtns = document.querySelectorAll('.deleteUser');
for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', function (e) {
        e.preventDefault();
        deleteUser(deleteBtns[i]);
    });
}

let deleteUser = (elem) => {
    
    let confirmation = confirm("Are you sure?")
    if (confirmation) {
        let userId = elem.dataset.id;   
        console.log(userId);
        let xhr = new XMLHttpRequest;
        xhr.open("DELETE", "/users/delete/" + userId, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                window.location.replace('/');
            }
        }
        xhr.send();
    } else {
        console.log('Cancelled deletion');
    }

}