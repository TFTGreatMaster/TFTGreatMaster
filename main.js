const inputBox = document.querySelector(`.app .add input`);
const addBtn = document.querySelector(`.app .add button`);
const Items = document.querySelector(`.app .content .items`);
const popup = document.querySelector(`.app .popup`);

showData()
inputBox.onkeyup = () => {
    let useData = inputBox.value;
    if (useData.trim() != 0) {
        addBtn.classList.add("add__btn-active")
    } else {
        addBtn.classList.remove("add__btn-active")
    }
}
addBtn.onclick = () => {
    let useData = inputBox.value;
    let getData = localStorage.getItem("Data");
    if (getData === null) {
        listArr = []
    } else {
        listArr = JSON.parse(getData)
    }
    if (useData.trim() != 0) {
        listArr.push({
            useData: useData,
            active: false
        });
        localStorage.setItem("Data", JSON.stringify(listArr))
        showData()
    }

}
function showData() {
    let getData = localStorage.getItem("Data");
    if (getData === null) {
        listArr = []
    } else {
        listArr = JSON.parse(getData)
    }
    let newItems = '';
    listArr.forEach((element, index) => {
        if (element.active == false) {
            newItems += `<div class="item">
        <div class="item__status">
          <input type="checkbox" name="checked" id="${index}" />
          <label for="${index}" onclick="active(${index},false)"></label>
        </div>
        <div class="item__name">${element.useData}</div>
        <div class="item__action">
          <div class="btn item__action-edit" onclick ="edit(${index},'${element.useData}')">Edit</div>
          <div class="btn item__action-remove" onclick ="remove(${index})">Remove</div>
        </div>
      </div>`
        } else {
            newItems += `<div class="item">
        <div class="item__status">
          <input type="checkbox" name="checked" id="${index}" checked/>
          <label for="${index}" onclick="active(${index},true)"></label>
        </div>
        <div class="item__name" style="text-decoration-line:line-through">${element.useData}</div>
        <div class="item__action">
          <div class="btn item__action-edit" onclick ="edit(${index},'${element.useData}')">Edit</div>
          <div class="btn item__action-remove" onclick ="remove(${index})">Remove</div>
        </div>
      </div>`
        }
    });
    Items.innerHTML = newItems;
    inputBox.value = '';

}
function active(index, active) {
    listArr.forEach((e, i) => {
        if (i == index) {
            listArr.splice(i, 1, {
                useData: e.useData,
                active: !active
            })
            localStorage.setItem("Data", JSON.stringify(listArr))
            showData()

        }
    })
}
function remove(index) {
    listArr.forEach((e, i) => {
        if (i == index) {
            listArr.splice(i, 1)
            localStorage.setItem("Data", JSON.stringify(listArr))
            showData()

        }
    })
}
function edit(index, data) {
    const inputBox = document.querySelector(`.app .popup input`);
    const updateIcon = document.querySelector(`.app .popup .popup__btn-update`);
    const closeIcon = document.querySelector(`.app .popup .popup__btn-close`);
    const popup = document.querySelector(`.app .popup`);

    popup.style = `display:block`
    inputBox.value = data;
    updateIcon.onclick = () => {
        if (inputBox.value.trim() != 0) {
            listArr.forEach((e, i) => {
                if (i == index) {
                    listArr.splice(i, 1, {
                        useData: inputBox.value.trim(),
                        active: false
                    })
                    localStorage.setItem("Data", JSON.stringify(listArr))
                    popup.style = `display:none`
                    showData()
                }
            })
        }
    }
    closeIcon.onclick = () => {
        popup.style = `display:none`

    }
    popup.onclick = (e) => {
        if (e.target == popup) {
            popup.style = `display:none`
            console.log(`a`);
        }
    }
}