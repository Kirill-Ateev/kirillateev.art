import { redirect } from 'next/navigation';

export default function RedirectToLocale() {
  return redirect('/en');
}
