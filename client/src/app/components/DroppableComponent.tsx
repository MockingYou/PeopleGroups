import React, { useState } from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import PersonModal from "./PersonModal";
import { PencilSquareIcon, UserPlusIcon } from "@heroicons/react/16/solid";
import { Person } from "./DragableList";
import Button from "./Button";

interface DroppableComponentProps {
	id: string;
	persons: Person[];
	fetchGroupData: () => void;
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
	return formattedDate;
};

const DroppableComponent: React.FC<DroppableComponentProps> = ({
	id,
	persons,
	fetchGroupData,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState<Person | null>(null);
	const [useValues, setUseValues] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleOpenModal = () => {
		setUseValues(false);
		setModalData(null);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setError(null);
	};

	const editPersonData = (person: Person) => {
		setModalData(person);
		setUseValues(true);
		setShowModal(true);
	};

	return (
		<>
			{showModal && (
				<PersonModal
					groupId={Number(id)}
					handleClose={handleCloseModal}
					fetchGroupData={fetchGroupData}
					useValues={useValues}
					data={modalData}
				/>
			)}
			<Droppable droppableId={id}>
				{(provided: DroppableProvided) => (
					<div
						className="ml-4 p-2 rounded"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{error && <p className="text-red-500 mb-2">{error}</p>}
						<ul className="space-y-2">
							{persons.group.map(
								(person: Person, index: number) => (
									<Draggable
										key={person.id.toString()}
										draggableId={person.id.toString()}
										index={index}
									>
										{(provided) => (
											<li
												className="flex items-center justify-between p-2 bg-white rounded shadow-sm hover:shadow-md"
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<div>
													<h1 className="font-bold text-lg">{`${person.first_name} ${person.last_name}`}</h1>
													<p>
														<span className="font-semibold">
															Title:{" "}
														</span>
														{person.job_title}
													</p>
													<p>
														<span className="font-semibold">
															Added:{" "}
														</span>
														{formatDate(
															person.add_date,
														)}
													</p>
													<p>
														<span className="font-semibold">
															Last Updated:{" "}
														</span>
														{formatDate(
															person.update_date,
														)}
													</p>
												</div>
												<PencilSquareIcon
													className="h-6 w-6 text-blue-500 cursor-pointer"
													onClick={() =>
														editPersonData(person)
													}
												/>
											</li>
										)}
									</Draggable>
								),
							)}
							{provided.placeholder}
						</ul>
						<div className="flex items-center justify-center ml-4 mt-4 w-40">
							<Button
								text="Add Person"
								handleClick={handleOpenModal}
								disabled={false}
								icon={<UserPlusIcon className="h-6 w-6" />}
							/>
						</div>
					</div>
				)}
			</Droppable>
		</>
	);
};

export default DroppableComponent;
