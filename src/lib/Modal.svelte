<script>
	import FaWindowClose from 'svelte-icons/fa/FaWindowClose.svelte';
	export let showModal; // boolean
	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
	/* function closeModal() {
		showModal = false;
	} */
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="bg-gray-800 text-white"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div on:click|stopPropagation class="flex justify-end">
		<button
			autofocus
			on:click={() => dialog.close()}
			class="  text-orange-700 rounded p-2 focus:outline outline-orange-600 hover:bg-gray-900 hover:rounded-sm focus:outline-none w-8 h-8"
		>
			<FaWindowClose />
		</button>
	</div>
	<slot name="form" />
</dialog>

<style>
	/* dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	} */
</style>
