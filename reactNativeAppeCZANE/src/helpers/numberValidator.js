export function numberValidator(number) {
    const re = /^\d{11}$/; // Sadece 11 haneli sayıları kabul eder
    if (!number) return "Telefon numarası boş bırakılamaz!";
    if (!re.test(number)) return 'Geçersiz telefon numarası!';
    return '';
  }
  