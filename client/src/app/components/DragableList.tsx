import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Button from "./Button";
import ToggleIcon from "./ToggleIcon";
import DroppableComponent from "./DroppableComponent";
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import GroupModal from "./GroupModal";
import HoverPopup from "./HoverPopup";

export interface Person {
	id: number;
	first_name: string;
	last_name: string;
	job_title: string;
	add_date: string;
	update_date: string;
	group_id: number;
}

export interface Group {
	id: number;
	name: string;
	add_date: string;
	update_date: string;
	group_id?: number;
}

interface Groups {
	group: Group;
	persons: Person[];
	subgroups: Groups[];
}

const DragableList: React.FC = () => {
	const [groupsData, setGroupsData] = useState<Groups[]>([]);
	const [showPersonsStates, setShowPersonsStates] = useState<{
		[key: number]: boolean;
	}>({});
	const [showModal, setShowModal] = useState(false);
	const [modalGroupId, setModalGroupId] = useState<number | null>(null);
	const [modalData, setModalData] = useState<Group | null>(null);
	const [useValues, setUseValues] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleOpenModal = (groupId: number) => {
		setShowModal(true);
		setUseValues(false);
		setModalGroupId(groupId);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setModalGroupId(null);
		setModalData(null);
	};

	const editGroupData = (group: Group) => {
		handleOpenModal(group.id);
		setUseValues(true);
		setModalData(group);
	};

	const updateItemGroup = async (personId: number, groupId: number) => {
		try {
			const response = await fetch(
				`http://localhost:3000/persons/${personId}`,
				{
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ group_id: groupId }),
				},
			);
			if (!response.ok) {
				throw new Error("Failed to update person group");
			}
			const personData = await response.json();
			console.log("Person Response:", personData);
		} catch (error) {
			console.error("Error updating person group:", error);
			setError("Failed to update person group");
		}
	};

	const handleTogglePersons = (groupId: number) => {
		setShowPersonsStates((prevStates) => ({
			...prevStates,
			[groupId]: !prevStates[groupId],
		}));
	};

	const fetchGroupData = async () => {
		try {
			const response = await fetch("http://localhost:3000/groups");
			if (!response.ok) {
				throw new Error("Failed to fetch groups");
			}
			const { groups } = await response.json();
			const memo = new Map<number, Groups>();

			const getNestedGroups = async (group: Group): Promise<Groups> => {
				if (memo.has(group.id)) {
					return memo.get(group.id)!;
				}

				const [personsResponse, subgroupsResponse] = await Promise.all([
					fetch(`http://localhost:3000/groups/join/${group.id}`),
					fetch(`http://localhost:3000/groups/group/${group.id}`),
				]);

				if (!personsResponse.ok || !subgroupsResponse.ok) {
					throw new Error("Failed to fetch persons or subgroups");
				}

				const personsData = await personsResponse.json();
				const subgroupsData = await subgroupsResponse.json();
				const subgroupsWithPersons = await Promise.all(
					subgroupsData.group.map(
						async (subgroup: Group) =>
							await getNestedGroups(subgroup),
					),
				);

				const groupWithPersons: Groups = {
					group,
					persons: personsData,
					subgroups: subgroupsWithPersons,
				};

				memo.set(group.id, groupWithPersons);

				return groupWithPersons;
			};

			const fetchedGroups = await Promise.all(
				groups.map(
					async (group: Group) => await getNestedGroups(group),
				),
			);

			setGroupsData(fetchedGroups);

			const initialShowPersonsStates: { [key: number]: boolean } = {};
			groups.forEach((group: Group) => {
				initialShowPersonsStates[group.id] = false;
			});
			setShowPersonsStates(initialShowPersonsStates);
		} catch (error) {
			console.error("Error fetching data:", error);
			setError("Failed to fetch group data");
		}
	};

	useEffect(() => {
		fetchGroupData();
	}, []);

	const handleOnDragEnd = (result: DropResult) => {
		const { source, destination } = result;
		if (!destination) return;

		const sourceGroupId = Number(source.droppableId);
		const destinationGroupId = Number(destination.droppableId);
		const updatedGroupsData = [...groupsData];

		const sourceGroup = findGroupById(updatedGroupsData, sourceGroupId);
		const destinationGroup = findGroupById(
			updatedGroupsData,
			destinationGroupId,
		);

		if (!sourceGroup || !destinationGroup) return;

		const movedPerson = sourceGroup.persons[source.index];

		const updatedSourcePersons = [...sourceGroup.persons];
		updatedSourcePersons.splice(source.index, 1);

		const updatedDestinationPersons = [...destinationGroup.persons];
		updatedDestinationPersons.splice(destination.index, 0, movedPerson);

		sourceGroup.persons = updatedSourcePersons;
		destinationGroup.persons = updatedDestinationPersons;

		setGroupsData(updatedGroupsData);

		updateItemGroup(movedPerson.id, destinationGroupId);
	};

	const findGroupById = (
		groups: Groups[],
		groupId: number,
	): Groups | undefined => {
		for (const group of groups) {
			if (group.group.id === groupId) {
				return group;
			} else {
				const subgroup = findGroupById(group.subgroups, groupId);
				if (subgroup) return subgroup;
			}
		}
		return undefined;
	};

	const renderGroups = (groupData: Groups) => {
		const isExpanded = showPersonsStates[groupData.group.id];

		return (
			<div key={groupData.group.id.toString()}>
				<div className="flex items-center justify-between mb-2 cursor-pointer p-2 hover:bg-blue-200 rounded">
					<div className="flex flex-col">
						<h2 className="flex flex-row text-lg font-bold">
							{groupData.group.id}.{groupData.group.name}
							<HoverPopup group={groupData.group} />
						</h2>
					</div>

					<div>
						<div className="ml-8 h-8 w-8">
							<Button
								text=""
								handleClick={() =>
									handleOpenModal(groupData.group.id)
								}
								disabled={false}
								icon={<PlusIcon className="h-6 w-6" />}
							/>
						</div>
						<PencilSquareIcon
							className="h-6 w-6 text-blue-500 cursor-pointer -translate-y-2"
							onClick={() => editGroupData(groupData.group)}
						/>
						<ToggleIcon
							show={isExpanded}
							onClick={() =>
								handleTogglePersons(groupData.group.id)
							}
						/>
					</div>
				</div>
				{isExpanded && (
					<DroppableComponent
						id={groupData.group.id.toString()}
						persons={groupData.persons}
						fetchGroupData={fetchGroupData}
					/>
				)}
				<div className="ml-6">
					{groupData.subgroups.map((subgroup) =>
						renderGroups(subgroup),
					)}
				</div>
			</div>
		);
	};

	const primaryGroups = groupsData.filter(
		(group) => group.group.group_id === 0,
	);

	return (
		<>
			{showModal && modalGroupId !== null && (
				<GroupModal
					id={modalGroupId}
					handleClose={handleCloseModal}
					fetchGroupData={fetchGroupData}
					useValues={useValues}
					data={modalData}
				/>
			)}
			{error && <div className="text-red-500 mb-4">{error}</div>}
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<div className="flex flex-col space-y-2 p-4 bg-blue-50 h-full">
					{primaryGroups.map((groupData) => renderGroups(groupData))}
				</div>
			</DragDropContext>
		</>
	);
};

export default DragableList;
