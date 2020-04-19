<script>
  import { View } from 'svench'
  import Alert from '../UI/Alert.svelte';
</script>

<View name="default">
    <Alert>I am a default alert.</Alert>
</View>

<View name="Error">
    <Alert type="error">I am an error message.</Alert>
</View>

<View name="Success">
    <Alert type="success">I am a success message.</Alert>
</View>

<h3>Types</h3>

<View name="Normal">
    <Alert>Hey, I don't have any options.</Alert>
</View>

<View name="Dismissible">
    <Alert dismissible>Hey, I am dismissible.</Alert>
</View>
