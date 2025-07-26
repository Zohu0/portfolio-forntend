export const environment = {
  production: true,

  apiUrlUser: process.env['NG_APP_API_URL_USER'] || 'https://portfolio-backend-production-e1b6.up.railway.app/usercontroller',
  apiUrlEducation: process.env['NG_APP_API_URL_EDUCATION'] || 'https://portfolio-backend-production-e1b6.up.railway.app/educationcontroller',
  apiUrlExperience: process.env['NG_APP_API_URL_EXPERIENCE'] || 'https://portfolio-backend-production-e1b6.up.railway.app/experiencecontroller',
  apiUrlProject: process.env['NG_APP_API_URL_PROJECT'] || 'https://portfolio-backend-production-e1b6.up.railway.app/projectcontroller',
  apiUrlSkill: process.env['NG_APP_API_URL_SKILL'] || 'https://portfolio-backend-production-e1b6.up.railway.app/skillcontroller',
};
