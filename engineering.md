---
layout: default
title: Software Engineering
nav_order: 3
---
# Software Engineering

## Abstraction &amp; Interfaces

Always define your concrete classes with an interface. This makes testing and defaults easier. An interface is simply a contract that a concrete class **MUST** implement. A class can implement multiple interfaces but can only derive from a single base class.

```
///<summary>the interface</summary>
public interface IMyDataRepo
{
    DataResult GetSomeData(long ID, string filter);
}

///<summary>a null repo always returns something without being connected to anything</summary>
public class NullDataRepo : IMyDataRepo
{
    DataResult GetSomeData(long ID, string filter);
}

///<summary>Get the data from SQL Server</summary>
public class SQLDataRepo : IMyDataRepo
{
    public string ConnectionString { get; set; }
 
    DataResult GetSomeData(long ID, string filter);
}

///<summary>Get the data from Mongo</summary>
public class MongoDataRepo : IMyDataRepo
{
    public string ConnectionString { get; set; }

    DataResult GetSomeData(long ID, string filter);
}

IMyDataRepo myRepo = (useMongo && isDev) ? new MongoDataRepo() {...} : new NullDataRepo();
myRepo.GetSomeData();
```

## Dependencies

Given a class:

```
public class MyClass
{
    public MyClass() : this(null)
    {}

    public MyClass( MyDataRepo dep )
    {
        this.Repo = dep;
    }

    public MyDataRepo Repo { get; set; }
}
```

Setting the dependency property `Repo` is set "top down" meaning first you must create/have an instance of `MyDataRepo` before setting up `MyClass` otherwise `Repo` will be null - which can return issues unless every use of `Repo` is first checked for a null reference.

Most modern languages no longer permit implicit null references. If you really want a null value have to explicitly say you can have a null value. This is often shown as `string? s = null` which you find in many languages. Inferring a value is fraught with side effects and not suitable for enterprise or commerical code without A LOT of automatic code checking.

An IoC container lets you reverse this control by defining instances that you will use later thereby creating a way to create different implementations based on different startup values (most often the DEV vs PROD environment).

Changing the above to:

```
///<summary>My custom data repo</summary>
public class MyDataRepo : IMyDataRepo
{
    public string ConnectionString { get; set; }

    DataResult GetSomeData(long ID, string filter);
}

public class MyClass
{
    public MyClass() : this(null)
    {}

    public MyClass( IMyDataRepo dep )
    {
        this.Repo = dep;
    }

    public IMyDataRepo Repo { get; set; }
}
```
Now gives us a lot more runtime flexibility of what kind of data repo acutally gets set on the dependency.

## Dependency Injection and Inversion of Control

DI and IoC are one of the most important concepts in software engineering. While there are several 3rd party DI frameworks available such as [Autofac](https://github.com/autofac/Autofac) and [Ninject](https://github.com/ninject/ninject) - the latest versions of .NET have made it more "built-in." All the latest projects templates include DI boilerplate except Console Apps BUT they too can be converted to use DI.

Most DI libraries work in a similar way where you first must register a class or interface (preferably the later) with the container. Classes can be registered with different [lifetime strategies](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.servicelifetime?view=dotnet-plat-ext-7.0) - Singleton, Transient or Scoped (the most difficult to understand since it's meaning can change with context).

When another classes referencing that dependency comes into creation, the container will automatically be searched for a registered type.

## Wrapping 3rd Party Dependencies

The decision to include **ANY** 3rd party dependency into a project should be carefully considered. Most developers are too quick to click the "Add Package" button. Even commerical, company supported frameworks can create issues down the road if their codebase is not upgraded timely enough, the company gets bought and they change the licensing, or you later discover it doesn't have some essential feature you need.

When you include a 3rd party Dependency (Library, Package, Framework, Module, ... ) you should try to wrap it with your own class to minimize references to the 3rd party and insulate yourself against refactoring out one dependency for another. Logging frameworks and ORMs are perfect examples.

```
///<summary>Your Logger Interface</summary>
public interface IMyLogger
{
    bool LogSomething(string message, int logLevel);
}

using NLogger;

public class MyNLogger : IMyLogger
{
    protected NLogger Logger { get; set; }

    bool LogSomething(string message, int logLevel)
    {
        this.Logger.Log(message, (NLogLevel)logLevel );
    }
}

```