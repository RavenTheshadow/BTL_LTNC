username = sessionStorage.getItem('Username');
if (username !== "" && username != null) {
    document.querySelector('.header .login-btn a').innerText = username;
}
else {
    document.querySelector('.header .login-btn a').innerText = "Tài khoản";
}

// document.addEventListener("DOMContentLoaded", function () {
var tabLinks = document.querySelectorAll(".list-group-item");

tabLinks.forEach(function (tabLink) {
    tabLink.addEventListener("click", function (event) {
        event.preventDefault();

        tabLinks.forEach(function (link) {
            link.classList.remove("active");
        });

        tabLink.classList.add("active");

        var targetPaneId = tabLink.getAttribute("href");

        var tabPanes = document.querySelectorAll(".tab-pane");
        tabPanes.forEach(function (pane) {
            pane.classList.remove("active", "show");
        });

        var targetPane = document.querySelector(targetPaneId);
        targetPane.classList.add("active", "show");
    });
});
// });

// TAO MOT BENH NHAN MOI
document.querySelector(".text-right .btn-primary").addEventListener("click",() =>{
    let Infomation;

    Infomation = {
        name: document.querySelector('.form-group input[name="name"]').value,
        phone_number: document.querySelector('.form-group input[name="phone"]').value,
        address: document.querySelector('.form-group input[name="address"]').value,
        b_day: document.querySelector('.form-group input[name="b_day"]').value,
        status: document.querySelector('.form-group textarea[name="status"]').value,
        treatment_schedule: document.querySelector('.form-group textarea[name="treatment_schedule"]').value,
        medical_history: document.querySelector('.form-group textarea[name="medical_history"]').value,
        dr: document.querySelector('.form-group select[name="dr"]').value,
        room: document.querySelector('.form-group input[name="room"]').value,

        comment_customer_care: document.querySelector('.form-group input[name="comment_customer_care"]').value,
        comment_service: document.querySelector('.form-group input[name="comment_service"]').value,
        comment_attitude: document.querySelector('.form-group input[name="comment_attitude"]').value,
        comment_healthcare: document.querySelector('.form-group input[name="comment_healthcare"]').value,

        morning: document.querySelector('.form-group textarea[name="morning"]').value,
        afternoon: document.querySelector('.form-group textarea[name="afternoon"]').value,
        evening: document.querySelector('.form-group textarea[name="evening"]').value,
        note: document.querySelector('.form-group textarea[name="Note"]').value,
    }

    console.log(Infomation)
    // post data benh nhan
    fetch("/postdatainfo", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Infomation), // Chuyển đổi đối tượng JavaScript thành chuỗi JSON
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === true) {
                document.querySelector('.ID-patient').innerText = data.data
                document.querySelector('.notification').style.visibility = 'visible'
            }
            // loi nhap du lieu
            else {
                alert(data.message)
            }
        })
        .catch(err => {
            console.log(err)
        })


})


// CHUYEN TRANG THONG TIN BENH NHAN
var checkNewPatient = sessionStorage.getItem("newPatient")
console.log(typeof checkNewPatient)
if (checkNewPatient === 'false') {
    fetch("/patient/getData", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(data => {
            // LoadDataPatient(data)
            console.log(data.data)
            var patient;
            data.data.forEach(function(e) {
                if (e.id === sessionStorage.getItem("IdPatientInfo")) {
                    patient = e;
                }
            })
            console.log(patient)
            LoadDataPatient(patient)

        })
        .catch(err => console.log(err))
}

console.log(sessionStorage.getItem("IdPatientInfo"))

console.log(typeof sessionStorage.getItem("IdPatientInfo"))

function LoadDataPatient(data) {
    template =
        `
          <h4 class="font-weight-bold py-3 mb-4">Thông tin bệnh nhân</h4>
          <div class="card overflow-hidden">
            <div class="row no-gutters row-bordered row-border-light">
              <div class="col-md-3 pt-0">
                <div class="list-group list-group-flush account-settings-links">
                  <a
                          class="list-group-item list-group-item-action active"
                          data-toggle="list"
                          href="#account-general"
                          style="font-size: medium;"
                  >Chung</a
                  >
                  <a
                          class="list-group-item list-group-item-action"
                          data-toggle="list"
                          href="#account-info"
                          style="font-size: medium;"
                  >Chi tiết</a
                  >
                  
                  <a
                  class="list-group-item list-group-item-action"
                  data-toggle="list"
                  href="#account-comment"
                  style="font-size: medium;"
                  >Đánh giá</a
                  >
                  
                  <a
                  class="list-group-item list-group-item-action"
                  data-toggle="list"
                  href="#account-medical"
                  style="font-size: medium;"
                  >Đơn thuốc</a
                  >
                  
                </div>
              </div>
              <div class="col-md-9">
                <div class="tab-content">
                  <div class="tab-pane fade active show" id="account-general">
                    <div class="card-body">
                      <div class="form-group">
                        <label class="form-label" style="font-size:small;">Họ và tên</label>
                          <input
                                  name = "name"
                                  type="text"
                                  class="form-control mb-1"
                                  style="font-size:small;"
                                  value="${data.name}"
                                  readonly
                          />
                      </div>
        
                      <div class="form-group">
                        <label class="form-label" style="font-size:small;">Phòng điều trị</label>
                          <input
                                  name="room"
                                  type="text"
                                  class="form-control mb-1"
                                  style="font-size:small;"
                                  value="${data.room}"
                          />
        
                      </div>
                      <div class="form-group">
                        <label class="form-label" style="font-size:small;">Số điện thoại</label>
                        <input
                                name="phone"
                                type="text"
                                class="form-control mb-1"
                                style="font-size:small;"
                                value="${data.phone_number}"
                        />
        
                      </div>
                      <div class="form-group">
                        <label class="form-label" style="font-size:small;">Địa chỉ lưu trú</label>
                        <input
                                name="address"
                                type="text"
                                class="form-control mb-1"
                                style="font-size:small;"
                                value="${data.address}"
                        />
                      </div>
                      <div class="form-group">
                        <label class="form-label" style="font-size:small;">Năm sinh</label>
                        <input
                                name="b_day"
                                type="text"
                                class="form-control"
                                style="font-size:small;"
                                value="${data.b_day}"
                                readonly
                        />
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="account-info">
                    <div class="card-body pb-2">
                      <div class="form-group">
                        <label class="form-label" style="font-size:small;">Tình trạng</label>
                        <textarea class="form-control" rows="5" style="font-size:small;" name="status" >${data.status}
                        </textarea>
                      </div>
                      <div class="form-group">
                        <label class="form-label" style="font-size:small;" >Lịch trình điều trị</label>
                        <textarea class="form-control" rows="5" style="font-size:small;" name="treatment_schedule">${data.treatment_schedule}
                        </textarea>
                      </div>
                      <div class="form-group">
                        <label class="form-label" style="font-size:small;" >Tiền sử bệnh án</label>
                        <textarea
                                name="medical_history"
                                class="form-control"
                                row ="5"
                                style="font-size:small;"
                        >${data.medical_history}
                        </textarea>
                      </div>
                      <div class="form-group">
                        <label class="form-label" style="font-size:small;">Bác sĩ phụ trách</label>
                        <select class="custom-select" style="font-size:small;" name="dr" id="select-dr">
                          <option value="tuankiet">Phan Tuấn Kiệt </option>
                          <option value="tranlam" selected>Trần Lâm (đẹp trai)</option>
                          <option value="giathang">Hồ Gia Thắng</option>
                          <option value="hailam">Dương Hải Lâm</option>
                          <option value="anhtai">Nguyễn Anh Tài</option>
                          <option value="minhtam">Nguyễn Minh Tâm</option>
                        </select>
                      </div>
                    </div>
                  </div>

              
              <div class="tab-pane fade" id="account-comment">
        <div class="card-body pb-2">
          <div class="form-group">
            <label class="form-label" style="font-size:small;">Dịch vụ hỗ trợ và chăm sóc khách hàng</label>
            <input
                    name ="comment_customer_care"
                    type="number"
                    class="form-control mb-1"
                    style="font-size:small;"
                    placeholder="0-100"
                    value="${data.comment_customer_care}"
            />
            <div class="form-group">
              <label class="form-label" style="font-size:small;">Cơ sở vật chất và trang thiết bị</label>
              <input
                      name ="comment_service"
                      type="number"
                      class="form-control mb-1"
                      style="font-size:small;"
                      placeholder="0-100"
                      value="${data.comment_service}"
              />
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:small;">Thái độ nhân viên</label>
              <input
                      name ="comment_attitude"
                      type="number"
                      class="form-control mb-1"
                      style="font-size:small;"
                      placeholder="0-100"
                      value="${data.comment_attitude}"
              />
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:small;">Chất lượng dịch vụ khám chữa bệnh</label>
              <input
                      name = "comment_healthcare"
                      type="number"
                      class="form-control mb-1"
                      style="font-size:small;"
                      placeholder="0-100"
                      value="${data.comment_healthcare}"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div class="tab-pane fade" id="account-medical">
            <div class="card-body pb-2">
              <div class="form-group">
                <label class="form-label" style="font-size:small;">Buổi sáng</label>
                <textarea class="form-control" rows="2" style="font-size:small;" name="morning"
                >${data.morning}</textarea>
              </div>
              <div class="form-group">
                <label class="form-label" style="font-size:small;" >Buổi chiều</label>
                <textarea class="form-control" rows="2" style="font-size:small;" name="afternoon"
                
                >${data.afternoon}</textarea>
              </div>
              <div class="form-group">
                <label class="form-label" style="font-size:small;" >Buổi tối</label>
                <textarea
                        class="form-control"
                        row ="2"
                        style="font-size:small;"
                        name="evening"
                        
                >${data.evening}</textarea>
              </div>
              <div class="form-group">
                <label class="form-label" style="font-size:small;" >Chú ý</label>
                <textarea
                        class="form-control"
                        row ="2"
                        style="font-size:small;"
                        name="Note"
                        
                >${data.note}</textarea>
              </div>
            </div>
          </div>
      
      </div>
     </div>     
    </div>
   </div>
        
        
          <div class="text-right mt-3">
            <button type="button" class="btn btn-primary" style="font-size:medium;" >Lưu</button>&nbsp;
          </div>
        `
    document.querySelector(".container").innerHTML = template;

    // hien thi select doctor khi xem thong tin
    var selectdr = document.getElementById('select-dr');
    console.log(selectdr)
    for (var i = 0; i < selectdr.options.length; i++) {
        var option = selectdr.options[i]
        if (option.value === data.dr) {
            option.selected = true
            option.disabled = true
            break
        }
    }

    // document.addEventListener("DOMContentLoaded", function () {
    var tabLinks = document.querySelectorAll(".list-group-item");

    tabLinks.forEach(function (tabLink) {
        tabLink.addEventListener("click", function (event) {
            event.preventDefault();

            tabLinks.forEach(function (link) {
                link.classList.remove("active");
            });

            tabLink.classList.add("active");

            var targetPaneId = tabLink.getAttribute("href");

            var tabPanes = document.querySelectorAll(".tab-pane");
            tabPanes.forEach(function (pane) {
                pane.classList.remove("active", "show");
            });

            var targetPane = document.querySelector(targetPaneId);
            targetPane.classList.add("active", "show");
        });
    });


    document.querySelector(".text-right .btn-primary").addEventListener("click",() =>{
        let Infomation;

        Infomation = {
            name: document.querySelector('.form-group input[name="name"]').value,
            phone_number: document.querySelector('.form-group input[name="phone"]').value,
            address: document.querySelector('.form-group input[name="address"]').value,
            b_day: document.querySelector('.form-group input[name="b_day"]').value,
            status: document.querySelector('.form-group textarea[name="status"]').value,
            treatment_schedule: document.querySelector('.form-group textarea[name="treatment_schedule"]').value,
            medical_history: document.querySelector('.form-group textarea[name="medical_history"]').value,
            dr: document.querySelector('.form-group select[name="dr"]').value,
            room: document.querySelector('.form-group input[name="room"]').value,

            comment_customer_care: document.querySelector('.form-group input[name="comment_customer_care"]').value,
            comment_service: document.querySelector('.form-group input[name="comment_service"]').value,
            comment_attitude: document.querySelector('.form-group input[name="comment_attitude"]').value,
            comment_healthcare: document.querySelector('.form-group input[name="comment_healthcare"]').value,

            morning: document.querySelector('.form-group textarea[name="morning"]').value,
            afternoon: document.querySelector('.form-group textarea[name="afternoon"]').value,
            evening: document.querySelector('.form-group textarea[name="evening"]').value,
            note: document.querySelector('.form-group textarea[name="Note"]').value,
        }

        console.log(Infomation)

        fetch(`/updatedatainfo/${data.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Infomation), // Chuyển đổi đối tượng JavaScript thành chuỗi JSON
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === true) {
                    document.querySelector('.ID-patient').innerText = data.message
                    document.querySelector('.notification').style.visibility = 'visible'
                }
            })
            .catch(err => console.log(err))
    })


}

document.getElementById("cancle-notify").addEventListener("click", ()=>{
    document.querySelector('.notification').style.visibility = 'hidden'
})

document.querySelector('.notification .content-notif .info-copy .copy').addEventListener('click', () => {
    let id = document.querySelector('.info-copy span').textContent;
    navigator.clipboard.writeText(id).then(r => {
        document.querySelector('.copy-notify').innerText = "Đã copy vào clipbroad"
    })
})

// }