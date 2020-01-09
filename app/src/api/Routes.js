const serverTest = 'https://d1yalzslbd.execute-api.us-east-1.amazonaws.com';
export const testsUrl = id =>
    id ? `${serverTest}/prod/tests/${id}` : `${serverTest}/prod/tests`;
