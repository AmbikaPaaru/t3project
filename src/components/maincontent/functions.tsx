export const validateName = (
  name: string,
  setErr: React.Dispatch<React.SetStateAction<{ name?: string; email?: string; password?: string }>>,
) => {
  const regex = /^[a-zA-Z]+$/;
  if (!name) {
    setErr(prevState => ({
      ...prevState,
      name: "Please enter name",
    }));
    return false;
  }
  if (!regex.test(name)) {
    setErr(prevState => ({
      ...prevState,
      name: "Please enter valid name",
    }));
    return false;
  }
  setErr(prevState => ({
    ...prevState,
    name: undefined, 
  }));
  return true;
};

export const validateEmail = (
  email: string,
  setErr: React.Dispatch<React.SetStateAction<{ name?: string; email?: string; password?: string }>>,
) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!email) {
    setErr(prevState => ({
      ...prevState,
      email: "Please enter email",
    }));
    return false;
  }
  if (!emailRegex.test(email)) {
    setErr(prevState => ({
      ...prevState,
      email: "Please enter valid email",
    }));
    return false;
  }
  setErr(prevState => ({
    ...prevState,
    email: undefined, 
  }));
  return true;
};

export const validatePassword = (
  password: string,
  setErr: React.Dispatch<React.SetStateAction<{ name?: string; email?: string; password?: string }>>,
) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  if (!password) {
    setErr(prevState => ({
      ...prevState,
      password: "Please enter the password",
    }));
    return false;
  }
  if (password.length < 8) {
    setErr(prevState => ({
      ...prevState,
      password: "Password should be greater than 8 characters",
    }));
    return false;
  }
  if (password.length > 14) {
    setErr(prevState => ({
      ...prevState,
      password: "Password should be less than 14 characters",
    }));
    return false;
  }
  if (!passwordRegex.test(password)) {
    setErr(prevState => ({
      ...prevState,
      password:
        "Password must contain at least 1 capital letter, 1 small letter, 1 number, and 1 special character",
    }));
    return false;
  }
  setErr(prevState => ({
    ...prevState,
    password: undefined, 
  }));
  return true;
};
