<script>

    export let message = "Default message";

</script>

<div class="alert" role="alert">
    <slot></slot>
</div>

<style>

    .alert {
        background: #FFD0D0;
        border: 1px solid #EAA2A2;
        color: #C80000;
        padding: 1.6rem;
        border-radius: 0.3rem;
    }

</style>