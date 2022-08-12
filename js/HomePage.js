let empPayrollList;
window.addEventListener("DOMContentLoaded", (event) =>
 {
    if(site_properties.use_local_storage.match("true"))
    {
        empPayrollList=getEmployeePayrollDataFromStorage();
        processEmployeePayrollDataResponse();
    }
    else
    {
        getEmployeePayrollDataFromServer();
    }
    
 });
 const getEmployeePayrollDataFromStorage=()=>{
    return localStorage.getItem('EmployeePayrollList') ?
    JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
 }
 const processEmployeePayrollDataResponse=()=>{
    localStorage.removeItem('editEmp');
    document.querySelector(".emp-count").textContent=empPayrollList.length;
    createInnerHtml();
 }
 const getEmployeePayrollDataFromServer = () => {
    makeServiceCall("GET",site_properties.server_url,true)
    .then(responseText => {
        empPayrollList=JSON.parse(responseText);
        processEmployeePayrollDataResponse();
    })
    .catch(error => {
        console.log("GET Error Status: "+JSON.stringify(error));
        empPayrollList=[];
        processEmployeePayrollDataResponse();
    });
 }
    const createInnerHtml=()=>{
        const headerHtml= " <tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
       if(empPayrollList.length==0) return;
        let innerHtml=`${headerHtml}`;
        for(const empPayRollData of empPayrollList)
        {console.log(empPayRollData)
         innerHtml=`${innerHtml}
            <tr>
            <td><img src="${empPayRollData._profilePic}" alt="profile" style="width=20px;height=20px;"></td>
            <td>${empPayRollData._name}</td>
            <td>${empPayRollData._gender}</td>
            <td>${getDeptHtml(empPayRollData._department)}</td>
            <td>${empPayRollData._salary}</td>
            <td>${stringifyDate(empPayRollData._startDate)}</td>
            <td>
                <img id="${empPayRollData.id}" onclick="remove(this)" src="../assest/Icon/deleteIcon.svg" alt="delete" />
                <img id="${empPayRollData.id}" onclick="update(this)" src="../assest/Icon/EditIcon.svg" alt="edit" />
            </td>
        </tr>`
        };
        document.getElementById('display_container').innerHTML=innerHtml;
        
    }
    
    // const stringifyDate = (date) =>
    //     {
    //         const options = {day:'numeric', month:'short',year:'numeric'};
    //         const newDate = !date?"undefined": new Date(Date.parse(date)).toLocaleDateString('en-GB',options);
    //         return newDate;

    //     }
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
                id:new Date().getTime(),
                _profilePic:'G:/FellowShip517/Day45_EmployeePayrollApp/Day45_EmployeePayrollApp/assest/profilepic/Ellipse -1.png'
            },
            {
                _name:'karan',
                _gender:'male',
                _department:['Engineer','Finance'],
                _salary:'500000',
                _startDate:'29 oct 2021',
                _note:'',
                id:new Date().getTime()+1,
                _profilePic:'../assets/profilepic/Ellipse-1.png'
            }
        ];
        return empPayrollListLocal;
    }
    const remove=(node)=>{
        let empPayRollData=empPayrollList.find(empData=>empData.id==node.id);
        if(!empPayRollData) return;
        const index=empPayrollList
        .map(empData=>empData.id)
        .indexOf(empPayRollData.id);
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent=empPayrollList.length;
    createInnerHtml();
    }
    //update
    let update = (node) =>
            {
                let empPayRollData=empPayrollList.find(empData => empData.id == node.id);
                if(!empPayRollData) return;
                localStorage.setItem('editEmp',JSON.stringify(empPayRollData));
                window.location.replace(site_properties.add_emp_payroll_pages);
            } 
    
