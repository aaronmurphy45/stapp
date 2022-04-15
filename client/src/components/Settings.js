import React from 'react'
import { Button,Input, Upload } from 'antd'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase-config';
import { useState } from 'react';
import { updatePassword, getAuth, updateEmail, updateProfile, updatePhoneNumber } from 'firebase/auth';

export default function Settings() {

  const [user, loading] = useAuthState(auth);
  const userX = user.auth.currentUser;
 
  const [currentP, setCurrentP] = useState('');
  const [newP, setNewP] = useState('');
  const [newP2, setNewP2] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhoto, setNewPhoto] = useState('');



  const [newProfileImage, setNewProfileImage] = useState('');



  const changeStyle = {
    margin: '10px',
    padding: '10px',
    border : "1px solid rgb(0,0,0,0.5)",
    borderRadius: '5px',
    boxShadow: '0px 0px 5px #000000',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',

  }
  const z = getAuth()
 
  const changePassword = () => {
    // check if all fields are filled
    if( newP === '' || newP2 === ''){
      alert('Please fill in all fields');
      return;
    }
    // check if new passwords match
    if(newP !== newP2){
      alert('New passwords do not match');
      return;
    }
    // check if current password is correct
    /*
    if(currentP !== user.password){
      alert('Current password is incorrect');
      return;
    }*/
    // change password
 
    updatePassword(userX, newP).then(() => {
      // Update successful.
      alert('Password changed successfully');
    }).catch((error) => {
      // An error ocurred
      // ...
      alert('Error changing password ' + error);
    });
   

  }

  const changeProfileImage = () => {
    // check if all fields are filled
    if( newProfileImage === ''){
      alert('Please fill in all fields');
      return;
    }
    
    // chnage profileImafe
    updateProfile(userX, {
      photoURL: newProfileImage
    }).then(() => {
      // Update successful.
      alert('Profile image changed successfully');
    }
    ).catch((error) => {
      // An error ocurred
      // ...
      alert('Error changing profile image ' + error);
    }
    );

  }
    
  const changeEmail = () => {
    // check if all fields are filled
    if( newEmail === ''){
      alert('Please fill in all fields');
      return;
    }

    // change email
    updateEmail(userX,newEmail).then(() => {
      // Update successful.
      alert('Email changed successfully');
    }).catch((error) => {
      // An error ocurred
      // ...
      alert('Error changing email ' + error);
    });
  }
  const changePhone = () => {
    // check if all fields are filled
    if( newPhone === ''){
      alert('Please fill in all fields');
      return;
    }
    updatePhoneNumber(userX,newPhone).then(() => {
      // Update successful.
      alert('Phone number changed successfully');
    }).catch((error) => {
      // An error ocurred
      // ...
      alert('Error changing phone number ' + error);
    });

  }

  const changeDisplayName = () => {
    // check if all fields are filled
    if( newName === ''){
      alert('Please fill in all fields');
      return;
    }
    updateProfile(userX,{
      displayName: newName
    }).then(() => {
      // Update successful.
      alert('Display name changed successfully');
    }).catch((error) => {
      // An error ocurred
      // ...
      alert('Error changing display name ' + error);
    });
  }
 

  const changeCurrentPassword = (e) => {
    setCurrentP(e.target.value);
  }
  const changeNewPassword = (e) => {
    setNewP(e.target.value);
  }
  const changeNewPassword2 = (e) => {
   
    setNewP2(e.target.value);
  }
  const changeNewEmail = (e) => {
    setNewEmail(e.target.value);
  }
  const changeNewPhone = (e) => {
    setNewPhone(e.target.value);
  }
  const changeNewName = (e) => {
    setNewName(e.target.value);
  }
  const changeNewProfileImage = (e) => {

    setNewProfileImage(e);
  }
  
  return (
    <div>
      {/* Change Password */}
      <div style = {changeStyle}>
        <h3>Change Password</h3>
        <div>
          {/* Current Password 
          <Input onChange= {(e)=>changeCurrentPassword(e)}placeholder='Current Password'></Input>
          */}
          <Input onChange={(e)=>changeNewPassword(e)} placeholder='New Password'></Input>
          <Input onChange={(e)=>changeNewPassword2(e)} placeholder='Confirm New Password'></Input>

          <Button onClick={changePassword}>Change Password</Button>

          </div>
    </div>
    <div style = {changeStyle}>
      {/* Change Email */}
      <h3>Change Email</h3>
      <div>
        <Input onChange={(e)=>changeNewEmail(e)} placeholder='New Email'></Input>
        <Button onClick={changeEmail}>Change Email</Button>
    </div>
    </div>

    <div style = {changeStyle}>
      {/* Change Phone Number */}
      <h3>Change Phone Number</h3>
      <div>
        <Input onChange={(e)=>changeNewPhone(e)} placeholder='New Phone Number'></Input>
        <Button onClick={changePhone}>Change Phone Number</Button>
        </div>
        
    </div>

    <div style = {changeStyle}>
      {/* Change Display Name */}
      <h3>Change Display Name</h3>
      <div>
        <Input onChange={(e)=>changeNewName(e)} placeholder='New Display Name'></Input>
        <Button onClick={changeDisplayName}>Change Display Name</Button>
        </div>
      </div>

      <div style = {changeStyle}>
        {/* Change Profile Image */}
        <h3>Change Profile Image</h3>
        <div>
        <Upload 
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            //beforeUpload={beforeUpload}
           onChange={(e)=>changeNewProfileImage(e)} 
          >
            {newProfileImage ? <img src={newPhoto} alt="avatar" style={{ width: '100%' }} /> : "Upload"}
          </Upload>
          <Button onClick={changeProfileImage}>Change Profile Image</Button>

          </div>
          </div>
        
    </div>






    // Change Passw
    
    // Change Currency
    

  )
}
