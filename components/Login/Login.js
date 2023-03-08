import React, { useState, useEffect, useReducer, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return { value: '', isValid: false};

};

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6};
  }
  if(action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return { value: '', isValid: false};

};

const collegeReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6};
  }
  if(action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return { value: '', isValid: false};

};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege, setEnteredCollege] = useState('');
  // const [collegeIsValid, setCollegeIsValid] = useState();
   const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer,
     {value: '', isValid: null}
     );

  const [passwordState, dispatchPassword] = useReducer(passwordReducer,
    {value: '', isValid: null}
    );

  const [collegeState, dispatchCollege] = useReducer(collegeReducer,
    {value: '', isValid: null}
    );

    
    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passwordState;
    const {isValid: collegeIsValid} = collegeState;

  useEffect(() => {
    console.log('Effect Running');

    return () => {
      console.log('Effect Cleanup');
    }
  }, [])

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking form validity!');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500)

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  // useEffect(() => {
    
  // }, [enteredEmail, enteredPassword, enteredCollege]);


  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid && collegeState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid && collegeState.isValid
    );
  };
  const collegeChangeHandler = (event) => {
    dispatchCollege({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      event.target.value.trim().length > 6 && passwordState.isValid && emailState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const validateCollegeHandler = () => {
    dispatchCollege({type: 'INPUT_BLUR'});
  };

  const authCtx = useContext(AuthContext);
  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogIn(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
         id="email" 
         label="E-Mail" 
         type="email" 
         isValid={emailIsValid} 
         value={emailState.value} 
         onChange={emailChangeHandler}
         onBlur={validateEmailHandler}
         />
        <Input 
         id="password" 
         label="password" 
         type="password" 
         isValid={passwordIsValid} 
         value={passwordState.value} 
         onChange={passwordChangeHandler}
         onBlur={validatePasswordHandler}
         />
        <Input 
         id="college" 
         label="college" 
         type="college" 
         isValid={collegeIsValid} 
         value={collegeState.value} 
         onChange={collegeChangeHandler}
         onBlur={validateCollegeHandler}
         />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
