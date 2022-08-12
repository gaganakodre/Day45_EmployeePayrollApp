const stringifyDate = (date) =>
{
    const options = {day:'numeric', month:'long',year:'numeric'};
    const newDate = !date?"undefined": new Date(Date.parse(date)).toLocaleDateString('en-GB',options);
    return newDate;
}
const checkName=(name)=>
        {
            let nameRegex=RegExp("^[A-Z]{1}[a-z]{2,}$");
            if(!nameRegex.test(name))  throw "Name is incorrect!";
        }
        
const checkStartDate=(startDate)=>
        {
            let now=new Date();
            if(startDate > now) throw "Start date is a future date";
            var diff=Math.abs( now.getTime() - startDate.getTime());
            if(diff/(1000 * 60 * 60 * 24) > 30) 
            throw "Start date is beyond 30 days";
        }