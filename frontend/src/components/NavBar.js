function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a href='/' className="font-semibold text-xl tracking-tight">PDF To GPT</a>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
        <a href="/qa" className="inline-block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Q&A
        </a>
        {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
}


export default Navbar;
