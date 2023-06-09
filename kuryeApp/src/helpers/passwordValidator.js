export function passwordValidator(password) {
  if (!password) return "Parola boş bırakılamaz!"
  if (password.length < 5) return 'Parola en az 5 karakter uzunluğunda olmalıdır!'
  return ''
}
