import React from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

interface ToggleIconProps {
	show: boolean;
	onClick: () => void;
}

const ToggleIcon: React.FC<ToggleIconProps> = ({ show, onClick }) => {
	return (
		<div onClick={onClick}>
			{" "}
			{show ? (
				<ChevronDownIcon className="h-6 w-6" />
			) : (
				<ChevronRightIcon className="h-6 w-6" />
			)}
		</div>
	);
};

export default ToggleIcon;
