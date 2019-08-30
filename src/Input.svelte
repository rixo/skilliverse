<script>
    export let id = null;
    export let value = '';
    export let type = "text";
    export let disabled = false;
    export let labelId = null;
</script>

<style>

    input {
        font-size: 1.4rem;
        font-family: Helvetica, Arial, sans-serif;
    }

    input[type="text"] {
        width: 100%;
        padding: 0.7rem;
        background: #FFF;
        border-radius: 0.3rem;
        border: 1px solid #BDBDBD;
        box-shadow: inset 0.1rem 0.1rem 0.2rem 0 rgba(0,0,0,0.12);
    }

    input[type="text"][disabled] {
        background: #EEE;
    }

</style>

<input id={labelId ? labelId : id} type="text" bind:value={value} {disabled}>
