<script>
    export let forValue = null;
</script>
<style>

    label {
        display: block;
        font-weight: 700;
    }

    :global(.form-group-layout-horizontal label) {
        margin-top: 0.6rem;
        min-width: 12rem;
    }

    :global(.form-group-layout-horizontal .form-group label) {
    	flex: 0 1 12rem;
    }
</style>

<label for="{forValue}">
    <slot></slot>
</label>
