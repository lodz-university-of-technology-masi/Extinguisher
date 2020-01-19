const serverTest = 'https://d1yalzslbd.execute-api.us-east-1.amazonaws.com';
const serverUser = 'https://ng6oznbmy0.execute-api.us-east-1.amazonaws.com';
export const testsUrl = id =>
    id ? `${serverTest}/prod/tests/${id}` : `${serverTest}/prod/tests`;
export const userUrl = id =>
    id ? `${serverUser}/dev/users/${id}` : `${serverUser}/dev/users`;
