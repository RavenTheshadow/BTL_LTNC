username = sessionStorage.getItem('Username');
if (username !== "" && username != null) {
    document.querySelector('.header .login-btn a').innerText = username;
}
else {
    document.querySelector('.header .login-btn a').innerText = "Tài khoản";
}

let Medicine_ID = document.querySelector('.MID_1');
let ID = Medicine_ID.textContent.trim();

let apiUrl = `/api/medicine/get/${ID}`;

try {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể lấy dữ liệu từ server");
            }
            return response.json();
        })
        .then(DT => {

            let data = DT.data;
            let Info = document.querySelector('.layout-2')
            Info.querySelector('.Name').innerHTML = data.name;
            Info.querySelector('.Type').innerHTML = data.type;
            Info.querySelector('.Classify').innerHTML = data.classify;
            Info.querySelector('.Use').innerHTML = data.uses;
            Info.querySelector('.N_Use').innerHTML = data.n_Uses;
            Info.querySelector('.Validated').innerHTML = data.validated;
            Info.querySelector('#number').innerHTML = parseInt(data.amount);
            Info.querySelector('.Description').innerHTML = data.description;
            document.querySelector('.image').src = data.img_Url;

            let SPAN = document.getElementById('Is_aval');

            try {
                var number = parseInt(data.amount);
                if (isNaN(number)) {
                    throw "Không phải là số";
                } else if (number === 0) {
                    SPAN.textContent = "Không có sẵn";
                    SPAN.style.color = "red";
                } else if (number > 0) {
                    SPAN.textContent = "Còn hàng";
                    SPAN.style.color = "green";
                } else {
                    throw "Số lượng thuốc không hợp lệ";
                }
            } catch (error) {
                SPAN.textContent = error;
                SPAN.style.color = "red";
            }
            let newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${data.history.day_Input}</td>
                <td>Nhập hàng</td>
            `;
            document.querySelector('table tbody').appendChild(newRow);

            for (let i = 0; i < data.history.export_Date.length; i++) {
                let newRow = document.createElement('tr');
                newRow.innerHTML = `
                <td>${data.history.export_Date[i]}</td>
                <td>Xuất hàng</td>
            `;
                document.querySelector('table tbody').appendChild(newRow);
            }
            if(data.amount <= 0) {
                alert("Đã hết thuốc. Vui lòng nhập thêm thuốc.")
            }
        })
} catch (error) {
    alert(error);
}




document.querySelector('.Click').addEventListener("click", () => {
    window.location.href = '/medicine/form';
});