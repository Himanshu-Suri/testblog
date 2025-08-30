export default function Navbar() {
  return (
    <nav className="bg-black shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <a href="#" className="text-white font-bold text-xl">
            Home
          </a>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-200 hover:text-blue-500">About</a>
            <a href="#" className="text-gray-200 hover:text-blue-500">Services</a>
            <a href="#" className="text-gray-200 hover:text-blue-500">Contact</a>
          </div>

        </div>
      </div>
    </nav>
  );
}
