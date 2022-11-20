

const Footer = () => {
    const footerTitles = [
        ` Grittygrammer`,
        'About Us',
        'API Status',
        'Blog',
        'Copyright',
        'Contact Us',
        'Careers and Culture',
        'FAQ',
        'Newsletter',
        'Legal',
        'Terms of Use'
    ]
  return (
      <footer className="bg-[#5D387F] text-white py-10">
          <ul className=" w-[90%] mx-auto flex sm:flex-col text-center opacity-90 flex-row gap-5 
          md:justify-between">
              {footerTitles.map((link) => {
                  return <li key={link}><a href="/home"> { link}</a></li>
              })}
          </ul>
    </footer>
  )
}

export default Footer;