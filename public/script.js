function populateFileListWithIcons() {
    fetch('/view')
        .then(response => response.json())
        .then(data => {
            const fileList = document.getElementById('fileList');
            fileList.innerHTML = '';
            //data is list of stored files
            data.files.forEach(fileName => {
                const listItem = document.createElement('li');
                listItem.className = 'file-item';
                //pop the list elements of the array and return it;
                const fileExtension = fileName.split('.').pop();

                const iconSpan = document.createElement('span');
                iconSpan.className = 'file-icon';
                iconSpan.innerHTML = getFileIconHTML(fileExtension);

                const fileLink = document.createElement('a');
                fileLink.href = `/uploads/${fileName}`;
                fileLink.textContent =`shihab's ${fileName}`;

                listItem.appendChild(iconSpan);
                listItem.appendChild(fileLink);

                fileList.appendChild(listItem);
            });
        })
        .catch(error => console.error(error));
}

function getFileIconHTML(fileExtension) {
    const iconClasses = {
        pdf: 'far fa-file-pdf',
        doc: 'far fa-file-word',
        docx: 'far fa-file-word',
        xls: 'far fa-file-excel',
        xlsx: 'far fa-file-excel',
        ppt: 'far fa-file-powerpoint',
        pptx: 'far fa-file-powerpoint',
        txt: 'far fa-file-alt',
        jpg: 'far fa-file-image',
        jpeg: 'far fa-file-image',
        png: 'far fa-file-image',
        gif: 'far fa-file-image',
        default: 'far fa-file'
    };

    return `<i class="${iconClasses[fileExtension.toLowerCase()] || 
        iconClasses['default']}"></i>`;
}

function deleteFile() {
    const deleteForm = document.getElementById('deleteForm');
    const formData = new FormData(deleteForm);

    fetch(`/delete/${formData.get('fileName')}`, {
        method: 'DELETE',
    })
        .then(response => response.text())
        .then(message => {
            alert(message);
            populateFileListWithIcons();
            populateDeleteOptions();
        })
        .catch(error => console.error(error));
}

function populateDeleteOptions() {
fetch('/view')
.then(response => response.json())
.then(data => {
    const fileSelect = document.getElementById('fileSelect');
    fileSelect.innerHTML = '';

    // Add an empty disabled option
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = '-- Select a file --';
    emptyOption.disabled = true;
    emptyOption.selected = true;
    fileSelect.appendChild(emptyOption);

    // Now add all the file options
    data.files.forEach(fileName => {
        const option = document.createElement('option');
        option.value = fileName;
        option.textContent = fileName;
        fileSelect.appendChild(option);
    });
})
.catch(error => console.error(error));
}


populateFileListWithIcons();
populateDeleteOptions();