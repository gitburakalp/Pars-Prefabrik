export function getAspectRatio(h, w) {
  var mode = null;
  if (h > w) {
    dividend = h;
    divisor = w;
    mode = 'portrait';
  }

  if (w > h) {
    dividend = w;
    divisor = h;
    mode = 'landscape';
  }

  var gcd = -1;
  while (gcd == -1) {
    remainder = dividend % divisor;
    if (remainder == 0) {
      gcd = divisor;
    } else {
      dividend = divisor;
      divisor = remainder;
    }
  }

  var hr = w / gcd;
  var vr = h / gcd;
  aspectRatio = hr / vr;
  return aspectRatio;
}
