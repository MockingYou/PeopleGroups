import React, { ReactNode } from "react";

interface ButtonProps {
	text: string;
	handleClick: () => void;
	disabled: boolean;
	icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	text,
	handleClick,
	disabled = false,
	icon,
}) => {
	return (
		<button
			onClick={handleClick}
			disabled={disabled}
			className={`inline-flex items-center justify-center w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg ${
				disabled ? "opacity-50 cursor-not-allowed" : ""
			}`}
		>
			{icon && <span className="">{icon}</span>}
			<span>{text}</span>
		</button>
	);
};

export default Button;
