<style>
    .button-toolbar {
        display: flex;
    }

    :global(.button-toolbar button) {
        margin-right: 0.5rem;
    }

    :global(.button-toolbar button:last-child) {
        margin-right: 0;
    }
</style>

 <div class="button-toolbar">
    <slot></slot>
</div>