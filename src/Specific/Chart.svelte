<script>

  export let chartValues = [
    [0, 5, 4],
    [3, 2, 1]
  ];

  export let skillMaxValue = 5;
  export let teamMembers = ["Name 1", "Name 2", "Name 3"];
  export let skills = ["Skill 1", "Skill 2", "Skill 3"];

  let chartData = [];

  export let chartColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'darkgrey'];

  $: for (var i = 0; i < chartValues.length; i++) {
    chartData.push();
        chartData[i] = "--color: "+chartColors[i]+";"
        for (var j = 0; j < chartValues[i].length; j++) {
            chartData[i] += '--' + [j+1] + ':' + chartValues[i][j] + '; ';
        }
        chartData[i] += '--'+parseInt(chartValues[0].length+1)+': var(--1)';
  }

</script>

<style>

</style>

<table
  class="chaarts radar-multiple"
  id="radar-multiple"
  style="--scale: {skillMaxValue}; --step: 1; --items: {skills.length}; --areas: {teamMembers.length};">
  <caption class="u-sr-only">Skill level per skill, out of {skillMaxValue}</caption>
  <thead>
    <tr>
      {#each skills as skill, i}
        <th scope="col">{skill}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each chartValues as rowValues, j}
      <tr style={chartData[j]}>
        {#each teamMembers as teamMember, i}
          {#if i == j}
            <th scope="row">{teamMember}</th>
          {/if}
        {/each}
        {#each rowValues as skillValue, k}
          <td><span>{skillValue}</span></td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
