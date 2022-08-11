
let isUpdate=false;
let employeePayrollObj={};
window.addEventListener('DOMContentLoaded', (event) => {
    const name =document.querySelector('#name');
    const textError =  document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0)
        {
            textError.textContent = " ";
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            textError.textContent= " ";
        }
        catch(e)
        {
            textError.textContent = e;
        }
    });
    const date=document.querySelector('#date');
    date.addEventListener('input',function()
    {
        const startDate=new Date(Date.parse(getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year')));
        try{
            (new EmployeePayrollData()).startDate=startDate;
            setTextValue('.error'," ");
        }
        catch(e)
        {
            setTextValue('.error',e);
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent= salary.value;
    salary.addEventListener('input', function() {
    output.textContent = salary.value;
      
    });
    checkForUpdate();
});
const checkForUpdate=()=>{
    const employeePayrollJson=localStorage.getItem('editEmp');
    isUpdate=employeePayrollJson ? true : false;
    if(!isUpdate)return;
    employeePayrollObj=JSON.parse(employeePayrollJson);
}
const setForm=()=>
{
    setValue('#name',employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._department);
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._note);
    let date=stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);

}
const setSelectedValues=(propertyValue,value)=>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item=>
        {
            if(Array.isArray(value)){
                item.checked=true;
            }
            else if(item.value===value)
            item.checked=true;
        });
}
// const save=()=>{
    
//     try{
//         let employeePayrollData=createEmployeePayroll();
//         createAndUpdateStorage(employeePayrollData);
//         return;
        
//     }
//      catch(e){
//          return;
//      }
// }
//save fuction
const save=(event)=>
{
    // event.preventDefault();
    // event.stopPropagation();
    try{
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }
    catch(e)
    {
        return(e);
    }
}
//setemployeeobject
const setEmployeePayrollObject=()=>
{
    employeePayrollObj._name=getInputValueById('#name');
    employeePayrollObj._profilePic=getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender=getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department=getSelectedValues('[name=department]');
    employeePayrollObj._salary=getInputValueById('#salary');
    employeePayrollObj._note=getInputValueById('#notes');
    let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollObj._startDate=date;
}
//local sorage
const createAndUpdateStorage=()=>
{
    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList)
    {
        let empPayRollData=employeePayrollList.find(empData._id==employeePayrollObj._id);
        
            if(!empPayRollData)
            {
                employeePayrollList.push(createEmployeePayrollData());
            }
            else{
                const index=employeePayrollList.map(empData=>empData._id).indexOf(empPayRollData._id);
                employeePayrollList.splice(index,1,createEmployeePayrollData(empPayRollData._id));
            }
    }
    else
    {
            employeePayrollList=[createEmployeePayrollData()]
    }
        localStorage.setItem("EmployeePayrollList",JSON.parse(employeePayrollList))

    }


// function createAndUpdateStorage = ()=>
// {
//   let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
//   if(employeePayrollList!=undefined)
//   {
//     employeePayrollList.push(employeePayrollData);
//   }
//   else{
//     employeePayrollList=[employeePayrollData];
//   }
//   alert(employeePayrollList.toString());
//   localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
// }
//method for create and update
const createEmployeePayrollData=(id)=>
{
    let employeePayrollData=new EmployeePayrollData();
    if(!id) employeePayrollData.id=createNewEmployeeId();
    else employeePayrollData.id=id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}
const setEmployeePayrollData=(employeePayrollData)=>
{
    try{
        employeePayrollData.name=employeePayrollObj._name;
    }
    catch(e)
    {
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic=employeePayrollObj._profilePic;
    employeePayrollData.gender=employeePayrollObj._gender;
    employeePayrollData.department=employeePayrollObj._department;
    employeePayrollData.salary=employeePayrollObj._salary;
    employeePayrollData.note=employeePayrollObj._note;
    try{
        employeePayrollData.startDate=new Date(Date.parse(employeePayrollObj._startDate));
    }
    catch(e)
    {
        setTextValue('.error',e);
        throw e;
    }
    alert(employeePayrollData.toString());
}
//creating the employee id
const createNewEmployeeId=()=>
    {
        let empID=localStorage.getItem("EmployeeID");
        empID=!empID ? 1 :(parseInt(empID)+1).toString();
        localStorage.setItem("EmployeeID",empID);
        return empID;
    }
    
const createEmployeePayroll=()=>{
    let employeePayrollData=new EmployeePayrollData();
    try{
        employeePayrollData.name=getInputValueById('#name');
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic=getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
    employeePayrollData.department=getSelectedValues('[name=department]');
    employeePayrollData.salary=getInputValueById('#salary');
    employeePayrollData.note=getInputValueById('#notes');
    let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.date=new Date(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
    }
    const setTextValue=(id,value)=>{
        const element=document.querySelector(id);
        element.value=value;
      }
    const getSelectedValues=(propertyValue)=>{
    let allItems=document.querySelectorAll(propertyValue);
    let setItems=[];
    allItems.forEach(item=>{
        if(item.checked)setItems.push(item.value);
    });
    return setItems;

}
const getInputValueById=(id)=>{
    let value=document.querySelector(id).value;
    return value;
}
const getInputElementValue=(id)=>{
    let value=document.getElementById(id).value;
    return value;
}


//reset button
const resetForm=() =>
{
  setValue('#name','');
  setValuebyClassName('.text-error','');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValuebyClassName('.salary-output','400000');
  setValue('#notes','');
  setValue('#day','1');
  setValue('#month','january')
  setValue('#year','2022');
  alert("The Form has been reseted");
}
const unsetSelectedValues=(propertyValue)=>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked=false;
    });
}
const setValue=(id,value)=>{
    const element = document.querySelector(id);
    element.value=value;
  }
  
  const setValuebyClassName=(id,value)=>{
    const element=document.querySelector(id);
    element.textContent=value;
  }