<script>
import {HsvPicker} from 'svelte-color-picker';

function colorCallback(rgba) {
    console.log(rgba.detail)
}
</script>

<HsvPicker on:colorChange={colorCallback} startColor={"#FBFBFB"}/>