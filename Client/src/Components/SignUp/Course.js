import React from "react";

const Course = props => {
    const DI_COURSES = ["DEVELLOPEMENT",""];
    console.log(props.faculty);
    return(
        <div>
            <p style={{fontSize: 13}} >Course<br/>
             <select className="form-control" name="faculty" onChange={(e)=>props.handleChange(e)} >
            <optgroup label="Choose the faculty you belong to">
            <option value="DI" defaultValue>DI</option>
            <option value="BA">BA</option>
            <option value="FC">FC</option>
            <option value="GRH">GRH</option>
            <option value="IG">IG</option>
            <option value="RT">RT</option>
            <option value="SAE">SAE</option>
            <option value="TCM">TCM</option>
            </optgroup>
          </select></p>
        </div>
    )
}


export default Course;