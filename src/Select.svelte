<script>
    export let id;
    export let value;
    export let changeEvent;
</script>

<style>
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        font-size: inherit;
        width: 100%;
        padding: 0.6rem 0.5rem;
        border-radius: 0.3rem;
        background: #FFF;
        border: 1px solid #BDBDBD;
    }

    .select-holder {
        position: relative;
        width: 100%;
    }

    .select-holder select:after {
        display: block;
        pointer-events: none;
        content: ' ';
        position: absolute;
        right: 1rem;
        top: 1.4rem;
        width: 0;
        height: 0;
        border-width: 1rem;
        border: 0.5rem solid #DDD;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
    }
</style>

<div class="select-holder">
    <select id={id} bind:value={value} on:change={changeEvent}>
        <slot></slot>
    </select>
</div>