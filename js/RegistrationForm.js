//uc6-salary
var salaryInput=document.querySelector('#Salary')
var salaryerror=document.querySelector('.salary-output');
salaryerror.textContent=salaryInput.value;
salaryInput.addEventListener('input',function()
{
    salaryerror.textContent=salaryInput.value;
});
//name validation
const text=document.querySelector('#name');
        const error=document.querySelector('.error');
        text.addEventListener('input',function()
        {
            let nameRegex=RegExp("^[A-Z]{1}[a-z]{2,}$");
            if(nameRegex.test(text.value))
            {
                error.textContent="";
            }
            else
            {
                error.textContent="Name is Invalid";

            }

        });