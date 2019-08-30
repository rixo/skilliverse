<script>

    import Button from '../UI/Button.svelte';

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

    let narrow = false;

    let windowWidth = window.innerWidth;

    handleResize();

    function handleResize() {
        windowWidth = window.innerWidth;
        if (windowWidth < 1023) {
          narrow = false
        } else {
            narrow = true;
        }
    }

</script>

<style>

    .wrapper {
        display: flex;
        justify-content: center;
        align-content: center;
    }

    .wrapper-narrow {
        justify-content: center;
        flex-direction: column;
    }

    .skill-rating {
        display: inline-block;
        height: 3.2rem;
        width: 3.2rem;
        text-align: center;
        line-height: 3.2rem;
    }

    .wrapper-narrow .skill-rating {
        padding: 0 0.6rem;
        width: 100%;
    }

</style>

<svelte:window on:resize={handleResize}/>

<div class="wrapper {narrow ? '' : 'wrapper-narrow'}">
    <Button icon="remove" layout="icon-only" disabled={rating <= skillMinValue} on:click={decrement}>Decrement</Button>
    <span class="skill-rating">{rating}</span>
    <Button icon="add" layout="icon-only" disabled={rating >= skillMaxValue} on:click={increment}>Increment</Button>
</div>

