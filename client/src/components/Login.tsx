import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import '../styles/Login.css';

type Props = {
  setIsLoggedIn: () => void;
};

export default function Login({ setIsLoggedIn }: Props) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formFields, setFields] = useState({
    name: '',
    email: '',
    password: '',
  });

  const submit = async (type = 'login') => {
    const res = await fetch(`http://localhost:8000/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formFields),
    });
    const data = await res.json();

    if (data.success) {
      setIsLoggedIn();
    } else {
      alert(data.error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFields({ ...formFields, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFields({ name: '', email: '', password: '' });
  }, [isSignUp]);

  return (
    <Fragment>
      {isSignUp ? (
        <div className='form-container'>
          <h1>Signup</h1>
          <form>
            <label>Name</label>
            <input
              type='text'
              value={formFields.name}
              onChange={handleChange}
              name='name'
              required
            />
            <label>Email</label>
            <input
              type='email'
              value={formFields.email}
              onChange={handleChange}
              name='email'
              required
            />
            <label>Password</label>
            <input
              type='password'
              value={formFields.password}
              onChange={handleChange}
              name='password'
              required
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                submit('signup');
              }}
            >
              Signup
            </button>
          </form>
          <p>
            Already have an account?{' '}
            <a href='#' onClick={() => setIsSignUp(false)}>
              Login
            </a>
          </p>
        </div>
      ) : (
        <div className='form-container'>
          <h1>Login</h1>
          <form>
            <label>Email</label>
            <input
              type='email'
              value={formFields.email}
              onChange={handleChange}
              name='email'
              required
            />
            <label>Password</label>
            <input
              type='password'
              value={formFields.password}
              onChange={handleChange}
              name='password'
              required
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              Login
            </button>
          </form>
          <p>
            No account?{' '}
            <a href='#' onClick={() => setIsSignUp(true)}>
              Sign Up
            </a>
          </p>
        </div>
      )}
    </Fragment>
  );
}
