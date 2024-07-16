import React, { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Person, Group } from "./DragableList";

interface HoverPopupProps {
	group: {
		id: number;
		name: string;
		add_date: string;
		update_date: string;
	};
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
	return formattedDate;
};

const HoverPopup: React.FC<HoverPopupProps> = ({ group }) => {
	const [showPopup, setShowPopup] = useState(false);
	const [lastGroupAdd, setLastGroupAdd] = useState<Group | null>(null);
	const [lastGroupUpdate, setLastGroupUpdate] = useState<Group | null>(null);
	const [lastPersonAdded, setLastPersonAdded] = useState<Person | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleMouseEnter = () => {
		setShowPopup(true);
	};

	const handleMouseLeave = () => {
		setShowPopup(false);
	};

	const getLastGroups = async (groupId: number) => {
		setLoading(true);
		setError(null);
		try {
			const [
				lastAddGroupResponse,
				lastUpdateGroupResponse,
				personsResponse,
			] = await Promise.all([
				fetch(
					`http://localhost:3000/groups/last/${groupId}?orderBy=add_date`,
				),
				fetch(
					`http://localhost:3000/groups/last/${groupId}?orderBy=update_date`,
				),
				fetch(`http://localhost:3000/groups/join/${groupId}`),
			]);

			const lastAddGroupData = await lastAddGroupResponse.json();
			const lastUpdateGroupData = await lastUpdateGroupResponse.json();
			const personsData = await personsResponse.json();

			if (
				lastAddGroupResponse.ok &&
				lastAddGroupData.status === "success"
			) {
				setLastGroupAdd(lastAddGroupData.group[0]);
			}
			if (
				lastUpdateGroupResponse.ok &&
				lastUpdateGroupData.status === "success"
			) {
				setLastGroupUpdate(lastUpdateGroupData.group[0]);
			}
			if (personsResponse.ok && personsData.status === "success") {
				const persons = personsData.group;
				persons.sort(
					(a: Person, b: Person) =>
						new Date(b.add_date).getTime() -
						new Date(a.add_date).getTime(),
				);
				setLastPersonAdded(persons[0] || null);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			setError("Failed to fetch data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getLastGroups(group.id);
	}, [group.id]);

	return (
		<div className="relative inline-block">
			<InformationCircleIcon
				className="h-6 w-6 text-blue-500 cursor-pointer mt-1 ml-1"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			/>
			{showPopup && (
				<div
					className="absolute z-10 p-4 bg-white border rounded shadow-md w-64 text-sm"
					style={{ top: "2rem", left: "1rem" }}
				>
					{loading ? (
						<p>Loading...</p>
					) : error ? (
						<p className="text-red-500">{error}</p>
					) : (
						<>
							<p>
								<span className="font-semibold text-sm">
									Created at:{" "}
								</span>
								{formatDate(group.add_date)}
							</p>
							<p>
								<span className="font-semibold">
									Last Updated:{" "}
								</span>
								{formatDate(group.update_date)}
							</p>
							{lastGroupAdd && (
								<p>
									<span className="font-semibold">
										Last Group Added:{" "}
									</span>
									{lastGroupAdd.name}
								</p>
							)}
							{lastGroupUpdate && (
								<p>
									<span className="font-semibold">
										Last Group Updated:{" "}
									</span>
									{lastGroupUpdate.name}
								</p>
							)}
							{lastPersonAdded && (
								<p>
									<span className="font-semibold">
										Last Person Added:{" "}
									</span>
									{lastPersonAdded.first_name}{" "}
									{lastPersonAdded.last_name}
								</p>
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default HoverPopup;
