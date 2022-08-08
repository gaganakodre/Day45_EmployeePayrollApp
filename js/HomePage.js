window.addEventListener("DOMContentLoaded", (event) => {
    createInnerHtml(); });
    const createInnerHtml=()=>{
        const innerHtml=` <tr>
                <th></th>
                <th>Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Start Date</th>
                <th>Actions</th>
        </tr>
        
        <tr>
            <td><img class="profile" src="../assest/profilepic/Ellipse -1.png" alt=""></td>
            <td>shreeGowri</td>
            <td>Female</td>
            <td><div class="dept-label">HR</div><div class="dept-label">Finance</div></td>
            <td>6000000</td>
            <td>1 nov 2008</td>
            <td>
                <img src="../assest/Icon/deleteIcon.svg" alt="delete" />
                <img src="../assest/Icon/EditIcon.svg" alt="edit" />
            </td>
        </tr>
        
        `;
        document.getElementById('display_container').innerHTML=innerHtml;
        
    }
     
    