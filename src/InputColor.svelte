<script>
    export let id = null;
    export let value;
    export let style;
</script>

<style>

    input[type="color"] {
        border: none;
        border-radius: 0.3rem;
        height: 1.6rem;
        width: 1.6rem;
        min-height: 2rem;
        line-height: 2rem;
        min-width: 2rem;
        padding: 0;
    }


</style>

<input type="color" {id} bind:value={value} {style}>