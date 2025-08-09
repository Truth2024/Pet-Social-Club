interface Avatar {
  name: string | null;
  photoURL: string | null;
  size?: string;
}

export const Avatar = ({ name, photoURL, size }: Avatar) => {
  return (
    <>
      {photoURL ? (
        <img width={40} height={40} className="rounded-full object-cover" src={photoURL} alt="User avatar" />
      ) : (
        <div
          className={`rounded-[20px] flex justify-center items-center bg-gray-400 ${size ? size : 'w-[40px] h-[40px]'}`}
        >
          <span className="text-bold text-xl">{name?.charAt(0).toLocaleUpperCase()}</span>
        </div>
      )}
    </>
  );
};
