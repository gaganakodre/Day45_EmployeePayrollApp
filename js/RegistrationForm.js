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
            (new EmployeePayrollData()).name = name.value;;
            textError.textContent= " ";
        }
        catch(e)
        {
            textError.textContent = e;
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('salary-output');
    output.textContent= salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    });
});
const save=()=>{
    
    try{
        let employeePayrollData=createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
        return;
        
    }
     catch(e){
         return;
     }
}

//local sorage
function createAndUpdateStorage(employeePayrollData)
{
  let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if(employeePayrollList!=undefined)
  {
    employeePayrollList.push(employeePayrollData);
  }
  else{
    employeePayrollList=[employeePayrollData];
  }
  alert(employeePayrollList.toString());
  localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
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