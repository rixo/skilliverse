<script>

    // Specific to this app
    import Chart from './Specific/Chart.svelte';
    import SkillItem from './Specific/SkillItem.svelte';

    // Specific to styleguide
    import Sample from './Styleguide/Sample.svelte';
    import Component from './Styleguide/Component.svelte';
    import Toc from './Styleguide/Toc.svelte';

    // General UI
    import Alert from './UI/Alert.svelte';
    import AlertStack from './UI/AlertStack.svelte';
    import Blankslate from './UI/Blankslate.svelte';
    import Box from './UI/Box.svelte';
    import Button from './UI/Button.svelte';
    import ButtonToolbar from './UI/ButtonToolbar.svelte';
    import Content from './UI/Content.svelte';
    import FormGroup from './UI/FormGroup.svelte';
    import FormGroupLayout from './UI/FormGroupLayout.svelte';
    import GridItem from './UI/GridItem.svelte';
    import GridLayout from './UI/GridLayout.svelte';
    import Icon from './UI/Icon.svelte';
    import Input from './UI/Input.svelte';
    import InputColor from './UI/InputColor.svelte';
    import InputColorAlt from './UI/InputColorAlt.svelte';
    import InputNumber from './UI/InputNumber.svelte';
    import Label from './UI/Label.svelte';
    import NavBar from './UI/NavBar.svelte';
    import Panel from './UI/Panel.svelte';
    import PanelBody from './UI/PanelBody.svelte';
    import PanelHeader from './UI/PanelHeader.svelte';
    import PanelRow from './UI/PanelRow.svelte';
    import Select from './UI/Select.svelte';
    import Spacer from './UI/Spacer.svelte';
    import Toolbar from './UI/Toolbar.svelte';
    import ToolbarGroup from './UI/ToolbarGroup.svelte';
    import ToolbarItem from './UI/ToolbarItem.svelte';

    // App state
    let maxTeamMembersReached = false;

    // Limits of the app
    let maxTeamMembers = 8;
    let maxSkills = 8;

    // Settings
    let skillMinValue = 0;
    let skillMaxValue = 5;

    // General
    let debug = false;

    // Styleguide related
    let styleguide = false;
    let generateToc = false;

    // Default data
    let teamMembers = [];
    let skills = [];
    let skillMap = [];
    let dataset;
    let showHelp = false;
    let alertStackData = [];

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

    function toggleStyleguide() {
        styleguide = !styleguide;
        generateToc = !generateToc;
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

    function clearData() {
        teamMembers = [];
        skills = []
        skillMap = [];
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

    // React to window size to change controls for the stepper

    let windowWidth = window.innerWidth;
    let isMobile = false;

    handleResize();

    function handleResize() {
        windowWidth = window.innerWidth;
        if (windowWidth < 1023) {
          isMobile = true
        } else {
          isMobile = false
        }
    }

</script>

<style>

    /* General app layout */
    #styleguide {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 2.4rem;
        background: #FFF;
        z-index: 1;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }

</style>

<svelte:window on:resize={handleResize}/>

<div class="{isMobile ? 'is-mobile' : ''}">

    <NavBar>
        <Toolbar>
            <ToolbarGroup>
                <ToolbarItem>
                    <h1>Skilliverse</h1>
                </ToolbarItem>
            </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarItem>
                        <FormGroupLayout type="inline">
                            <FormGroup>
                                <Label>Load dataset</Label>
                                <Select id="fieldDataset" bind:value={dataset} changeEvent="{useDemoData}">
                                    <option>Choose...</option>
                                    <option value="short">Short</option>
                                    <option value="medium" >Medium</option>
                                    {#if debug}
                                    <option value="big">Big</option>
                                    <option value="invalid">Invalid</option>
                                    {/if}
                                </Select>
                            </FormGroup>
                        </FormGroupLayout>
                    </ToolbarItem>
                    <ToolbarItem>
                        <Button icon="add" on:click={clearData}>New data set</Button>
                    </ToolbarItem>
                    {#if !showHelp}
                        <ToolbarItem>
                            <Button icon="question" on:click={toggleHelp}>Help</Button>
                        </ToolbarItem>
                    {/if}
                    <ToolbarItem>
                        <Button on:click={toggleDebug}>Toggle debug mode</Button>
                    </ToolbarItem>
                    <ToolbarItem>
                        <Button on:click={toggleStyleguide}>Show styleguide</Button>
                    </ToolbarItem>
                    <ToolbarItem>
                        <a href="/svench">Svench</a>
                    </ToolbarItem>
                </ToolbarGroup>

        </Toolbar>
    </NavBar>

    <Spacer>

        {#if debug}
            <Box id="debug">
                <FormGroupLayout type="horizontal">
                    <FormGroup>
                        <Label>Full colors set</Label>
                        <div class="form-group-controls">
                            <Toolbar>
                                <ToolbarGroup>
                                    {#each chartColors as color}
                                        <ToolbarItem>
                                            <InputColor bind:value="{color}" />
                                        </ToolbarItem>
                                    {/each}
                                </ToolbarGroup>
                            </Toolbar>
                        </div>
                    </FormGroup>
                </FormGroupLayout>
            </Box>
        {/if}

        {#if showHelp}
            <Box>
                <Content>
                    <p>Welcome! Please enter the form below. Please enter the names of your team members and some skills you want to compare. The visualization will only start to make sense once we have some data!</p>
                </Content>
                <ButtonToolbar>
                    <Button on:click={toggleHelp}>Hide this</Button>
                    <Button on:click={toggleDebug}>Debug mode</Button>
                </ButtonToolbar>
            </Box>
        {/if}

        <PanelRow>
            <Panel nopad ghost>
                <PanelHeader title="Team Members" />
                <PanelBody>
                    {#if maxTeamMembersReached}
                        <Alert type="error" dismissible>Hey, the maximum # of team members has been reached.</Alert>
                    {/if}

                    <Content>
                        <p>Add your team members to the list.</p>
                    </Content>

                    <form on:submit|preventDefault={addTeamMember}>
                        {#if teamMemberAmount > 0}
                            <table class="multi-adder">
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
                </PanelBody>
            </Panel>
            <Panel nopad ghost>
                <PanelHeader title="Skills" />
                <PanelBody>

                    <Content>
                        <p>Add some skills relevant to your team to the list.</p>
                    </Content>

                    <form on:submit|preventDefault={addSkill}>
                        {#if skillAmount > 0}
                            <table class="multi-adder">
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
                </PanelBody>
            </Panel>
            {#if (!teamMemberAmount == 0 && !skillAmount == 0)}
                {#if skillAmount > 2 && teamMemberAmount > 1 }
                    <Panel ghost>
                        <PanelBody>
                            <Chart chartValues="{skillMap}" skillMaxValue={skillMaxValue} chartColors={chartColors} teamMembers="{teamMembers}" skills="{skills}" />
                        </PanelBody>
                    </Panel>
                {/if}
            {/if}
        </PanelRow>

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
                                <SkillItem {skillMaxValue} {skillMinValue} bind:rating={skillMapNumber}></SkillItem>
                            </td>
                            {/each}
                        </tr>
                    {/each}
                </table>
            {/if}
        {/if}

    </Spacer>
</div>

<AlertStack alertStackData={alertStackData}></AlertStack>

{#if styleguide}
    <div id="styleguide" class="content">
        <GridLayout>
            <GridItem>
                <Button icon="close" on:click={toggleStyleguide}>Close styleguide</Button>
                <Spacer side="top">
                    <Toc {generateToc} />
                </Spacer>
            </GridItem>
            <GridItem>
                <h1>Styleguide</h1>

                <div id="components">

                    <Component>

                        <h2>Alerts</h2>

                        <h3>Skins</h3>
                        <h4>Default</h4>
                        <Sample>
                            <Alert>I am a default alert.</Alert>
                        </Sample>
                        <h4>Error</h4>
                        <Sample>
                            <Alert type="error">I am an error message.</Alert>
                        </Sample>
                        <h4>Success</h4>
                        <Sample>
                            <Alert type="success">I am a success message.</Alert>
                        </Sample>

                        <h3>Types</h3>
                        <h4>Normal</h4>
                        <Sample>
                            <Alert>Hey, I don't have any options.</Alert>
                        </Sample>
                        <h4>Dismissible</h4>
                        <Sample>
                            <Alert dismissible>Hey, I am dismissible.</Alert>
                        </Sample>
                    </Component>


                    <Component>
                        <h2>Buttons</h2>
                        <h3>Types</h3>
                        <h4>Icon only</h4>
                        <Sample>
                            <Button icon="close" layout="icon-only">Close</Button>
                        </Sample>
                        <h4>Icon and label</h4>
                        <Sample>
                            <Button icon="close">Close</Button>
                            <Button icon="add">Add</Button>
                            <Button icon="remove">Remove</Button>
                            <Button icon="delete">Delete</Button>
                            <Button icon="question">Help</Button>
                        </Sample>
                    </Component>

                    <Component>

                        <h2>Inputs</h2>

                        <h3>Text</h3>

                        <Sample>
                            <Input value="Test" />
                        </Sample>

                        <h3>Color</h3>
                        <Sample>
                            <InputColor value="#FF0000" />
                        </Sample>

                    </Component>

                    <Component>

                        <h2>Box</h2>
                        <Sample>
                            <Box>I am a box.</Box>
                        </Sample>

                    </Component>

                    <Component>
                        <h2>Blank slate</h2>
                        <Sample>
                            <Blankslate>I am a blank slate. Use me when no content is available.</Blankslate>
                        </Sample>
                    </Component>

                    <Component>
                        <h2>Panels</h2>
                        <p>Use panels to easily create layouts.</p>
                        <Sample>
                            <Panel>
                                <PanelHeader title="Panel header" />
                                <PanelBody>
                                    <p>I am HTML content.</p>
                                </PanelBody>
                            </Panel>
                        </Sample>
                        <Sample>
                            <PanelRow panelCount="2'">
                                <Panel>
                                    <PanelHeader title="Panel header" />
                                    <PanelBody>
                                        <p>I am HTML content.</p>
                                    </PanelBody>
                                </Panel>
                                <Panel>
                                    <PanelHeader title="Panel header" />
                                    <PanelBody>
                                        <p>I am HTML content.</p>
                                    </PanelBody>
                                </Panel>
                            </PanelRow>
                        </Sample>
                        <Sample>
                            <PanelRow>
                                <Panel>
                                    <PanelHeader title="Panel header" />
                                    <PanelBody>
                                        <p>I am HTML content.</p>
                                    </PanelBody>
                                </Panel>
                                <Panel>
                                    <PanelHeader title="Panel header" />
                                    <PanelBody>
                                        <p>I am HTML content.</p>
                                    </PanelBody>
                                </Panel>
                                <Panel>
                                    <PanelHeader title="Panel header" />
                                    <PanelBody>
                                        <p>I am HTML content.</p>
                                    </PanelBody>
                                </Panel>
                            </PanelRow>
                        </Sample>
                    </Component>

                    <Component>
                        <h2>Form group</h2>
                        <h3>Standard</h3>
                        <Sample>
                            <FormGroupLayout>
                                <FormGroup>
                                    <Label>Field name</Label>
                                    <Input value="Value" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Field name</Label>
                                    <Input value="Value" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Field name</Label>
                                    <Input value="Value" />
                                </FormGroup>
                            </FormGroupLayout>
                        </Sample>

                        <h3>Horizontal</h3>
                        <Sample>
                            <FormGroupLayout type="horizontal">
                                <FormGroup>
                                    <Label>Field name</Label>
                                    <Input value="Value" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Field name</Label>
                                    <Input value="Value" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Field name</Label>
                                    <Input value="Value" />
                                </FormGroup>
                            </FormGroupLayout>
                        </Sample>
                    </Component>

                    <Component>

                        <h2>Pickers</h2>

                        <h3>Single option</h3>

                        <Sample>
                            <Select>
                                <option value="value-1">Value 1</option>
                                <option value="value-2">Value 2</option>
                                <option value="value-3">Value 3</option>
                            </Select>
                        </Sample>

                    </Component>

                    <Component>
                        <h2>Icons</h2>
                        <Sample>
                            <Icon icon="close" />
                            <Icon icon="add" />
                            <Icon icon="remove" />
                            <Icon icon="delete" />
                            <Icon icon="question" />
                        </Sample>
                    </Component>

                </div>
            </GridItem>
        </GridLayout>


    </div>
{/if}
