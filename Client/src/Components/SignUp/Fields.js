import React from "react";


const Fields = props => {
    return(
        <div>
            <p style={{fontSize: 13}}>First Name *<input className="form-control" type="text" name="firstName" style={{backgroundColor: 'rgb(248,248,248)'}} onChange={(e)=>props.handleChange(e)} value={props.state.firstName}/></p>
          <p style={{fontSize: 13}}>Last Name *<input className="form-control" type="text" name="lastName" style={{backgroundColor: 'rgb(248,248,248)'}} onChange={(e)=>props.handleChange(e)} value={props.state.lastName}/></p>
          <p style={{fontSize: 13}}>Matricule *<input className="form-control" type="number" name="matricule" style={{backgroundColor: 'rgb(248,248,248)'}} onChange={(e)=>props.handleChange(e)} value={props.state.matricule}/></p>
            <p style={{fontSize: 13}}>Email *<input className="form-control" type="email" name="email" style={{backgroundColor: 'rgb(248,248,248)'}} onChange={(e)=>props.handleChange(e)} value={props.state.email}/></p>
            <p style={{fontSize: 13}}>Password *<br /><input className="form-control password" type="password" name="password" style={{backgroundColor: 'rgb(248,248,248)'}} onChange={(e)=>props.handleChange(e)} value={props.state.password}/></p>
            <p style={{fontSize: 13}}>Verify Password *<br /><input className="form-control" type="password" name="passwordverif" style={{backgroundColor: 'rgb(248,248,248)'}} onChange={(e)=>props.handleChange(e)}  value={props.state.passwordverif}/></p>
            <p style={{fontSize: 13}} >Account type<br/> <select className="form-control" name="user_type" onChange={(e)=>props.handleChange(e)} >
            <optgroup label="Choose te type of the account">
            <option value="student" defaultValue>student</option>
            <option value="teacher">teacher</option>
            </optgroup>
          </select>
          </p>
        </div>
    )
}

export default Fields;