export const validateName = (
  name: string,
  setErr: React.Dispatch<
    React.SetStateAction<{
      name?: string;
      email?: string;
      password?: string;
    }>
  >,
) => {
  const regex = /^[a-zA-Z]+$/;
  if (name?.trim()?.length === 0) {
    setErr({ name: "Please enter name" });
    return false;
  }
  if (name?.length > 0 && !regex.test(name)) {
    setErr({ name: "Please enter valid name" });
    return false;
  }
    return true;
  
};

export const validateEmail = (
  email: string,
  setErr: React.Dispatch<
    React.SetStateAction<{
      name?: string;
      email?: string;
      password?: string;
    }>
  >,
) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (email.length === 0) {
    setErr({ email: "Please enter email" });
    return false;
  }
  if (email?.length > 0 && !emailRegex.test(email)) {
    setErr({ email: "Please enter valid email" });
    return false;
  } 
   
    return true;
  
};

export const validatePassword = (
  password: string,
  setErr: React.Dispatch<
    React.SetStateAction<{
      name?: string;
      email?: string;
      password?: string;
    }>
  >,
) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  if (password.length === 0) {
    setErr({
      password: "Please enter the password",
    });
    return false;
  }
  if (password.length < 8) {
    setErr({
      password: "Password should be greater than 8 characters",
    });
    return false;
  }
  if (password.length > 14) {
    setErr({
      password: "Password should be less than 14 characters",
    });
    return false;
  }
  if (password.length > 0 && !passwordRegex.test(password)) {
    setErr({
      password:
        "Password must contain at least 1 capital letter, 1 small letter, 1 number, and 1 special character",
    });
    return false;
  }

  return true;
};
