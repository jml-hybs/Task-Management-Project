<script>
	let { showModal = $bindable() } = $props();
</script>

<header class=" w-full top-0 z-10 bg-gray-800 flex rounded-b shadow justify-between p-3">
	<h1 class="text-2xl font-bold text-center">Mage Inc. Task Management System</h1>
	<button
		onclick={() => (showModal = true)}
		class=" bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none"
	>
		Add Task
	</button>
</header>
