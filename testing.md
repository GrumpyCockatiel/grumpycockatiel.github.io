---
layout: default
title: Testing
nav_order: 4
---
# Testing

When automated testing is setup correctly - it minimizes manual testing, reduces time to test and increases code quality all with fewer FTEs.

Test Coverage starts with Unit Tests. As each layer of the Test Pyramid achieves "Complete Coverage", then less testing is required on the next level.

![Always Copy](/assets/images/test-pyramid.jpg)

Manual UATs **ARE NOT** an effective test strategy.

## Unit Tests

Typically you have one Unit Test Class per Logical Class. The methods in the Unit Tests test the logic of the class. Complete coverage means testing representatives of all the input paramaters. For example, if you have a method like:

```
public bool DomeSomething(string input) {...}
```

Then you might have Unit Tets with a null input, empty string input, an input you might expect, an input you might not expect, etc. As you can see complete coverage grows exponentially with methods and parameters so it's judgement to how many tests is enough.

Unit Tets are run and check automatically upon checkin using `dotnet test ...`

## Integration Tests

Integration tests are setup as MSTest Class but loading configuation data to the systems to be tested (e.g. SQL DB Connection string). These details should not be saved in the repo as they may contain sensitive info. Therefore, you need to create your own local `appsettings.json` file at the root of the `DesignAutomation.Core.Tests` Project.

The structure of your file should look like:

```
{
    "Scaffold": {
        "BlobConnectionStr": "My_Azure_Storage_Connection_String",
        ...
    }
}

```

You also need to set the properties on this file to **Copy Always**

![Always Copy](/assets/images/alwayscopy.png)
