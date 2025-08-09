interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string;
}

export const Input = ({ className, ...rest }: InputProps) => {
  return (
    <>
      <div className={`w-[340px] h-[40px] border border-gray-300 rounded-[8px] flex items-center p-[8px] ${className}`}>
        <input {...rest} className="outline-none w-[100%]" />
      </div>
    </>
  );
};
