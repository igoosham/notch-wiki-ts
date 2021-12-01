function validateName(value:string) : boolean {
  const validator = /^[0-9A-Za-z\-\_]+$/;
  return validator.test(value);
}

function validateLang(value: string) : boolean {
  const validator = /^[a-z]{2}$/;
  return validator.test(value);
}

export { validateLang, validateName };