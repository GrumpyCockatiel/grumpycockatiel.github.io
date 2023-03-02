---
layout: default
title: Data Modeling
nav_order: 2
---
# Data Modeling

An application's data model may be the single most important document artifact created. A logical data model is not a schema dump since the app may use multiple physical data stores including file shares, APIs, Data Lakes, etc.
Even the simplest of apps can benefit from a data model on a napkin. I once built an app with 4 entities, later added a couple more and had to do a complete refactor on the data layer that had I spent a couple hours on the model could have been prevented.

Start by brainstorming the Domain's major entities (patient, exam, facility, …) and placing them on the model.
Next define the properties entities need (name, DOB, lat/long, updated) including data types.
Finally, define relationships in the model (patients are admitted to facilities)

Data Model can be very complex with lots of advanced notation. Don't obsess over trying to capture all the details in the first pass. Getting all the entities down and their relationships is most important. Once you have relationships you can more easily define cardinality (a patient can have 0 to infinite physicians).

The data model can then be translated into physical data store which could just be hard coded data in objects to begin with.

The data model defines the classes and their abstractions as well as collections held by those classes.
If a data model is very small - the entire thing may be simple loaded into memory and saved when changes are made (this is basically any document type).

The data model also defines the operations that can be performed on it. A bad app permits CRUD across the entire data model. This segues into the Data Layer Interface.

![An image from Data Storage](/assets/images/data-model.png)

![An image from Data Storage](/assets/images/class-diagram.png)