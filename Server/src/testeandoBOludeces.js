const token = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1hcmlhbm9saW1hQGdtYWlsLmNvbSIsImlhdCI6MTczNjk1NzkzMSwiZXhwIjoxNzM2OTU4MjMxfQ.n-Nt7a8yRwPDGjIw8YMb6j7CLekDrDR_pk80MxrapjY";

const codedPayload = token.split('.')[1];

const payload = atob(codedPayload);

console.log(payload);