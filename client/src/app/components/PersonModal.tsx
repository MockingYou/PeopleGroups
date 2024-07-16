/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface PersonModalProps {
	handleClose: () => void;
	fetchGroupData: () => void;
	useValues: boolean;
	data?: any;
	groupId?: number;
}

const PersonModal: React.FC<PersonModalProps> = ({
	handleClose,
	fetchGroupData,
	useValues = false,
	data,
	groupId,
}) => {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		job_title: "",
		group_id: groupId || "",
	});

	useEffect(() => {
		if (data && useValues) {
			setFormData(data);
		}
	}, [data, useValues, groupId]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const url = useValues
			? `http://localhost:3000/persons/${data.id}`
			: `http://localhost:3000/persons`;
		const method = useValues ? "PATCH" : "POST";

		fetch(url, {
			method: method,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status === "success") {
					fetchGroupData();
					handleClose();
				} else {
					console.log("Error Adding Data");
				}
				fetchGroupData();
				handleClose();
			})
			.catch((error) => console.error("Error:", error));
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="fixed inset-0 bg-gray-800 opacity-50"></div>
			<div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-lg shadow-xl">
				<div className="text-left">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-bold">
							{useValues ? "Edit Person" : "Add Person"}
						</h3>
						<XMarkIcon
							className="text-gray-500 hover:text-gray-700 focus:outline-none w-8 h-8 cursor-pointer"
							onClick={handleClose}
						/>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label
								htmlFor="first_name"
								className="block mb-1 text-sm font-medium text-gray-700"
							>
								First Name
							</label>
							<input
								id="first_name"
								name="first_name"
								type="text"
								value={formData.first_name}
								onChange={handleChange}
								placeholder="Enter first name"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="last_name"
								className="block mb-1 text-sm font-medium text-gray-700"
							>
								Last Name
							</label>
							<input
								id="last_name"
								name="last_name"
								type="text"
								value={formData.last_name}
								onChange={handleChange}
								placeholder="Enter last name"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="job_title"
								className="block mb-1 text-sm font-medium text-gray-700"
							>
								Job Title
							</label>
							<input
								id="job_title"
								name="job_title"
								type="text"
								value={formData.job_title}
								onChange={handleChange}
								placeholder="Enter job title"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="group_id"
								className="block mb-1 text-sm font-medium text-gray-700"
							>
								Group ID
							</label>
							<input
								id="group_id"
								name="group_id"
								type="number"
								value={formData.group_id}
								onChange={handleChange}
								placeholder="Enter group ID"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
							/>
						</div>
						<button
							type="submit"
							className="ml-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
						>
							Save
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PersonModal;
