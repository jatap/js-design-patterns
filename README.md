# JavaScript Design Patterns

Based on [ES6](http://es6-features.org).

## Table of Contents
- [Creational](#creational)
    - [Abstract Factory](#abstract-factory)
    - [Builder](#builder)
    - [Factory Method](#factory-method)
    - [Object Pool](#object-pool)
    - [Prototype](#prototype)
    - [Singleton](#singleton)
- [Structural](#structural)
    - [Adapter](#adapter)
    - [Bridge](#bridge)
    - [Composite](#composite)
    - [Decorator](#decorator)
    - [Facade](#facade)
    - [Flyweight](#flyweight)
    - [Private Class Data](#private-class-data)
    - [Proxy](#proxy)
- [Behavioral](#behavioral)
    - [Chain of responsibility](#chain-of-responsibility)
    - [Command](#command)
    - [Interpreter](#interpreter)
    - [Iterator](#iterator)
    - [Mediator](#mediator)
    - [Memento](#memento)
    - [Null Object](#null-object)
    - [Observer](#observer)
    - [State](#state)
    - [Strategy](#strategy)
    - [Template method](#template-method)
    - [Visitor](#visitor)
- [References](#references)

## Creational

These design patterns are all about class instantiation. This pattern can be further divided into class-creation patterns and object-creational patterns. While class-creation patterns use inheritance effectively in the instantiation process, object-creation patterns use delegation effectively to get the job done.

### Abstract Factory

Creates an instance of several families of classes

### Builder

Separates object construction from its representation

### Factory Method

Creates an instance of several derived classes

- [Example](src/creational/factory.js)
- [Test](src/creational/__tests__/factory.test.js)

### Object Pool

Avoid expensive acquisition and release of resources by recycling objects that are no longer in use

### Prototype

A fully initialized instance to be copied or cloned

- [Example](src/creational/prototype.js)
- [Test](src/creational/__tests__/prototype.test.js)

### Singleton

A class of which only a single instance can exist

## Structural

These design patterns are all about Class and Object composition. Structural class-creation patterns use inheritance to compose interfaces. Structural object-patterns define ways to compose objects to obtain new functionality.

### Adapter

Match interfaces of different classes

- [Example](src/structural/adapter.js)
- [Test](src/structural/__tests__/adapter.test.js)

### Bridge

Separates an object’s interface from its implementation

### Composite

A tree structure of simple and composite objects

### Decorator

Add responsibilities to objects dynamically

### Facade

A single class that represents an entire subsystem

### Flyweight

A fine-grained instance used for efficient sharing

### Private Class Data

Restricts accessor/mutator access

### Proxy

- [Example](src/structural/proxy.js)
- [Test](src/structural/__tests__/proxy.test.js)

An object representing another object

## Behavioral

These design patterns are all about Class's objects communication. Behavioral patterns are those patterns that are most specifically concerned with communication between objects.

### Chain of responsibility

A way of passing a request between a chain of objects

### Command

Encapsulate a command request as an object

### Interpreter

A way to include language elements in a program

### Iterator

Sequentially access the elements of a collection

### Mediator

Defines simplified communication between classes

### Memento

Capture and restore an object's internal state

### Null Object

Designed to act as a default value of an object

### Observer

A way of notifying change to a number of classes

### State

Alter an object's behavior when its state changes

### Strategy

Encapsulates an algorithm inside a class

### Template method

Defer the exact steps of an algorithm to a subclass

### Visitor

Defines a new operation to a class without change

## References

- https://sourcemaking.com/
- https://www.dofactory.com/javascript/design-patterns
