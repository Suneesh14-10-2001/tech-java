

import React, { useState } from 'react';
import * as yup from 'yup';
const schema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long'),
    email: yup
      .string()
      .required()
      .email('Invalid email format'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
    gender: yup
     .string()
     .oneOf(["male","female"],'must select any field'),
    religion: yup
     .string()
     .oneOf(["hindhu","christian","muslim"],'must select any one'),
     agree: yup
     .string()
     .oneOf(["agree"],'must agree the terms and conditions ')
  });
function Myform(){
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    gender:'',
    religion:'',
    agree:'',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });
      alert("form is submitted")
      // Data is valid, proceed with form submission
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) =>{
        errors[err.path] = err.message;
      });
      setValidationErrors(errors);
    }
    
  };

  return (
    <div className="form" >        
    <form onSubmit={handleSubmit}>
        <h1>Form Validation</h1>
        <div className="div1">
      <label className="fname" name="name">Name;</label><br/>
      <input className="ename" type="text" name="username" id="demo" placeholder="name" value={formData.username}  onChange={handleChange} /><br/>
      <p className="par" id="par">{validationErrors.username}</p>
      </div>
      <div className="div2">
      <label className="phone" for="phone" >email;</label><br/>
      <input className="ephone" type="email" placeholder="fsbfb@gmail.com" name="email" value={formData.email} id="demo1" onChange={handleChange}/><br/>
      <p className="par1" id="par1">{validationErrors.email}</p>
      </div>
      <div className="div3">
      <label className="email" >password;</label><br/>
      <input className="eemail" name="password" type="password" placeholder="*******" value={formData.password} onChange={handleChange} id="demo2"/><br/>
      <p className="par2" id="par2">{validationErrors.password}</p>
      </div>
      <div className='div4'>
        <label className='gender' >Gender;</label>
        <input className='egender' name='gender' type="radio" value="male" onChange={handleChange}/>male
        <input type="radio" name="gender" value="female" onChange={handleChange} />female<br/>
        <p className="par3">{validationErrors.gender}</p>
      </div>
      <div className='div5'>
        <label className='religion'>religion;</label>
        <select className='ereligion' name="religion" onChange={handleChange} >
          <option value="hindhu">hindhu</option>
          <option value="christian">christian</option>
          <option value="muslim">muslim</option>
        </select>
        <p className='par4'>{validationErrors.religion}</p>
      </div>
      <input name='agree' type="checkbox" value="agree" onChange={handleChange} />I have read and agree the terms and conditions<br/>
      <p className='par5'>{validationErrors.agree}</p>
      <button className='submit' type='submit'>submit</button>  
      </form>  
</div>

      );
}
export default Myform;

            
  
