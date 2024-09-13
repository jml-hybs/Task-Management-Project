<script>
	let {
		label,
		id,
		placeholder,
		rows = 3,
		type = 'text',
		required,
		min,
		max,
		step,
		devs,
		forDev,
		formData = $bindable()
	} = $props();
	// Determines if the input should be a textarea based on type prop
	//let isTextarea = $derived(type === 'textarea');
	$effect(() => {
		//console.log(type);
	});
</script>

<div class="flex flex-col bg-gray-800 p-6">
	<label for={id} class=" text-gray-300 font-semibold mb-2">
		{label}: {#if forDev}
			<small class="text-orange-400"><em>for the developer</em></small>{/if}
	</label>

	{#if type === 'textarea'}
		<textarea
			{id}
			{placeholder}
			{rows}
			bind:value={formData}
			{required}
			class="w-full px-3 py-2 border rounded focus:outline outline-orange-700 border-gray-700 bg-gray-900 text-white focus:ring-blue-400"
		></textarea>
	{:else if type === 'dropdown'}
		<select
			{id}
			{placeholder}
			onchange={formData}
			class="w-full p-2 rounded border focus:outline outline-orange-700 border-gray-700 bg-gray-900 text-white text-center"
		>
			{#each devs as dev (dev.id)}
				<option class="  bg-gray-900 text-white" value={dev.name}>
					{dev.name}
				</option>
			{/each}
		</select>
	{:else}
		<input
			{id}
			{type}
			{placeholder}
			bind:value={formData}
			{required}
			{min}
			{max}
			{step}
			class="w-full px-3 py-2 border rounded focus:outline outline-orange-700 border-gray-700 bg-gray-900 text-white focus:ring-blue-400"
		/>
	{/if}
</div>

<!-- let columnPoints = $state({});

	//function to calculate the points for each column
	function calculateColumnPoints() {
		columnPoints = {};
		statuses.forEach((status) => {
			const statusTasks = tasks.filter((task) => task.status === status);
			//	console.log(statusTasks, 'statusTask');

			columnPoints[status] = statusTasks.reduce((sum, task) => sum + task.points, 0);
		});
	}
	 -->

<style>
	/* .form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
	} */
</!-->
