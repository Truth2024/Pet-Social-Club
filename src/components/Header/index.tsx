import { Nav } from '../Nav';

export const Header = () => {
  return (
    <header className="header z-50 p-4 flex flex-col items-end border-r border-gray-300">
      <div className="h-full">
        <Nav />
      </div>
      <span className="text-2xl font-bold text-[#40C0E7]">Social-Club v0.1.0</span>
    </header>
  );
};
