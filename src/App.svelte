<script>

    import Chart from './Chart.svelte';

    // UI
    import Label from './Label.svelte';
    import Select from './Select.svelte';
    import Input from './Input.svelte';
    import InputNumber from './InputNumber.svelte';
    import InputColorAlt from './InputColorAlt.svelte';
    import SkillItem from './SkillItem.svelte';
    import Button from './Button.svelte';
    import ButtonToolbar from './ButtonToolbar.svelte';
    import FormGroup from './FormGroup.svelte';
    import FormGroupLayout from './FormGroupLayout.svelte';
    import Alert from './Alert.svelte';
    import AlertStack from './AlertStack.svelte';
    import Blankslate from './Blankslate.svelte';
    import InputColor from './InputColor.svelte';

    let maxTeamMembersReached = false;

    let isDesktop = true;
    $: window.outerWidth < 1023 ? isDesktop = false : isDesktop = true;

    // Limits of the app
    let maxTeamMembers = 8;
    let maxSkills = 8;
    let skillMinValue = 0;
    let skillMaxValue = 5;

    let debug = true;

    // Default data
    let teamMembers = [];
    let skills = [];
    let skillMap = [];
    let dataset = "medium";
    let showHelp = true;
    let alertStackData = [];
    let teamName = '';

    // Should have # amount of colors as max skills
    let chartColors = [
        '#E53935',
        '#1976D2',
        '#43A047',
        '#FDD835',
        '#B844D7',
        '#00796B',
        '#FF5722',
        '#795548',
    ];

    let newTeamMember = '';
    let newSkill = '';

    // Reactive statements
    $: maxTeamMembersReached = teamMembers.length >= maxTeamMembers;
    $: skillAmount = skills.length;
    $: teamMemberAmount = teamMembers.length;

    /*  Data sets
       ========================================================================== */

    // Short data set

    let exampleTeamMembersShort = [
        'Ronny',
        'Oliver',
    ];

    let exampleSkillsShort = [
        'UI design',
        'Video editing',
        'Writing'
    ];

    // The # of rows here needs to be equal to the # of team members
    // The # of columns here needs to be equal to the # of skills
    let exampleSkillMapShort = [
        [1,  2 ,  1  ],
        [4,  2 ,  0  ]
    ];

    // Medium data set

    let exampleTeamMembersMedium = [
        'Adam',
        'John',
        'Anna',
        'Eva',
    ];

    let exampleSkillsMedium = [
        'UI design',
        'Video editing',
        'Writing',
        'Management',
        'Front-end development'
    ];

    let exampleSkillMapMedium = [
        [1,  2 ,  1 ,  3 ,  2 ],
        [4,  2 ,  0 ,  0 ,  0 ],
        [0,  0 ,  2 ,  2 ,  2 ],
        [0,  3 ,  3 ,  0 ,  0 ]
    ];

    // Big data set

    let exampleTeamMembersBig = [
        'Adam',
        'John',
        'Anna',
        'Eva',
        'Ronny',
        'Oliver',
        'Xavier',
        'Barack'
    ];

    let exampleSkillsBig = [
        'UI design',
        'Video editing',
        'Writing',
        'Management',
        'Front-end development',
        'Video editing',
        'Fishing',
        'Cooking'
    ];

    let exampleSkillMapBig = [
        [1,  2,  1,  3,  1,  2,  1,  3 ],
        [4,  2,  0,  0,  4,  2,  0,  0 ],
        [0,  0,  2,  2,  0,  0,  2,  2 ],
        [0,  3,  3,  0,  0,  3,  3,  0 ],
        [1,  2,  1,  3,  1,  2,  1,  3 ],
        [4,  2,  0,  0,  4,  2,  0,  0 ],
        [0,  0,  2,  2,  0,  0,  2,  2 ],
        [0,  3,  3,  0,  0,  3,  3,  0 ]
    ];
    // Invalid data set

    let exampleTeamMembersInvalid = [
        'Adam',
        'John',
        'Anna',
        'Eva',
        'Adam',
        'John',
        'Anna',
        'Eva',
        'Eva'
    ];

    let exampleSkillsInvalid = [
        'UI design',
        'Video editing',
        'Writing',
        'Front-end development'
    ];

    let exampleSkillMapInvalid = [
        [1,  2 ,  1 ,  3 ,  2 ],
        [4,  2 ,  30 ,  0 ,  0 ],
        [0,  0 ,  2 ,  2 ,  2 ],
        [0,  3 ,  3 ,  0 ,  0 ]
    ];

    /*  Help
       ========================================================================== */

    function toggleHelp() {
        showHelp = !showHelp;
    }

   /*  Debug
       ========================================================================== */

    function toggleDebug() {
        debug = !debug;
    }

    /* Feature: Adding and removing data
       ========================================================================== */

    function addTeamMember() {
        teamMembers = [...teamMembers, newTeamMember];

        // Add a new skill row (with 0 as defaults)
        var newSkillArr = [];
        for (var i = 0, length = skillAmount; i <length; i++) {
            newSkillArr.push("0");
        }
        teamMemberAmount = teamMemberAmount + 1;
        skillMap = [...skillMap, newSkillArr];

        // Clear field
        newTeamMember = '';
    }

    function addSkill() {
        skills = [...skills, newSkill];

        // Add an item to the end of each skillmap row
        for (var i = 0, length = skillMap.length; i<length; i++) {
          skillMap[i] = [...skillMap[i], "0"];
        }
        skillAmount = skillAmount + 1;

        var newSkillArr = [];
        for (var i = 0, length = skillAmount; i <length; i++) {
            newSkillArr.push("0");
        }
        // Clear field
        newSkill = '';
    }

    function removeTeamMember(index) {
        teamMembers = teamMembers.filter((val, i) => {
            return i !== index;
        });
        skillMap = skillMap.filter((val, i) => {
            return i !== index;
        });
    }

    function removeSkill(index) {
        skills = skills.filter((val, i) => {
            return i !== index;
        });

        skillAmount = skillAmount - 1;
        for (var i = 0, length = skillMap.length; i<length; i++) {
          var row = skillMap[i];
          row = row.splice(index, 1);
        }
        skillMap = skillMap;
    }

    /* Feature: input validation
       ========================================================================== */

    function isValidNumber(number) {
        if ((number >= skillMinValue) && (number <= skillMaxValue)) {
            return true;
        } else {
            alertStackData = ['Please enter skill values with a maximum of '+skillMaxValue+'. Or your chart might start looking a bit weird.', ...alertStackData];
            return false;
        }
    }

    /* Feature: data validation
       ========================================================================== */

    function skillMapIsInValid(inputtedMap) {
        for (let i = 0, length = inputtedMap.length; i < length; i++) {
            for (let j = 0, length = inputtedMap[i].length; j < length; j++) {
                if (!isValidNumber(inputtedMap[i][j])) {
                    // console.error('Found an invalid number in the skill map.')
                    //alertStackData = ['Please enter skill values with a maximum of '+skillMaxValue+'.', ...alertStackData];
                }
            }
        }
    }

    /* Feature: demo data and debug panel
       ========================================================================== */

    function useDemoData() {
        if (dataset == "short") {
            teamMembers = exampleTeamMembersShort;
            skills = exampleSkillsShort;
            skillMap = exampleSkillMapShort;
        }
        if (dataset == "medium") {
            teamMembers = exampleTeamMembersMedium;
            skills = exampleSkillsMedium;
            skillMap = exampleSkillMapMedium;
        }
        if (dataset == "invalid") {
            teamMembers = exampleTeamMembersInvalid
            skills = exampleSkillsInvalid;
            skillMap = exampleSkillMapInvalid;
        }
        if (dataset == "big") {
            teamMembers = exampleTeamMembersBig
            skills = exampleSkillsBig;
            skillMap = exampleSkillMapBig;
        }
    }

    if (debug) {
        // Use "short" "invalid" "medium" or "big" to quickly load different data sets
        useDemoData("big");
    }


</script>

<style>

    /* General app layout */

    .help-area {
        position: absolute;
        top: 1.2rem;
        right: 1.2rem;
    }

    /* Column layout */

    @media (min-width: 1024px) {

        #columns {
            display: flex;
        }

        #columns > div {
            flex: 1 0 auto;
            padding-right: 20px;
        }

        #columns > div:nth-child(1) { flex: 1 0 20rem; border-right: 1px solid #DDD; margin-right: 2rem; }
        #columns > div:nth-child(2) { flex: 1 0 20rem; border-right: 1px solid #DDD; margin-right: 2rem;  }
        #columns > div:nth-child(3) { flex: 3 1 40rem; padding: 0; }

    }

</style>

<h1>Skilliverse {#if teamName}for {teamName}{/if}</h1>

{#if debug}
    <div id="debug">
        <FormGroupLayout type="horizontal">
            <FormGroup>
                <Label>Team name</Label>
                <Input bind:value="{teamName}" />
            </FormGroup>
            <FormGroup>
                <Label>Dataset</Label>
                <Select id="fieldDataset" bind:value={dataset} changeEvent="{useDemoData}">
                    <option value="big">Big</option>
                    <option value="short">Short</option>
                    <option value="medium" >Medium</option>
                    <option value="invalid">Invalid</option>
                </Select>
            </FormGroup>
            <FormGroup>
                <Label>Full colors set</Label>
                <div class="form-group-controls">
                    {#each chartColors as color}
                        <InputColor style="margin-right: 0.5rem;" bind:value="{color}" />
                    {/each}
                </div>
            </FormGroup>
        </FormGroupLayout>
        <Button on:click={toggleDebug}>Exit debug mode</Button>
    </div>
{/if}

{#if !showHelp}
    <div class="help-area">
        <Button icon="question" on:click={toggleHelp}>Help</Button>
    </div>
{/if}

{#if showHelp && !debug}
    <div style="margin-bottom: 20px;">
        <Blankslate>
            <p>Welcome! Please enter the form below. Please enter the names of your team members and some skills you want to compare. The visualization will only start to make sense once we have some data!</p>
            <ButtonToolbar>
                <Button on:click={useDemoData}>Use demo data</Button>
                <Button on:click={toggleHelp}>Hide this</Button>
                <Button on:click={toggleDebug}>Debug mode</Button>
            </ButtonToolbar>
        </Blankslate>
    </div>
{/if}

<div id="columns">
    <div>
        {#if maxTeamMembersReached}
        <Alert>Hey, the maximum # of team members has been reached.</Alert>
        {/if}
        <h3>Team members</h3>
        <p>Add your team members to the list.</p>
        <form on:submit|preventDefault={addTeamMember}>
            {#if teamMemberAmount > 0}
                <table>
                {#each teamMembers as teamMember, i}
                    <tr>
                        <td><Input type="text" bind:value={teamMember} /></td>
                        <td>
                            <Button icon="delete" layout="icon-only" on:click={() => removeTeamMember(i)}>Delete</Button>
                        </td>
                    </tr>
                {/each}
                </table>
            {:else}
                <Blankslate>No team members yet.</Blankslate>
            {/if}
            <div class="form-group" style="margin-top: 1.2rem;">
                <Label forValue="fieldTeamMemberName">Team member name</Label>
                <Input id="fieldTeamMemberName" type="text" bind:value={newTeamMember} disabled={maxTeamMembersReached} />
                <Button type="submit" icon="add" disabled={!newTeamMember} style="margin-top: 5px;">Add team member</Button>
            </div>
        </form>
    </div>
    <div>
        <h3>Skills</h3>
        <p>Add some skills relevant to your team to the list.</p>
        <form on:submit|preventDefault={addSkill}>
            {#if skillAmount > 0}
                <table>
                    {#each skills as skill, i}
                        <tr>
                            <td><Input type="text" bind:value={skill} /></td>
                            <td>
                                <Button icon="delete" layout="icon-only" on:click={() => removeSkill(i)}>Delete</Button>
                            </td>
                        </tr>
                    {/each}
                </table>
            {:else}
                <Blankslate>No skills yet.</Blankslate>
            {/if}

            <div class="form-group" style="margin-top: 1.2rem;">
                <Label forValue="fieldSkillName">Skill name:</Label>
                <Input id="fieldSkillName" type="text" bind:value={newSkill} />
                <Button type="submit" icon="add" disabled={!newSkill} style="margin-top: 5px;">Add skill</Button>
            </div>

        </form>
    </div>
    <div>
        {#if (!teamMemberAmount == 0 && !skillAmount == 0)}
            {#if skillAmount <= 2 }
                <Blankslate>Please enter at least 3 skills.</Blankslate>
            {:else}
                <Chart chartValues="{skillMap}" skillMaxValue={skillMaxValue} chartColors={chartColors} teamMembers="{teamMembers}" skills="{skills}" />
            {/if}
        {/if}
    </div>
</div>

{#if (!teamMemberAmount == 0 && !skillAmount == 0)}
    {#if (skillAmount >= 3 && teamMemberAmount >= 2)}
        <table class="input-values">
            <tr>
                <th></th>
                {#each skills as skill}
                    <th>
                        {#if skill.length > 20 }
                            <span class="longName">{ skill }</span>
                        {:else}
                            <span>{ skill }</span>
                        {/if}
                    </th>
                {/each}
            </tr>
            {#each skillMap as skillMapRow, i}
                <tr>
                    <td>
                        <InputColor style="margin-right: 0.5rem;" bind:value="{chartColors[i]}" />
                        {teamMembers[i]}
                    </td>
                    {#each skillMapRow as skillMapNumber, i}
                    <td style="text-align: center;">
                        {#if isDesktop}
                        <SkillItem {skillMaxValue} {skillMinValue} bind:rating={skillMapNumber}></SkillItem>
                        {:else}
                        <InputNumber
                            max={skillMaxValue}
                            min={skillMinValue}
                            bind:value={skillMapNumber}
                            classValue={!isValidNumber(skillMapNumber) ? 'invalid' : ''}
                        />
                        {/if}
                    </td>
                    {/each}
                </tr>
            {/each}
        </table>
    {/if}
{/if}

<AlertStack alertStackData={alertStackData}></AlertStack>