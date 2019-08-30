<script>
    export let type = "standard";
</script>

<style>

    :global(.form-group-layout-horizontal .form-group) {
    	display: flex;
    }

    :global(.form-group-layout-horizontal .form-group-controls) {
    	flex: 1 0 auto;
    }

</style>

{#if type == "standard"}
    <div class="form-group-layout-standard">
        <slot></slot>
    </div>
{:else if type == "horizontal" }
    <div class="form-group-layout-horizontal">
        <slot></slot>
    </div>
{:else if type == "inline" }
    <div class="form-group-layout-inline">
        <slot></slot>
    </div>
{/if}