<script>

    import Button from './Button.svelte';

    export let rating;

    export let skillMinValue = 0;
    export let skillMaxValue = 5;

    function decrement() {
        rating = parseInt(rating);
        rating -= 1;
    }

    function increment() {
        rating = parseInt(rating);
        rating += 1;
    }

</script>

<style>

    .wrapper {
        display: flex;
        justify-content: center;
    }

    .skill-rating {
        display: inline-block;
        width: 3.2rem;
        height: 3.2rem;
        text-align: center;
        line-height: 3.2rem;
        margin: 0 0.6rem;
    }

</style>

<div class="wrapper">
    <Button icon="remove" layout="icon-only" disabled={rating <= skillMinValue} on:click={decrement}>Decrement</Button>
    <span class="skill-rating">{rating}</span>
    <Button icon="add" layout="icon-only" disabled={rating >= skillMaxValue} on:click={increment}>Increment</Button>
</div>

