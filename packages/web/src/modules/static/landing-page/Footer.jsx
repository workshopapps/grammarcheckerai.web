import { Link } from 'react-router-dom';

const Footer = () => {
  const footerTitles = [
    { name: `home`, to: '/home' },
    { name: `About`, to: '/about' },
    { name: `API Status`, to: '/app-status' },
    { name: `Blog`, to: '/blog' },
    { name: `Copyright`, to: '/copyright' },
    { name: `Contact Us`, to: '/contact' },
    { name: `Careers and Culture`, to: '/culture' },
    { name: `FAQ`, to: '/faq' },
    { name: `NewsLetter`, to: '/newsletter' },
    { name: `Legal`, to: '/legal' },
    { name: `Terms of Use`, to: '/terms-of-use' },
  ];
  return (
    <footer className="bg-[#5D387F] text-white py-10">
      <ul
        className=" w-[90%] mx-auto flex flex-col text-center opacity-90 sm:flex-row gap-5 
          md:justify-between"
      >
        {footerTitles.map((link) => {
          return (
            <li key={link.name}>
              <Link to={link.to}> {link.name}</Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;
