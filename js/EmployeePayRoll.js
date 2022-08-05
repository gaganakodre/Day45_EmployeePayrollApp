class EmployeePayRollData
{
    //validating the id
    get id(){return this._id;}
    set id(id){
        this._id=id;
    }
    //validating name
    get name() {return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name))//test is used to check pattren is mathing or not
        {
            this._name = name;
        }
        else throw 'Name is Incorrect!'; 
        //console.log("To set the name: "+name)
        this._name=name;
    }
    //validating profile pic
    get profilePic(){return this._profilePic; }
    set profilePic(profilePic){
        this._profilePic=profilePic;
    }
    //validating salary
    get salary() { return this._salary; }
    set salary(salary) 
        {
            this._salary = salary;
        }
    //validating gender
    get gender() { return this._gender; }
    set gender(gender)
        {
            this._gender=gender;
        }
        //validating department
    get department() { return this._department; }
    set department(department)
        {
            this._department=department;
        }
        //validating department
    get note() { return this._note; }
    set note(note)
        {
            this._note;
        }
    //Validate start date is not future date
    get startDate(){ return this._startDate };
    set startDate(startDate)
        {
            this._startDate = startDate;
        }

    //method
    toString()
    {
        const options = { year: 'numeric', month: 'long', day: 'numeric'};
        const empDate = this.startDate == undefined ? "undefined" : this.startDate.toLocaleDateString("en-US", options);
        return "id:"+this.id +",name: "+this.name +",\tsalary" +this.salary +", \tgender" +this.gender+",\tstartDate:"+this.empDate
        +",\tprofilepic: "+this.profilePic +",\tdepartment: "+this.department +",\tnote: "+this.note;
        
    }
}

