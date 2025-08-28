export const validateEmail = (email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePhone = (phone) => {
    if (!phone) return false;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };
  
  export const validateDOB = (dob) => {
    if (!dob) return false;
    
    let date;
    if (typeof dob === 'string') {
      date = new Date(dob);
    } else if (dob instanceof Date) {
      date = dob;
    } else {
      return false;
    }
    
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    
    return age >= 18;
  };
  
  export const validateDocumentId = (id) => {
    if (!id) return false;
    const idRegex = /^[a-zA-Z0-9]{6,}$/;
    return idRegex.test(id);
  };
  
  export const validateRequired = (value) => {
    return value !== undefined && value !== null && value.toString().trim() !== '';
  };
  
  export const validateMinLength = (value, minLength) => {
    return value && value.toString().length >= minLength;
  };