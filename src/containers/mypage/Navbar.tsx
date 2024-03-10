function Navbar() {
  return (
    <nav className="relative flex lg:px-20 px-10 py-8">
      <ul className="flex w-full border-b border-solid border-gray-200">
        <li className="relative font-semibold px-2 py-4 after:content-[''] after:absolute after:left-0 after:-bottom-[1px] after:w-full after:h-[3px] after:rounded-lg after:bg-black">
          좋아요
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
