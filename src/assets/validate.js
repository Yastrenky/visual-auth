const validateWebsite = (website) => {
  const re = /^(http[s]?:\/\/){0,1}(www.){0,1}[a-zA-Z0-9.-]+.[a-zA-Z]{2,5}[.]{0,1}/;
  return re.test(website);
}

const validateName = (name) => {
  const re = /^[a-zA-Z ]{2,30}$/;
  return re.test(name);
};

const validatePassword = (password) => {
  const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  return re.test(password);
};

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validateAccessCode = (accessCode) => {
  const re = /[A-Z,0-9]{8}/;
  return re.test(accessCode);
};

const validatePhone = (phone) => {
  const re = /^\d{10}/;
  return re.test(phone);
};

const validateTab = (arr, id) => {
  for(var i=0; i< arr.length; i++){
    if(arr[i].id === id){
      // console.log('found the tab ',arr[i]);
      return true;
    }
    if(arr[i].items){
      // console.log('checking items ',arr[i]);
      if(validateTab(arr[i].items, id))return true;
    }
  }
  return false;
};

const validateExpiraionDate = (exp) => {
  let date = new Date();
  let currentMonth = date.getMonth() + 1;
  let currentYear = date.getYear() - 100;
  let expirationMonth = Number(exp.toString().substring(0,2));
  let expirationYear = Number(exp.toString().substring(2,4));

  // console.log(currentMonth, expirationMonth);
  // console.log(expirationYear, currentYear);

  return (expirationYear >= currentYear) || ((expirationYear === currentYear) && (expirationMonth >= currentMonth));
};

const validate = {
  website: validateWebsite,
  name: validateName,
  email: validateEmail,
  password: validatePassword,
  code: validateAccessCode,
  phone: validatePhone,
  tab: validateTab,
  expiraionDate: validateExpiraionDate
}

export default validate;
