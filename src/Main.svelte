<script>
  import { Svench } from 'svench'
  import 'svench/prism.js'
  import App from './App.svelte'
</script>

<Svench base="/svench" fallback={App} />
