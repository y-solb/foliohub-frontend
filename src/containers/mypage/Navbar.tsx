function Navbar() {
  return (
    <nav className="relative flex px-8 py-8">
      <ul className="flex w-full border-solid border-b border-gray-200">
        <li className="relative font-semibold px-2 py-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:rounded-lg after:bg-black">
          좋아요
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
