/* export function draggable(node, data) {
	let state = data;

	node.draggable = true;
	node.style.cursor = 'grab';

	function handle_dragstart(e) {
		if (!e.dataTransfer) return;
		e.dataTransfer.setData('text/plain', state);
	}

	node.addEventListener('dragstart', handle_dragstart);

	return {
		update(data) {
			state = data;
		},

		destroy() {
			node.removeEventListener('dragstart', handle_dragstart);
		}
	};
}

export function dropzone(node, options) {
	let state = {
		dropEffect: 'move',
		dragover_class: 'droppable',
		...options
	};

	function handle_dragenter(e) {
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.add(state.dragover_class);
	}

	function handle_dragleave(e) {
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.remove(state.dragover_class);
	}

	function handle_dragover(e) {
		e.preventDefault();
		if (!e.dataTransfer) return;
		e.dataTransfer.dropEffect = state.dropEffect;
	}

	function handle_drop(e) {
		e.preventDefault();
		if (!e.dataTransfer) return;
		const data = e.dataTransfer.getData('text/plain');
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.remove(state.dragover_class);
		state.on_dropzone(data, e);
	}

	node.addEventListener('dragenter', handle_dragenter);
	node.addEventListener('dragleave', handle_dragleave);
	node.addEventListener('dragover', handle_dragover);
	node.addEventListener('drop', handle_drop);

	return {
		update(options) {
			state = {
				dropEffect: 'move',
				dragover_class: 'droppable',
				...options
			};
		},

		destroy() {
			node.removeEventListener('dragenter', handle_dragenter);
			node.removeEventListener('dragleave', handle_dragleave);
			node.removeEventListener('dragover', handle_dragover);
			node.removeEventListener('drop', handle_drop);
		}
	};
} */

/* import { onDestroy } from 'svelte';

export function draggable(node, data) {
	let state = data;
	console.log(node);
	console.log(state);

	node.draggable = 'true';
	node.style.cursor = 'grab';

	function handleDragstart(e, item) {
		e.dataTransfer.setData('application/json', JSON.stringify(state));
		console.log(item);
	}

	node.addEventListener('dragstart', handleDragstart);

	return {
		update(data) {
			state = data;
		},
		destroy() {
			node.removeEventListener('dragstart', handleDragstart);
		}
	};
}
 */









/* <script>
	import { onMount, onDestroy } from 'svelte';
	let { isModalOpen = $bindable() } = $props();
	$inspect(isModalOpen);
	let inputText = '';

	function handleSubmit(event) {
		event.preventDefault();
		// Add your logic to add the new todo item here
		addTodo(inputText);
		onclose(); // Close the modal after submitting
		inputText = ''; // Clear the input field
	}

	function handleCancel() {
		isModalOpen = false;
	}

	let isFormVisible = true;

	// Add event listener to close the modal when clicking outside of it
	function handleOutsideClick(event) {
		if (event.target.closest('.modal')) return; // Ignore clicks inside the modal content
		isModalOpen = false;
	}

	onMount(() => {
		document.addEventListener('click', handleOutsideClick);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleOutsideClick);
	});
</script>


<div class="fixed inset-0 bg-black opacity-50 z-10" on:click={handleCancel}></div>
<div class="fixed bottom-0 right-0 m-4 bg-white p-6 rounded shadow max-w-md w-full">
	<form on:submit={handleSubmit}>
		<input
			bind:value={inputText}
			type="text"
			placeholder="Add a new task..."
			class="w-64 p-2 mt-4 border border-gray-300 rounded text-black bg-white focus:outline-none"
		/>
		<div class="flex justify-end mt-6">
			<button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded mr-2">
				Add Task
			</button>
			<button on:click={handleCancel} class="bg-gray-300 text-black py-2 px-4 rounded">
				Cancel
			</button>
		</div>
	</form>
</div> 
<form onsubmit={addTodo} class="absolute w-full bottom-0 z-10">
	<input
		bind:value={inputText}
		type="text"
		placeholder="Add a new todo..."
		class="w-64 p-2 ml-auto mr-auto mt-4 border border-gray-300 rounded text-black bg-white focus:outline-none"
	/>
</form>

<style>
	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		border-radius: 5px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}

	/* Add any additional styles for the modal as needed */
</style>
 */