export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "E-mail boş bırakılamaz!"
  if (!re.test(email)) return 'Geçersiz e-mail adresi!'
  return ''
}
