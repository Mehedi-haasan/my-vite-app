import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputComponent from '../Input/InputComponent';
import BaseUrl from '../Constant';
import SelectionComponent from '../Input/SelectionComponent';

const Registration = () => {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    stateId: null,
    rules: ["admin"]
  });
  const [state, setState] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const goToHome = useNavigate();

  // Validate the form before submitting
  const validateForm = () => {
    const { first_name, last_name, username, email, password, stateId } = values;
    if (!first_name || !last_name || !username || !email || !password || !stateId) {
      setErrorMessage('All fields are required');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form
    if (!validateForm()) return;

    try {
      const response = await fetch(`${BaseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      const result = await response.json();
      
      // Check if the registration was successful
      if (response.ok) {
        alert(result.message);
        goToHome('/login'); // Redirect to login page after successful registration
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchState = async () => {
      const response = await fetch(`${BaseUrl}/api/get/state`);
      const data = await response.json();
      if (data && data?.items?.length > 0) {
        setState(data?.items || []);
      }
    };

    fetchState();
  }, []);

  return (
    <div className='flex justify-center items-center'>
      <div className='w-full md:w-[450px] py-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-2xl border px-7'>
        <form className="max-w-md">
          <InputComponent onChange={(value) => { setValues({ ...values, first_name: value }) }} label={"First Name"} type={"text"} placeholder={"First Name"} />
          <InputComponent onChange={(value) => { setValues({ ...values, last_name: value }) }} label={"Last Name"} type={"text"} placeholder={"Last Name"} />
          <InputComponent onChange={(value) => { setValues({ ...values, username: value }) }} label={"Mobile"} type={"number"} placeholder={"Enter your mobile"} />
          <InputComponent onChange={(value) => { setValues({ ...values, email: value }) }} label={"Email"} type={"email"} placeholder={"Enter your email"} />
          <SelectionComponent options={state} onSelect={(v) => { setValues({ ...values, stateId: v?.id }) }} label={`Select State`} className='font-semibold' />
          <InputComponent onChange={(value) => { setValues({ ...values, password: value }) }} label={"Password"} type={"password"} placeholder={"Enter your password"} />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button onClick={handleSubmit}
            className="text-white bg-blue-700 my-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
