
type FooterItem = {
  name: string;
  href: string;
};

const content: Record<string, FooterItem[]> = {
  Company: [
    { name: "About us", href: "https://www.facebook.com/anhngunewzealand" },
    { name: "Career", href: "https://www.facebook.com/anhngunewzealand" },
    { name: "Blog", href: "https://www.nzec.edu.vn/#/blog/" },
    { name: "Partnerships", href: "https://www.facebook.com/anhngunewzealand" },
  ],
  Community: [
    { name: "Team plans", href: "#" },
    { name: "Share", href: "https://www.nzec.edu.vn/" },
  ],
  Teaching: [
    { name: "Become a Sponsor", href: "https://www.facebook.com/anhngunewzealand" },
    { name: "User Help Center", href: "https://www.facebook.com/anhngunewzealand" },
    { name: "Rules & Requirements", href: "https://www.facebook.com/anhngunewzealand" },
  ],
  Test: [
    { name: "Help Center", href: "" },
    { name: "Clothes Service", href: "https://www.nzec.edu.vn/#/blog/" },
    { name: "Exercise", href: "https://www.nzec.edu.vn/#/workspace/dashboard/" },
    { name: "Material", href: "https://www.nzec.edu.vn/#/workspace/resources/" },
    { name: "Workshops", href: "https://www.nzec.edu.vn/" },
  ],
};

const keys = ["Company", "Community", "Teaching", "Test"];

const footerContent: FooterItem[] = [
  { name: "Help", href: "https://www.facebook.com/anhngunewzealand" },
  { name: "Privacy", href: "https://www.facebook.com/anhngunewzealand" },
  { name: "Terms", href: "https://www.facebook.com/anhngunewzealand" },
  { name: "Your Privacy", href: "https://www.facebook.com/anhngunewzealand" },
];

export default function Footer() {
  return (
    <section className="bg-gray-900 h-[70vh] pb-20 z-40">
      <div className="w-full h-4 shadow-2xl bg-gray-900" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 px-14">
        {keys.map((key) => (
          <div className="flex flex-col py-5 mx-3" key={key}>
            <h3 className="text-white font-light text-lg mb-3">{key}</h3>
            {content[key].map((item) => (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                key={item.name}
                className="no-underline text-white text-sm font-semibold mb-1"
              >
                {item.name}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="w-full h-0.5 bg-green-900 mt-8" />

      <div className="flex flex-wrap items-center mt-4 px-10 text-gray-400 text-sm">
        <p className="mr-6">@ DeutschTrung, Inc, 2025</p>
        {footerContent.map((item) => (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            key={item.name}
            className="no-underline mx-3 text-white text-sm font-semibold"
          >
            {item.name}
          </a>
        ))}
      </div>
    </section>
  );
}
