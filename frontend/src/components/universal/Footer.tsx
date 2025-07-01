export default function Footer() {
  return (
    <footer className="h-[100px] bg-[#516675] flex flex-col justify-center items-start sm:flex-row sm:justify-around sm:items-center text-center gap-6">
      <div className="flex flex-col sm:gap-4 gap-2">
        <p className="text-white text-xs">
          Story Deck and its logos are trademarks of Dragonsteel Books in the
          United States and other countries. © 2024-2025 Dragonsteel Books. All
          Rights Reserved.
        </p>
        <p className="text-white text-xs">© 2025 Johnson Solutions LLC</p>
      </div>

      {/* <div className="flex flex-col sm:gap-4 gap-2">
        <h3 className="text-white text-2xl">CONTACT</h3>
        <Link className="text-primary" to="mailto:ebj800@gmail.com">
          ebj800@gmail.com
        </Link>
      </div> */}
    </footer>
  );
}
