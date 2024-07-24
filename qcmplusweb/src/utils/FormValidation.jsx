
export const initialUserState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleIds: '',
    gender: '',
    company: '',
    jobTitle: '',
    phoneNumber: '',
    createdDate: '',
};

export const labels = {
    title: 'Register New User',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email Address',
    gender: 'Gender',
    password: 'Password',
    role: 'Role',
    phoneNumber: 'Phone Number',
    jobTitle: 'Job Title',
    company: 'Company',
    createdDate: 'Created Date',
    addBtn: 'Add User'
};

export const validateForm = (formData) => {
    const phonePattern = /^(?:\+?[1-9]\d{1,14}|0[1-9]\d{8})$/;
    const newErrors = {};
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phoneNumber || !phonePattern.test(formData.phoneNumber)) newErrors.phoneNumber = 'Valid phone number is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
    if (!formData.company) newErrors.company = 'Company is required';

    return newErrors;
};
