<script>
	import FormFields from './FormFields.svelte';
	import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
	import { db } from './firebase';

	let { tasks = $bindable(), showModal = $bindable(), isEditing } = $props();
	const task = $derived(tasks.find((task) => task.id === isEditing));

	//$inspect('showModal', task);

	let user = { name: 'test', id: 'test' };
	let formData = $state({
		requestedAt: '', //
		createdAt: serverTimestamp(), //at sending formdata
		finishedAt: '', //at drag to finish column
		title: '', //
		description: '', //
		attachments: '',
		points: '', //
		status: 'regular', //automatically set to regular
		statusState: '', //
		assignee: 'none', //dev array,
		assigneeId: '', //dev array
		requestor: user.name, //user
		requestorId: user.id //user
	});
	if (isEditing) {
		formData = { ...task };
	}
	//$inspect('isEditing', isEditing);

	let devs = $state([
		{ name: 'none', id: '0' },
		{ name: ' Jaji', id: '1' },
		{ name: ' Jim', id: '2' },
		{ name: ' Lupin', id: '3' },
		{ name: ' Jai', id: '4' }
	]);

	function handleSelectChange(event) {
		const selectedDev = $state(devs.find((dev) => dev.name === event.target.value));
		formData.assignee = selectedDev.name;
		formData.assigneeId = selectedDev.id;
	}
	async function handleSubmitTask(event) {
		if (!formData.title) return;
		event.preventDefault();

		try {
			const taskRef = collection(db, 'tasks');
			if (!isEditing) {
				//send data to the db and update the frontend
				const sendDoc = await addDoc(taskRef, formData);
				tasks.push({ ...formData, createdAt: 'Just Now', id: sendDoc.id });
				//reset form
				showModal = false;
				formData = {
					requestedAt: '',
					createdAt: serverTimestamp(),
					finishedAt: '',
					title: '',
					description: '',
					attachments: '',
					points: '',
					status: 'regular',
					statusState: '',
					assignee: 'none',
					assigneeId: '',
					requestor: user.name,
					requestorId: user.id
				};

				console.log('Task submitted successfully');
			} else {
				//update the doc in the db
				const docRef = doc(db, 'tasks', isEditing);
				await updateDoc(docRef, formData);
				//update the task on the frontend to show that it has been updated in db
				const taskToUpdate = tasks.find((task) => task.id === isEditing);
				if (taskToUpdate) {
					Object.assign(taskToUpdate, formData);
				}
				//reset
				showModal = false;
				formData = {
					requestedAt: '',
					createdAt: serverTimestamp(),
					finishedAt: '',
					title: '',
					description: '',
					attachments: '',
					points: '',
					status: 'regular',
					statusState: '',
					assignee: 'none',
					assigneeId: '',
					requestor: user.name,
					requestorId: user.id
				};
			}
		} catch (error) {
			console.error('Error submitting task:', error);
		}
	}
</script>

<form onsubmit={handleSubmitTask} class="space-y-8">
	<h1 class="col-span-2 text-2xl font-bold text-center">Task Request Form</h1>
	<div class="grid grid-cols-2 gap-4">
		<FormFields
			label="Task Title ✍️"
			id="title"
			placeholder="Name of the task"
			required
			bind:formData={formData.title}
		/>

		<FormFields
			label="Requested At 📅"
			id="requestedAt"
			type="date"
			required
			bind:formData={formData.requestedAt}
		/>

		<FormFields
			label="Description 📜"
			id="description"
			placeholder="A description of the task "
			type="textarea"
			rows={5}
			bind:formData={formData.description}
		/>

		<FormFields
			label="Status State 🛠️"
			id="statusState"
			placeholder="Simple description of the current status (Postponed, Code Review, Testing)"
			type="textarea"
			forDev
			bind:formData={formData.statusState}
		/>
		<FormFields
			label="Assign To 👨‍💻"
			id="assignee"
			placeholder="To whom the task will be assigned"
			type="dropdown"
			{devs}
			bind:formData={handleSelectChange}
		/>
		<FormFields
			label="Points 🎯"
			id="points"
			placeholder="10-100"
			type="number"
			min="10"
			max="100"
			step="10"
			required
			forDev
			bind:formData={formData.points}
		/>
	</div>
	<div class="text-center p-8">
		<button
			type="submit"
			class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-150"
			>{!isEditing ? 'Submit' : 'Edit'}</button
		>
	</div>
</form>

<!-- <button onclick={() => (showModal = false)}>Close Modal</button>
 -->
<style>
</style>
