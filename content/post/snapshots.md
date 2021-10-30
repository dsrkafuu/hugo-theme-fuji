+++
title = "Snapshots for a Graph in Database"
date = 2021-04-05
tags = ["data-structure", "network-infrastructure", "version-control"]
+++

A data structure to store, modify, query temporal evolutions and subgraphs of
some graph is proposed in this post, in order to handle issues discussed in the
previous post, [relational database not for power
grids](https://edxu96.github.io/post/relational-db/). There are more benefits.

<!--more-->

The core ingredient, snapshot, is discussed in detail first, and how multiple
snapshots for one graph are store is introduced in two sections,
[increment](#increment) and [meta-graph](#meta-graph). The modification of the
graph can be based on transactions, which is discussed in section
[transaction](#transaction). A better place to store such data values is a
database, and how a relational database design might look like is discussed.
Lastly, a new concept, secondary snapshot, is brought up to generalise the idea
for attributes of edges and nodes.

I am assuming we are on the same page in terms of:

- Basic concepts in graph theory, like simple graph, bipartite, tree.
  [[bondy2008graph](#references)]
- Basic knowledge about relational databases.
  [[postgresql2021documentation](#references)]
- Basic knowledge about data abstraction. [section 1.2 in
  [sedgewick2014algorithms](#references)]
- Basic knowledge about version control. [section 1.1 in
  [chacon2014pro](#references)]

For those behind, the links mentioned above are good starting points. The last
page should be:

- How to store changes of a simple graph in an incremental manner.
- How the snapshot concept contributes to storage, version control, query, etc
  of graphs.

Note that all the graphs discussed here are simple graphs without any node or
edge attribute. Furthermore, the node is not the primary concern.

## Snapshot

At Utiligize, we stored the topology of power grids in a relational database. I
found some queries were very popular:

- Query the whole graph.
- Query the whole graph and calculate a subgraph.
- Query the whole graph and modify it.
- Modify the graph.

Most representations assume that there is no further update. For example, in
`pandapower`, values can only be found via indices and updated accordingly. A
data structure is discussed here, so the modification is a first class
passenger as well. Besides, to represent the temporal evolution of some graph
as a series of snapshots [section 4.1.2 in [masuda2021guide](#references)] is
one of the many applications of the snapshot concept. There are at least two
other applications:

- A snapshot can store a subgraph from some query.
- A set of snapshots can represents some neighbours of the graph in terms of
  topology.

That is, the snapshot concept can not only be used in version control, but also
served as the core in storing, modification, and query. The program should
revolve around a set of associated snapshots.

## Increment

To store snapshots as individual graphs requires lots of memory space. For
example, to treat snapshots as different layers and connect related layers with
bipartites. [section 5.2 in [bianconi2018multilayer](#references)]. Instead,
given a graph and its differences between another unknown graph, the unknown
can be computed accordingly, so the space required can be largely reduced,
especially when such two graphs are similar. Those differences can be wrapped
in one concept, __increment__. A way to store and utilise increments for
snapshots of graphs is discussed here.

### Event

As discussed before, the graph can always be seen as a set of two-entry tuples
(edge-list), when no isolated node is present. Then, any modification to a
graph can be seen as some state change(s) of some edge(s), and it can also be
represented by a two-entry tuple, indicating which edge is modified. In
particular, the only two fundamental modification is to add an edge or to
delete an edge. Such modification can be seen as an __event__. Thus, a graph, a
snapshot or an increment can be seen as a set of events.

The concept of event can be interpreted as follows. It is assumed that there
are two possible states, `on` and `off`, for any edge. The default state is
`off`. An event associated with snapshot `s` in terms of edge `(u, v)` can be
represented by a three-entry tuple,  `(u, v, s)`. Note that the definition here
is different from that in [masuda2021guide](#references).

### Link

Which snapshot the increment is based on must be specified, though the
relationship can be modified later. This relationship will be called __link__
here. For example, if there are three graphs represented by `a`, `b` and `c`,
`a` can be derived from its increment linked to `b` or its increment linked to
`c`. The derivation must be based on the linked graph, of course, as discussed
before.

Multiple links are allowed, because the size of some increment might be reduced
further. To follow the previous example, `a` can be linked to `b` and `c`, and
the size of the corresponding increment might be reduced further.

### Symmetric Difference

The only mathematical operation required for calculating increments and
recovering snapshots is symmetric difference. From
[wikipedia2021symmetric](#references):

> In mathematics, the symmetric difference of two sets, also known as the
> disjunctive union, is the set of elements which are in either of the sets,
> but not in their intersection.

For example:

```
{a, b} △ {b, c} = {a, c}
{a, b} △ {b, c} △ {c, d} = {a, d}
```

The second example indicates that the operation can be generalised to
successive symmetric differences of a series of sets. The sequence of such sets
does not matter. This generalised version can be applied when such sets are
found via a concept brought up in the section.

## Meta-Graph

Several snapshots and corresponding links compose a directed graph when
snapshots and links are considered as nodes and edges respectively. That graph
will be called meta-graph. The directions of links do not matter, as long as
they are consistent. For example, to direct out of the snapshot. Then,
according to the definition above, meta-graph is a directed acyclic graph (a
directed graph without __directed cycle__).

The definition of directed cycle follows that in
[sedgewick2020algorithms](#references):

> A directed path in a digraph is a sequence of vertices in which there is a
> (directed) edge pointing from each vertex in the sequence to its successor in
> the sequence, with no repeated edges. A directed cycle is a directed path
> (with at least one edge) whose first and last vertices are the same.

Such concept is similar to that in version control
[[wikipedia2021version](#references)] when commits and merges are considered as
nodes.

### Recover Snapshot

The increments of all the parents of a given snapshot compose those sets for
symmetric difference.

### Power Flow Timeline

A power flow timeline is an __undirected path__ of the meta-graph and a
starting snapshot, which must be one of the two terminals of the path. The
power flow calculation starts with the starting snapshot and use the voltage
result of the precedent snapshot as the initial guess, which can speed up the
calculation to a large extent.

Dedicated statements can be designed to build a timeline in a higher
abstraction level.

### Automated Debug in PF

The algorithms for power flow are very sensitive to errors in the grid model.
The software can provide some procedure modifying the timeline automatically,
in order to debug such errors.

## Transaction

Being immutable is a main feature of snapshots. A mechanism should be designed
to allow modifications before the snapshot becomes immutable. The idea of
transaction comes from relational database. The beginning of a transaction is
to provide a graph object that the user can work on.

Though this mechanism based on transactions is similar to that in most
relational databases, the terminologies do not correspond.

### Pending Snapshot

All the events in the increment for the pending snapshot can be previewed. Note
that any modification is made to a snapshot, but the snapshot is stored in the
form of increment.

It's possible to have multiple pending snapshots. Then any user or several
users can work on multiple pending snapshots at the same time. When it comes to
storage, pending snapshots are written in the database as well, but still
mutable.

Multiple (committed) snapshots can be specified when a pending snapshot is
initiated. However, the initiated snapshot is calculated via successive
symmetric differences of associated increments.

While other pending snapshots are invisible, committed snapshots resulted from
other transactions are visible immediately in the current transaction. This
setting is adopted in most relational database systems like `PostgreSQL`
[[postgresql2021transactions](#references)] (Note that terminologies are
different, while the idea is shared, as discussed before).

### Commit

The link can only be associated with committed snapshots. The link(s) can be
modified later, in order to, for example, reduce the size of the increment.
Whenever a snapshot is to be deleted, no other snapshot should be based on it.

### Replacement

There are many algorithms designed for graphs. For example, a pending snapshot
can be converted to an `networkx` object and modified via algorithms in
`networkx`. That is, it is more convenient not to write snapshot using
traditional SQL queries. After some modifications, the pending snapshot can be
replaced entirely by the `networks` object.

The prototypical workflow of an transaction can be summarised as follows:

1. Obtain an `networkx` object representing a pending snapshot by specifying
   linked snapshots.
2. Modify the pending snapshot using functions in `networkx`.
3. Replace the pending snapshot in the database with the modified one.
4. Commit the snapshot.

Also, because multiple pending snapshots are allowed. The steps 1-3 can be done
simultaneously for different pending snapshots, and one user can work on
different pending snapshots simultaneously. Furthermore, as discussed in
[subsection link](#link), links can be modified later as long as they point to
committed snapshots.

## Secondary Snapshot

Second snapshots is a concept to store evolutions of attributes of edges and
nodes, and its topology remains unchanged. It is recommended that attributes
associated with some edge are stored in one object. For node attributes, they
can be stored in objects attached to the node. The advantages have been
discussed in another post, [relational database not for power
girds](https://edxu96.github.io/post/relational-db/#object-relational-mismatch).
Detailed discussion about objects when modelling power grids can be found in
post, [power grid as multilayer
network](https://edxu96.github.io/post/power-flow/#object-relational-mismatch/#topology-element-snapshot).

The concept of power flow timelines can be generalised for secondary snapshots.

## References

- Bianconi, G. (2018). Multilayer networks: structure and function. Oxford
  university press.
- Bondy, J. A., & Murty, U. S. R. (2008). Graph Theory. Springer.
- Chacon, S., & Straub, B. (2014). Pro Git. Retrieved 10:16, April 2, 2021,
  from https://git-scm.com/book/en/v2
- Masuda, N., & Lambiotte, R. (2021). A Guide To Temporal Networks. World
  Scientific.
- PostgreSQL. (2021). Documentation. Retrieved 09:14, April 5, 2021, from
  https://www.postgresql.org/docs/current/tutorial-transactions.html
- PostgreSQL. (2021). Transactions, Documentation. Retrieved 09:14, April 5,
  2021, from https://www.postgresql.org/docs/current/tutorial-transactions.html
- Sedgewick, R., & Wayne, K. (2014). Algorithms. Princeton University.
  https://algs4.cs.princeton.edu/home/
- Wikipedia contributors. (2021, March 20). Symmetric difference. In Wikipedia,
  The Free Encyclopedia. Retrieved 15:46, April 2, 2021, from
  https://en.wikipedia.org/w/index.php?title=Symmetric_difference&oldid=1013286130
- Wikipedia contributors. (2021). Version control. In Wikipedia, The Free
  Encyclopedia. Retrieved 18:23, March 30, 2021, from
  https://en.wikipedia.org/w/index.php?title=Version_control&oldid=1014843465
