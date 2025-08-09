import { Avatar } from '../../ui/Avatar';
type PeopleProps = {
  name: string;
  photoURL: string | null;
  itsYou: boolean;
  onClick: () => void;
};

export const People = ({ name, photoURL, itsYou, onClick }: PeopleProps) => {
  return (
    <li
      onClick={onClick}
      className={`p-[12px] w-full h-[73px] border-b border-b-gray-200 hover flex items-center cursor-pointer ${
        itsYou ? 'hidden' : ''
      }`}
    >
      <div className="mr-2">
        <Avatar name={name} photoURL={photoURL} />
      </div>
      <div className="flex flex-col">
        <span className={`font-medium text-base ${itsYou ? 'text-green-500' : ''}`}>{name}</span>
      </div>
    </li>
  );
};
