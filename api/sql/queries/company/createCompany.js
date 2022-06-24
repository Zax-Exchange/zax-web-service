
const query = `insert into Companies(name, email, phone, fax, creditCardNumber, creditCardExp, creditCardCvv, country, planType, isActive, isVendor, isVerified, isComplete, productTypes, leadTime, companyUrl, linkedinUrl)
values('Google', 'google@google.com', '123-456-7890', '123-456-7890', '0123456789011234', '07/25', '123', 'USA', 'basic', true, true, true, true, 'rigid box', 6, 'www.google.com', 'https://www.linkedin.com/company/google/mycompany/verification/');`

export default query;