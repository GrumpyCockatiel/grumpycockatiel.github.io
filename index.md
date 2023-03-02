---
layout: default
title: Overview
nav_order: 1
---
# The Software Design Process

These pages are hosted in the repo [DesignAutomation.Core](https://github.com/People-Places-Solutions/DesignAutomation.Core) for now. It may move later. You can find them in the `docs` folder.

## Introduction

Successful software starts with proper planning. You would never start constructing a builing without all the proper planning - then why would you do the same for software? Fortuantely, software development is more forgiving and allows for prototyping and refactoring at significantly lower costs that building construction.

## Software Process Document Artifacts

There are dozens of document process artifacts that can be generated before and during the development process.

![Software Process Artifacts](/assets/images/dev-process.jpg)

1. Requirements - what are the actual customer specified requirements. Requirements dictate tasks and their priority.
	* Use initial requirements to seed the project planning and management software
	* Write Stories in the format "As a [Some Role] I want to …"
	* Many requirements are non-functional and should be listed in the beginning so stake owners can understand there is development overhead. e.g. Identity Management
2. Coding Standard (aka Best Practices) - for most environments this can be found on the web and simply recycled
3. Use Case Diagram or User Stories - this is a high level drawing/diagram that shows how various user roles interact with and use the application. The two most common app roles are the end users and the app administrator.
4. Data Models
    * Domain Model - this is a data model depicting the business entities and their relationship. Entities at this level may or may not be concrete - simply logical in nature. An entity represents a single business thingy like a customer or transaction. 
    * Schema Model - this is a concrete physical model of the domain model plus additional metadata that may be necessary. When using a relational DB, this is the physical implementation of the data model aka schema diagram. When using NoSQL DBs this can show the level of normalization vs embedded-ness in each collection.
5. Architecture - this diagram shows how every component is connected to each other from the lowest level data stores up the UI. It includes:
    * Data sources
    * Service layer interfaces
    * Security/Identity Management
    * Interaction with other APIs
    * Clients
6. Interface Definitions
    * This document list all the method signatures between any 2 components especially in an API layer
7. Component Diagrams
    * In terms of SoC - each logical unit of code (method, class, …) is part of a component that creates some functionality (ID Management, Parsing, ORM, etc). Each of these parts need to be at minimum listed out, possibly namespaced (Jacobs.ContentLab.Security) and then show in a flow the inputs and outputs of each component to other components
    * A developer should be able to build any piece with nothing other than what goes in and what comes out. If they have to spin up a full app to add a piece of logic there is a severe design issue.
8. Dependencies
    * A document listing the major 3rd party lib/packages dependencies outside of the core environment that the code uses e.g. Prisma
9. Entity/Class Diagrams
    * A diagram that shows every class or logical entity and its relationships to other entities. Done at a per component level
10. Tech Stack - This document outlines the tech stack used to build the app such as tools, environments, languages, frameworks, data stores, cloud services, etc. Some form of this often included in the SOW contract.
11. UI Screens/Wireframes - drawings of the various user screens
    * Then define what data entity is needed for the screen - what data "binds" to the view. Highlight fields that require 2-way binding.
    * ViewModel
12. Data Integration 
     *  External data integration (if any) may be simple enough to depict in component or other architectural diagram. However, more complex data integration especially those that undergo a transformation need further documentation.
13. Scheduled Tasks and Timing/Sequence diagrams
    * Include a description of scheduled tasks, service accounts and task execution timing if there are any.
    * Use Sequence Digrams to show the order that calls are carried out, what they wait on and when they return with what.
14. Development Standup
    * If you were to hand someone all the code - how can they get it running themselves without breaking any other instance of the app? A new dev on the project should be able to spin-up most projects locally with no help going off the DEV Workspace Setup README
    * Seeing if a new DEV can standup the app with no help is actually a good test for Release Management
        * Do you need to write more install scripts or create an installer
15. Deployment/Release Management - this document outlines how to spin-up a new instance of the app from start to finish. What needs to be installed? What are all the configuration settings?
    * Also document all the various IDs and PWs to each environment. Preferably use a PW keeper.
    * Pipeline Stages : LOCAL -> DEV -> TEST -> STAGE -> PROD
    * What does it take to get to each stage?
    * Access Control on each stage
16. Process/Logic Diagrams - Process driven apps can be the most challenging to build because stake holders rarely truly know their business process end-to-end deterministically. If the app involves more than simply a step interaction with any view e.g. "click to upload document" then it may need a business process diagram. For example, a user adds sites to his project, he then submits the collection of sites to be appraised by a sales rep, the sales rep responds, the user may then want to modify his project, back and forth until the user is satisfied, then the project is submitted to for final approval.
    * Find the example from Slack on their workflow on how it sends out a notification or not
17. Testing
    * How to test the App
    * Test Scripts
18. Recovery and Mitigation
    * When something bad happens how do you deal with it? What's the process?
19. Support and Maintenance
    * All the documentation to support the app once it goes into Production. How do you make changes? What routine maintenance is needed?