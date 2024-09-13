<script>
	import { doc, updateDoc } from 'firebase/firestore';
	import { db } from './firebase';
	import FaTrash from 'svelte-icons/fa/FaTrash.svelte';
	import FaInfoCircle from 'svelte-icons/fa/FaInfoCircle.svelte';
	import FaEdit from 'svelte-icons/fa/FaEdit.svelte';
	import { tooltip } from './tooltip';
	let { tasks, showModal = $bindable(), isEditing = $bindable() } = $props();
	$inspect('isEditing', isEditing);
	const statuses = ['regular', 'pending', 'inProgress', 'finished'];

	// Calculate total points for each status
	function getTotalPointsForStatus(status) {
		return tasks
			.filter((task) => task.status === status)
			.reduce((sum, task) => sum + task.points, 0);
	}

	async function updateTaskStatus(taskId, newStatus) {
		const taskDocRef = doc(db, 'tasks', taskId);
		await updateDoc(taskDocRef, { status: newStatus });
	}

	function handleDragStart(event, item) {
		event.dataTransfer.setData('application/json', JSON.stringify(item));
		console.log(JSON.stringify(item));
	}

	async function handleDrop(event, targetStatus) {
		event.preventDefault(); // Prevent the browser's default handling of the drop event
		const draggedItem = JSON.parse(event.dataTransfer.getData('application/json'));

		const currentPoints = getTotalPointsForStatus(targetStatus);
		const newPointsTotal = currentPoints + draggedItem.points;

		if (targetStatus === 'inProgress' && newPointsTotal > 100) {
			alert('Total points exceeded for inProgress column!');
			return;
		}

		// Find the item in the tasks array and update its status
		const itemIndex = tasks.findIndex((item) => item.id === draggedItem.id);
		if (itemIndex !== -1) {
			tasks[itemIndex].status = targetStatus;
			tasks = [...tasks]; // Trigger reactivity
		}
		await updateTaskStatus(draggedItem.id, targetStatus);
	}

	function handleDragOver(event) {
		event.preventDefault(); // Necessary to allow dropping
	}

	function getStatusBgColor(status) {
		switch (status) {
			case 'regular':
				return 'bg-gray-300';
			case 'pending':
				return 'bg-yellow-300';
			case 'inProgress':
				return 'bg-blue-300';
			case 'finished':
				return 'bg-green-300';
			default:
				return 'bg-gray-300';
		}
	}

	function getStatusStateColor(status) {
		switch (status) {
			case 'inProgress':
				return 'bg-gray-300';
			case 'Code Review':
				return 'bg-yellow-300';
			case 'Testing':
				return 'bg-blue-300';
			case 'testing':
				return 'bg-blue-300';
			default:
				return 'bg-gray-300';
		}
	}
</script>

<main class="flex flex-row justify-around w-full h-fit min-h-screen px-6 pt-6 bg-gray-900">
	{#each statuses as status}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="column border-r-8 border-gray-800 p-4 shadow-2xl flex-1"
			ondrop={(event) => handleDrop(event, status)}
			ondragover={handleDragOver}
		>
			<!-- Status Header -->
			<div class="p-4 {getStatusBgColor(status)} rounded-lg mb-4">
				<h2 class="text-lg text-gray-700 font-bold capitalize text-center">
					{status} - {getTotalPointsForStatus(status)} points
				</h2>
			</div>
			{#each tasks.filter((item) => item.status === status) as item (item.id)}
				<!-- Task Card -->
				<div
					class="card px-4 pb-4 mt-4 bg-gray-700 rounded-lg shadow-lg cursor-grab hover:bg-gray-600 transition-all duration-200"
					draggable="true"
					ondragstart={(event) => handleDragStart(event, item)}
				>
					<!-- Tooltip -->
					<div class="flex items-center justify-between">
						<!-- Info Tooltip -->
						<div use:tooltip={`Request from ${item.requestor} on ${item.requestedAt}`}>
							<button class="text-orange-400 cursor-pointer w-4 h-4"><FaInfoCircle /></button>
						</div>
						<!--  Buttons  -->
						<div class="flex justify-between space-x-2">
							<button
								onclick={() => ((showModal = true), (isEditing = item.id))}
								class="text-orange-400 hover:text-gray-900 w-4 h-4"
							>
								<FaEdit />
							</button>
							<button
								onclick={() => (showModal = true)}
								class="text-orange-400 hover:text-gray-900 w-4 h-4"
							>
								<FaTrash />
							</button>
						</div>
					</div>
					<div class="flex justify-between items-center mt-2">
						<!-- Task Title -->
						<p class="text-white font-semibold">{item.title}</p>
						<!-- Task Points -->
						<small>{item.points}</small>
					</div>
					<!-- Task Details -->
					<div class="text-sm text-gray-400 mt-2">
						<p>{item.description}</p>
					</div>
					<!-- Status State Indicator -->
					<div class="flex justify-between mt-4">
						<div class="flex items-center">
							<span
								class="inline-block w-3 h-3 rounded-full mr-2 {getStatusStateColor(
									item.statusState
								)}"
							></span>
							<span class="text-xs text-gray-400">{item.statusState}</span>
						</div>

						<small><em class="font-bold text-white">{item.assignee}</em></small>
					</div>
				</div>
			{/each}
		</div>
	{/each}
</main>
