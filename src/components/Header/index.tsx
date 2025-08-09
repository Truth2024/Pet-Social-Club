import { Nav } from '../Nav';

export const Header = () => {
  return (
    <header className="header z-50 md:p-0 lg:p-2 2xl:p-4 flex flex-col-reverse md:flex-col items-center md:items-end border-none md:border-r border-gray-300">
      <div className="h-full">
        <Nav />
      </div>
      <div className="w-full text-center 2xl:text-2xl lg:text-lg md:text-lg sm:text-sm font-medium md:font-bold text-[#40C0E7]">
        Social-Club v0.1.0
      </div>
    </header>
  );
};
// flex-direction: row;
// border: none;
// width: 100%;
