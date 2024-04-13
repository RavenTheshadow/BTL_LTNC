let doctorID = sessionStorage.getItem('doctorID');
loadSchedule();

// Thêm task
function addTask(taskObj, date, patient) {
    const week = document.querySelector('.week');

    const weekDay = week.children[date - 1];

    const taskLists = weekDay.querySelector('.task-lists');

    const task = document.createElement('div');
    task.classList.add('task');
    task.innerHTML =
        `<div class="task__short-description">
            <h3 class="task__name">${taskObj.name}</h3>
            <p class="task__location">${taskObj.location}</p>
            <p class="task__day">${taskObj.day}</p>
            <p class="task__time">${taskObj.from} - ${taskObj.to}</p>
        </div>
        <div class="task__detail">
            <div class="head">
                <div class="delete__task detail__icon">
                    <i class="fa-solid fa-trash"></i>
                </div>
                <div class="task__problem detail__icon">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div class="detail__close detail__icon">
                    <i style="font-size: 25px;" class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div class="detail">
                <h3 class="detail__name">${taskObj.name}</h3>
                <div class="detail__location">
                    <div class="detail__icon">
                        <i class="fa-solid fa-location-dot"></i>
                    </div>
                    <p>${taskObj.location}</p>
                </div>
                <div class="detail__time">
                    <div class="detail__icon">
                        <i class="fa-solid fa-clock"></i>
                    </div>
                    <p>${taskObj.day} - ${taskObj.from} - ${taskObj.to}</p>
                </div>
                <div class="detail__patient-info">
                    <div class="detail__icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <p class="patient-info">Thông tin bệnh nhân</p>
                </div>
            </div>
        </div>`
    //Add eventListener for task
    task.addEventListener('click', function(event) {
        const detailTasks = document.querySelectorAll('.task__detail');
        for (const item of detailTasks) {
            if (item.classList.contains('appear')) {
                item.classList.remove('appear');
            }
        }
        const taskDetail = task.querySelector('.task__detail');
        taskDetail.classList.add('appear');

        if (event.target.closest('.detail__close')) {
            taskDetail.classList.remove('appear');
        }
        if (event.target.closest('.task__problem')) {
            if(confirm('Bạn có chắc muốn đổi lịch không?')) {
                alert('Yêu cầu của bạn đang chờ xử lí');
            }
        }
        else if (event.target.closest('.delete__task')) {
            if (confirm('Bạn có chắc chắn là muốn xóa không?')) {
                fetch("http://localhost:8080/schedule/admin/delete?doctorID=" + doctorID, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(taskObj)
                })
                    .then(response => response.json())
                    .then(data => {
                        task.remove();
                        alert("Xóa thành công :(");
                    })
                    .catch(err => {
                        alert(err);
                        console.log(err);
                    });
            }
        }
        else if(event.target.closest('.patient-info')) {
            sessionStorage.setItem("newPatient", 'false')
            sessionStorage.setItem("IdPatientInfo", taskObj.patientID);
            window.location.href = "/patient/info";
        }
        // else if ()
    })
    taskLists.appendChild(task);
}

const openForm = document.querySelector('.create-btn');
openForm.addEventListener('click', function() {
    const form = document.querySelector('.form');
    form.classList.add('open');

    const closeForm = document.querySelector('.form .form__close');
    closeForm.addEventListener('click', function() {
        form.classList.remove('open');
        resetForm(form);
    })

    const submitBtn = document.querySelector('.form .submit');
    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const name = document.querySelector('.form .name__value');
        const day = document.querySelector('.form .day__value');
        const date = new Date(day.value);
        const dateNum = date.getDay() == 0 ? 7 : date.getDay();


        const timeFrom = document.querySelector('.form .time__from');
        const timeTo = document.querySelector('.form .time__to');
        const time = timeFrom.value + " - " + timeTo.value;
            
        const location = document.querySelector('.form .location__value');

        const patient = document.querySelector('.form .patient__value');

        let task = {
            name: name.value,
            location: location.value,
            day: reverseString(day.value),
            from: timeFrom.value,
            to: timeTo.value,
            patientID: patient.value,
            departmentName: sessionStorage.getItem('departmentName')
        }


        form.classList.remove('open');
        resetForm(form);

        //Thêm vào database
        fetch("http://localhost:8080/schedule/admin/add?doctorID=" + doctorID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        })
            .then(response => response.json())
            .then(data => {
                alert("Thêm thành công :)");
                if (date >= new Date) {
                    addTask(data, dateNum, data.patientID);
                }
            })
            .catch(function(err) {
                console.log(err);
                alert(err);
            });
    })

})

function resetForm(form) {
    const name = form.querySelector('.name__value').value = '';
    const day = form.querySelector('.day__value').value = '';
    const timeFrom = form.querySelector('.time__from').value = '';
    const timeTo = form.querySelector('.time__to').value = '';
    const location = form.querySelector('.location__value').value = '';
    const patient = form.querySelector('.patient__value').value = '';
}

// Đảo ngược 1 chuỗi
// yyyy-mm-dd -> dd-mm-yyyy
function reverseString(str) {
    let splitStr = str.split('-');
    splitStr = splitStr.reverse();
    return splitStr.join('/');
}

function reverse(str) {
    let arr = str.split('/');
    return arr.reverse().join('/');
}

function stringToTime(str) {
    let arr = str.split(':');
    return Number.parseFloat(arr[0]) + Number.parseFloat(arr[1]) / 60;

}

//Lấy lịch trình từ database
//Parameter nameDoctor lấy từ tài khoản đang đăng nhập
function loadSchedule() {
    fetch("http://localhost:8080/schedule/list?doctorID=" + doctorID)
        .then(response => response.json())
        .then(data => {
            //data ~ Tuần
            for (let index = 0; index < data.length; index++) {
                //data[index] ~ Thứ trong tuần
                data[index].sort(function(task, otherTask) {
                    let result = 0;
                    const dateTask = new Date(reverse(task.day));
                    const dateOtherTask = new Date(reverse(otherTask.day));
                    if (dateTask < dateOtherTask) {
                        result = -1;
                    }
                    else if (dateTask > dateOtherTask) {
                        result = 1;
                    }
                    else if (stringToTime(task.to) < stringToTime(otherTask.from)){
                        result = -1;
                    }
                    else {
                        result = 1;
                    }
                    return result;
                });
                for (let task of data[index]) {
                    let today = new Date();
                    let taskDay = new Date(reverse(task.day));
                    date = index + 1;
                    if (taskDay < today) {
                        continue;
                    }
                    addTask(task, date, "");
                }
            }
        })
        .catch(err => {
            alert(err);
            console.log(err);
        });
}