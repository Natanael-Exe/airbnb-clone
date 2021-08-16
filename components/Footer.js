function Footer() {
  return (
    <div className="max-w-7xl mx-auto px-8 sm:px-16 ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 py-12 justify-center md:mt-10 mt-6">
        <div className="space-y-4 text-sm  text-gray-800  md:mx-0.5 border-b md:border-none pb-6 md:pb-0">
          <h5 className="font-bold text-xs">ABOUT</h5>
          <p className="hover:underline">How Airbnb</p>
          <p className="hover:underline cursor-pointer">Newsroms</p>
          <p className="hover:underline cursor-pointer">Investors</p>
          <p className="hover:underline cursor-pointer">Airbnb Pus</p>
          <p className="hover:underline cursor-pointer">Airbnb Luxe</p>
        </div>
        <div className="space-y-4 text-sm  text-gray-800  md:mx-0.5 border-b md:border-none pb-6 md:pb-0">
          <h5 className="font-bold text-xs">COMMUNITY</h5>
          <p className="hover:underline cursor-pointer">Diversity & Belonging</p>
          <p className="hover:underline cursor-pointer">Against Discrimination</p>
          <p className="hover:underline cursor-pointer">Accessibility</p>
          <p className="hover:underline cursor-pointer">Airbnb Associates</p>
          <p className="hover:underline cursor-pointer">Frontline Stays</p>
        </div>
        <div className="space-y-4 text-sm  text-gray-800  md:mx-0.5">
          <h5 className="font-bold text-xs">SUPPORT</h5>
          <p className="hover:underline cursor-pointer">Host your home</p>
          <p className="hover:underline cursor-pointer">Host an Online Experience</p>
          <p className="hover:underline cursor-pointer">Host an Experience</p>
          <p className="hover:underline cursor-pointer">Responsible hosting</p>
          <p className="hover:underline cursor-pointer">Resource Center</p>
          <p className="hover:underline cursor-pointer">Community Center</p>
        </div>
        <div className="space-y-4 text-sm  text-gray-800  md:mx-0.5">
          <h5 className="font-bold text-xs">HOST</h5>
          <p className="hover:underline cursor-pointer">Our COVID-19 Response</p>
          <p className="hover:underline cursor-pointer">Help Center</p>
          <p className="hover:underline cursor-pointer">Cancellation options</p>
          <p className="hover:underline cursor-pointer">Neighborhood Support</p>
          <p className="hover:underline cursor-pointer">Trust & Safety</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
