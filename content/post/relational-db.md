+++
title = "Relational Database not for Power Grids"
date = 2021-03-13
tags = ["network-infrastructure", "database"]
+++

After my 5-month part-time job at Utiligize, I begin to understand the problems
in incumbent open-sourced tools for power system analysis.

<!--more-->

Take `pandapower` for example, an empty network object is essentially an empty
relational database with a pre-defined schema. There are three major flaws in
terms of relational model for power grids, which are discussed in detail. The
last two sections mention document-based databases and snapshots briefly.

I am assuming we are on the same page in terms of:

- Some Python packages, like `pandapower`, `PyPSA`, `networkx`, and
  `matplotlib`.
- Relational database, like [PostgreSQL](https://www.postgresql.org/).
- Object-oriented programming. For example, [classes in Python,
  docs.python.org](https://docs.python.org/3/tutorial/classes.html).
- Graph theory. [[bondy2008graph](#references)]
- Concepts like buses, elements, snapshots, etc discussed in the [Power Grid as
  Multilayer Network](https://edxu96.github.io/post/power-fow/) post.
- Basics of graph databases, like [Neo4j](https://neo4j.com/), and
  document-based databases, like [MongoDB](https://www.mongodb.com/).

For those behind, the links mentioned above are good starting points. The last
page should be:

- Why I dislike incumbent open-sourced tools for power system analysis.
- Why relational model should not be used to model power grids.

## Many-to-Many Relation

The only normalised column in the schema of `pandapower` is for buses. Usually,
all the tables, except that for buses used the key for buses as the only
foreign key. In particular, tables for delivery elements like cables and
transformers have two columns for buses, because they have two and only two
terminals. Actually, such relation is many-to-many, but there is no
intermediary table to model it. As discussed above, the purpose is to reduce
the number of tables. However, it becomes very hard to query associated
elements given a bus.

## In-Memory Operations

Lots of graph-related operations are required. For example, the return of the
corresponding subgraph for a particular voltage level is very important. It
[can be done using in
`pandapower`](https://pandapower.readthedocs.io/en/stable/topology.html), but
an `networkx` object must be built first. Such idea is actually required before
building a `pandapower` object, which is discussed in the following subsection.
In contrast, it's easier (and maybe more efficient) to do that with a graph
database like [Neo4j](https://neo4j.com/).

Also, to store some query results is a good idea, so that to execute the query
multiple times is avoided. However, there are some pitfalls, if, for example,
they are dumped in CSV files:

- It takes too much space.
- Hard to keep track of such files, especially when multiple files result from
  one query.
- New queries to read such files are required.
- Hard to update the result if the original grid is modified.

Another motivation is that to read the whole grid and plot (even part of) it in
a map using packages like `matplotlib` requires too much computing resource.
Furthermore, as far as I know, there is no package in Python that can handle
the interactive view of a large grid in a map. To inspect the grid
interactively helps a lot in debugging and preparing queries.

## Different Schemas

The biggest challenge we face at Utiligize was that the schema used in our
clients' database was different from that in `pandapower` and other tools. In
particular, transformers should be associated with two buses, but were
represented as a point from the geographical perspective. We stored tables from
our clients in one database. My colleagues maintained two sets of tables for
two schemas manually. There is no built-in tools in incumbent packages, so they
had to write their own queries. From time to time, some clients modified their
data by sending new excel files. Then, my colleagues updated the tables
involved. Though it seems that the transformation (by modifying strings) to the
schema of `pandapower` is not hard, I found a major bug around October, 2020.
It's hard to take all kinds of situations into consideration in string
modification.

Since then, I had never been sure about that transformation, so I wrote
[edxu96/mgrid (v0.2.0)](https://github.com/edxu96/mgrid/releases/tag/v0.2.0),
which builds a `networkx` direct graph and then do an operation call vertex
splitting. There is only one situation (to categorise associated edges into two
layers), so some unit tests are enough. Furthermore, a concept called
multilayer network can be used to handle such issues in general.
[[bianconi2018multilayer](#references)] It's discussed in another post, [Power
Grid as Multilayer Network](https://edxu96.github.io/post/power-fow/), in
detail. Though the process was slowed down a bit, I didn't have to worry about
updating tables in the second schema.

## Object-Relational Mismatch

Another big problem is inherent in `pandapower`, `PyPSA`, and `matpower`, etc.
All of them are initially designed for power flow calculation (PF) and optimal
power flow optimisation (OPF) of transmission grids. As mentioned before, how
parameters are stored is similar to a relational database. However, there are
two reasons why this way is problematic.

Firstly, the sets of parameters used in PF, in OPF and for different devices
are quite different. Such issue is resolved in two ways for the time being, as
far as I know. Firstly, there are tables corresponding to different types of
electrical devices. Most of the tables are not involved because, in reality,
nodal injections are usually given in PF, so the most important tables are for
buses, cables, transformers, loads, and generators. Then, the second way is to
generalise such tables, because it is more confusing to have a table for loads
in PF, one for loads in unbalanced PF, one for loads in OPF, etc. However, such
generalisation results in lots of NaN values, because only a small portion of
columns are involved in PF.

Furthermore, pre-defined functions (imagine SQL queries) to insert and modify
records are very confusing because of too many optional arguments. Even worse,
there is only [one method `add` in `Network`
class](https://pypsa.readthedocs.io/en/latest/api_reference.html#pypsa.Network.add)
in `PyPSA`. The user has to memorise combinations of keyword arguments
themselves.

The second reason is resulted from the fact that models for transmission grids
are different from those for distribution grids (for example, 400 V). With
further penetration of electric vehicles and solar panels, constraints on
voltages and loadings of low-voltage distribution grids are more likely to be
violated. The features for distribution grids have been gradually introduced.
However, the set of parameters required for the same type of electric devices
can be quite different from that in transmission grids. For example, to support
unbalanced PF in `pandapower`, [two tables, `res_line` and
`res_line_3ph`](https://pandapower.readthedocs.io/en/stable/elements/line.html#result-parameters),
are required for storing results. When PF and unbalanced PF are required for
two parts in the same grid, two `pandapower` objects are required. There is no
tool capable of handling balanced and unbalanced grids at the same time.

I believe, this shortcoming is largely resulted from the object-relational
mismatch in relational database and object-oriented programming (OOP), which is
discussed in the second chapter of [[kleppmann2017designing](#references)].
Additionally, it is impossible to store a network model in one (CSV) file. This
shortcoming seems to be the main motivation behind document model for power
system models, and it is discussed in the following section.

## Document-Based Database

Actually, OOP can help a lot when modelling power grids, and document model has
been proposed. For example, see
[`PowerModels.jl`](https://lanl-ansi.github.io/PowerModels.jl/stable/) and
[`PowerSystems.jl`](https://www.nrel.gov/analysis/siip.html). It is very easy
to dump a model in one JSON file. However, one the hardest part, to transform
data in another database schema, is never mentioned, and there is no function
to insert element.

Furthermore, the many-to-many relationship and graph-related operations are
still not fully supported. The whole grid has to be read in memory first. These
are among the inherent disadvantages of document-based databases.

## Snapshot

Though it is easy to store time series in relational model, PF for multiple
snapshots is very problematic in tools discussed above. For example, in
`pandapower`, which time series to be stored must be specified and results can
only be stored in CSV files.

The concept of snapshot is vital in PF and OPF. To use voltage results from the
consecutive snapshot can largely reduce the number of iterations. For example,
voltage magnitude results can be passed as [`init_vm_pu` argument in
`pandapower`](https://pandapower.readthedocs.io/en/stable/powerflow/ac.html).
However, at least in `pandapower`, values are updated in different snapshot,
based on [specified data and
"controller"](https://pandapower.readthedocs.io/en/stable/timeseries.html),
which I think is really confusing and hard to be used.

## Conclusion

There are issues in different levels when storing power grid models in
relational databases. The most obvious one is that the many-to-many
relationship between buses and electric devices is usually missing. Then lots
of operations, like to select part of the grid, must be done by reading the
grid in memory first and relying on other graph theoretic packages, which is
very inefficient and fallible. The biggest issue is probably to transform the
raw data in a different schema in the first place. Moreover, raw datasets are
usually updated from time to time.

The inherent issue is the mismatch between object-oriented programming and
relational databases. A compromise used to be worked out, but there are more
and more classes for electric devices involved. This issue must be dealt with
by introducing document models. However, document databases are still
unable to cope with the first three issues for the moment.

## References

- Bianconi, G. (2018). Multilayer networks: structure and function. Oxford
  university press.
- Kleppmann, M. (2017). Designing data-intensive applications: The big ideas
  behind reliable, scalable, and maintainable systems. " O'Reilly Media, Inc.".
- Bondy, J. A., & Murty, U. S. R. (2008). Graph Theory. Springer.

---

- On Mar 14, 2021, prerequisites and expectations were added in the beginning.
- On April 16, 2021, the sequence of sentences in the [Different
  Schemas](#different-schemas) section was updated.
- On April 18, 2021, a new section, [Conclusion](#conclusion), was added, and
  the sequence of other sections was modified.
- On April 19, 2021, the section [In-Memory Operations](#in-memory-operations)
  was finished for the first time.
