export type Contact = {
  label: string;
  value: string;
  href: string;
  ruOnly?: boolean;
  placeholder?: boolean;
};

export const contacts: Contact[] = [
  { label: "Telegram", value: "@alexchea318", href: "https://t.me/alexchea318" },
  { label: "Email", value: "alexchea319@gmail.com", href: "mailto:alexchea319@gmail.com" },
  { label: "GitHub", value: "alexchea318", href: "https://github.com/alexchea318" },
  { label: "LinkedIn", value: "Скоро / Soon", href: "#", placeholder: true },
  { label: "VK", value: "@schechenev", href: "https://vk.me/schechenev", ruOnly: true },
];
