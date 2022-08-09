
window.addEventListener("DOMContentLoaded", (event) => {
    createInnerHtml(); });
    const createInnerHtml=()=>{
        const headerHtml= " <tr><th></th<th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
       let empPayRollData=createEmployeeJSON()[0]; 
       const innerHtml=`${headerHtml}
        <tr>
            <td><img class="profile" src="${empPayRollData._profilPic}" alt=""></td>
            <td>${empPayRollData._name}</td>
            <td>${empPayRollData._gender}</td>
            <td><div class="dept-label">${empPayRollData._department[0]}</div><div class="dept-label">${empPayRollData._department[1]}</div></td>
            <td>${empPayRollData._salary}</td>
            <td>${empPayRollData._startDate}</td>
            <td>
                <img name="${empPayRollData._id} " onclick="remove(this)" src="../assest/Icon/deleteIcon.svg" alt="delete" />
                <img name="${empPayRollData._id} " onclick="update(this)" src="../assest/Icon/EditIcon.svg" alt="edit" />
            </td>
        </tr>`;
        document.getElementById('display_container').innerHTML=innerHtml;
        
    }
    const getDeptHtml=(deptList)=>{
     let deptHtml='';
     for(const dept of deptList){
        deptHtml=`${deptHtml}<div class='dept-label'>${dept}</div>`
     }
     return deptHtml;
    }
    const createEmployeeJSON=()=>{
        let empPayrollListLocal=[
            {
                _name: 'kavana',
                _gender:'Female',
                _department:['Engineer','Finance'],
                _salary:'500000',
                _startDate:'29 oct 2021',
                _note:'',
                _id:new Date().getTime(),
                _profilePic:'../assets/profilepic/Ellipse-1.png'
            },
            {
                _name:'karan',
                _gender:'male',
                _department:['Engineer','Finance'],
                _salary:'500000',
                _startDate:'29 oct 2021',
                _note:'',
                _id:new Date().getTime()+1,
                _profilePic:'../assets/profilepic/Ellipse-1.png'
            }
        ];
        return empPayrollListLocal;
    }
    
     
    