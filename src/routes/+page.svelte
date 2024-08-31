<script lang="ts">
	import AddTaskForm from '$lib/AddTaskForm.svelte';
	import Header from '$lib/Header.svelte';
	import { db } from '$lib/firebase';
	import type { Card } from '$lib/interface';
	import Modal from '$lib/Modal.svelte';
	import TaskColumns from '$lib/TaskColumns.svelte';
	import { collection, getDocs, query, serverTimestamp } from 'firebase/firestore';

	//let done = $derived(todos.filter((t) => t.checked).length);
	let showModal = $state(false);
	let inputText = $state('');
	let tasks: Card[] = $state([]);

	$inspect('tasks here', showModal);
	function addTodo(event) {
		if (!inputText) return;
		event.preventDefault();
		tasks.push({ id: tasks.length + 1, title: inputText, status: 'pending' });
		inputText = '';
	}

	$effect(() => {
		async function getTasks() {
			const q = query(collection(db, 'tasks'));

			try {
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					const createdAtTimestamp = doc.data().createdAt; // Get the Timestamp object
					console.log(createdAtTimestamp);

					const createdAtDate = createdAtTimestamp.toDate(); // Convert to Date object
					console.log(createdAtDate);

					const formattedDate = createdAtDate.toLocaleDateString('en-US', {
						year: 'numeric',

						month: 'long',

						day: 'numeric',

						hour: 'numeric',

						minute: 'numeric',

						second: 'numeric'
					});
					console.log(formattedDate);

					tasks.push({ id: doc.id, ...doc.data(), createdAt: formattedDate });
				});
			} catch (error) {
				console.log(error);
			}
		}
		getTasks();
	});
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
	<Header bind:showModal />
	<TaskColumns {tasks} bind:showModal />
</div>

{#if showModal}
	<Modal bind:showModal>
		<AddTaskForm {tasks} bind:showModal slot="form" />
	</Modal>
{/if}

<!-- .column {
		@apply flex flex-col space-y-2 p-4 bg-gray-200 rounded-lg;
	} -->
<!-- .card {
		@apply p-2 bg-white shadow rounded cursor-move;
	} -->
<style>
</style>
