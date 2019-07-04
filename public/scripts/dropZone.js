let dropZone = document.querySelector('.drop_zone');
let form2 = document.querySelector('#form2');
let dropText = document.querySelector('#drop__text');
let dropSelect = document.querySelector("#drop__select");
let cancel_button = document.querySelector('#cancel__button');
let warningMsg = document.querySelector('.warningMsg');
let drop_button = document.querySelector("#drop__button");

let originalLabelHtml = dropText.innerHTML;

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false)
});


function preventDefaults(e){
    e.preventDefault();
    e.stopPropagation();
};

['dragenter', 'dragover'].forEach(eventName =>{
    dropZone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, unhighlight, false);
});

function highlight(e){
    dropZone.classList.add('highlight');
}

function unhighlight(e) {
    dropZone.classList.remove('highlight');
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ handle drop
dropZone.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    dropSelect.files = files;
    
    handleFileDrag(files);
    
}

// function uploadFile(file) {


//     let formData = new FormData();
//     let url = '/form2';

//     formData.append("uploadzone", file, file.name);

//     // fetch(url, {
//     //     method: "POST",
//     //     body: formData
//     // })

//     return formData
// }

function handleFileDrag(files){

    // let theFile = files[0];
    

    showFile(files);

    // if(isValid){
    //     form2.addEventListener('submit', (e)=>{
    //         uploadFile(theFile)
    //     })
    // }


}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

dropSelect.addEventListener('change', handleFileClick, false);

function handleFileClick(e) {
    
    // input is change, e.target.files produces fileList

    let files = e.target.files;
    
    showFile(files);

}


function showFile(files) {

    let file = files[0];

    let uploadName = file.name;
    let newIcon = document.createElement("i");
    let nameTag = document.createElement("p");
    
    if(file){

        if (file.size <= 1){

            dropZone.classList.add("warning");
            warningMsg.textContent = "File size is zero, please check";
            drop__select.value = '';
            dropText.innerHTML = originalLabelHtml;
            drop_button.setAttribute('disabled', true);
            files.pop();
            return false;
            

        } else if( (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ) && (file.type !== "application/vnd.ms-excel") && (file.type !== "text/csv")){
            

            dropZone.classList.add("warning");
            warningMsg.textContent = "Invalid file type. Please upload .xlsx, .xls, or csv";
                // clear the drop value    
            drop__select.value = '';
            dropText.innerHTML = originalLabelHtml;

            // disable upload button
            drop_button.setAttribute('disabled', true);

            return false;
            
            

        }  else {

            drop_button.removeAttribute('disabled');
            dropZone.classList.remove("warning");
            warningMsg.textContent = "";
            newIcon.className = "far fa-file-excel fa-3x";
            nameTag.innerText = uploadName;
            dropText.innerHTML = '';
            dropText.appendChild(newIcon);
            dropText.appendChild(nameTag);

            return true;

        } 
    }
}



cancel_button.addEventListener('click', cancelUpload, false);

function cancelUpload(e){
    let drop__select = document.querySelector("#drop__select");

    // clear the drop value    
    drop__select.value = '';
    dropText.innerHTML = originalLabelHtml;
}

