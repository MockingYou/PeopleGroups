import React, { useState } from "react";
import { UsersIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import GroupModal from "./GroupModal";
import PersonModal from "./PersonModal";
const Header: React.FC = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showPersonModal, setPersonModal] = useState(false);
	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const handleAddGroup = () => {
		setShowModal(true);
	};

	const handleAddPerson = () => {
		setPersonModal(true);
	};

	const handleLogout = () => {
		console.log("Logging out");
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setPersonModal(false);
	};

	return (
		<div className="bg-blue-50">
			<header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-blue-50">
				<div className="flex items-center justify-between h-16">
					<UsersIcon className="h-10 cursor-pointer text-blue-600" />

					<div className="relative">
						<button
							className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow"
							onClick={toggleDropdown}
						>
							Menu
							<ChevronDownIcon className="h-6 w-6 ml-1 text-white" />
						</button>

						{dropdownOpen && (
							<div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded border border-gray-200">
								<button
									onClick={handleAddGroup}
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 w-full text-left"
								>
									Add New Group
								</button>
								<button
									onClick={handleAddPerson}
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 w-full text-left"
								>
									Add New Person
								</button>
								<button
									onClick={handleLogout}
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 w-full text-left"
								>
									Logout
								</button>
							</div>
						)}
					</div>
				</div>
			</header>
			{showModal && (
				<GroupModal
					handleClose={handleCloseModal}
					fetchGroupData={() => {
						window.location.reload();
					}}
					useValues={false}
				/>
			)}

			{showPersonModal && (
				<PersonModal
					handleClose={handleCloseModal}
					fetchGroupData={() => {
						window.location.reload();
					}}
					useValues={false}
				/>
			)}
		</div>
	);
};

export default Header;
