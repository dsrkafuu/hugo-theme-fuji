+++
title = "Power Grid as Multilayer Network"
date = 2021-02-14
tags = ["network-infrastructure", "graph-theory"]
math = true
+++

A power grid with multiple voltage levels can be modelled using a multilayer
network. A graph in each layer represents all the cables at the same voltage
level. A directed bipartite for a pair of adjacent layers consists of
transformers connecting two voltage levels.

<!--more-->

`mgrid` provides an interface for modelling power grids and conduct power
system analysis using `pandapower` and `PyPSA`. Though the way to build models
(define buses, and connect them with transformers & cables, ...) is similar,
syntax is very different.

I have wrapped up my 5 months work at Utiligize, and build a package, `mgrid`,
for power system analysis.

## Topology, Element, Snapshot

Here, information for power system analysis is separated into three parts. The
most basic part about a power grid is topology, how buses are connected. A
class based on directed graph model in `networkx` package is used to store such
information. This way, many existing methods and functions in `networkx` can be
utilised directly. Bus is an imaginary concept to enforce Kirchhoff's law.
There is no power loss within any bus. It is not necessary to distinguish buses
as PQ, PV, or slack.

The OpenDSS software ([EPRI2021penDSS](#reference)) divides electrical devices
in power grids into two categories. The most basic one, called delivery
element, has two terminals and moves electricity from one bus to another.
Cables and transformers fit into this category. Any edge in topology
corresponds to one and only one delivery element, and vice versa. The second
category is conversion element, which converts electricity from or to another
energy form. Such devices have only one terminal and must be connected to a
bus. Such categorisation method is applied here.

In `pandapower` or `PyPSA`, different models for cables, for example, are built
using one function (method). There are many optional arguments in such
functions, which can be confusing. In `mgrid`, any element model can be
modelled by a Python class. For example, one-line equivalent model for
poly-phase cables is `mgrid.power_flow.delivery.Cable`, while detailed version
for 3-phase cables is `mgrid.power_flow.delivery.Cable3Phase`. The number of
optional arguments is largely reduced. Though classes are different, for
delivery or conversion elements, methods to add them to a grid are the same.
For example, `Cable.update_pandapower`, `Cable3Phase.update_pandapower`, and
`TransformerStd.update_pandapower` both take a `pandapower` network and two
terminals as arguments. Moreover, how to add element is entirely specified in
`update_pandapower`. This feature makes it easier for users to define their own
class. The function to build a `pandapower` network in `mgrid` will always use
`update_pandapower` to add the element.

The last part takes time-variance into account. One snapshot consists of one
set of nodal injections and one set of voltages. It is assumed that the grid
remains steady state during the period which the snapshot specifies. At least
in power flow calculation, adjacent snapshots do not have an impact. However,
in terms of multiple snapshots, it is beneficial to consider snapshots
together because voltage results from the previous snapshot can be used as
the initial guess, which reduces the number of iterations. Data-frames with
multi-level indices are used to store such information in `mgrid`. That way,
any snapshot or series of results for any bus can be easily cross-sectioned
using
[`pandas.DataFrame.xs`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.xs.html).

## Multilayer Network

There are two kinds of edges in a multilayer network. Any intra-edge can only
exist in a single layer and correspond to cables. Inter-edges connect layers
and correspond to transformers in terms of power grids. Such two kinds of edges
and the correspondence between voltage levels and layers are the two most
useful features.

A multilayer network can be represented in three ways. The first one, with
multiple graphs for different layers and directed bipartites for inter-edges,
is mentioned in the introduction. Then, as introduced in
[bianconi2018multilayer](#reference), supra graph integrates intra-edges in
different layers and inter-edges in one graph. This format is used when
modelling power grids using dedicated power system analysis software. The last
one is called planar graph here, and it contracts inter-edges in the supra
graph. That way, inter-edges, representing transformers, become inter-nodes.
Datasets for power grids are usually structured in this manner because
transformers look like points geographically.

Usually, nodes are replicated in different layers.
[bianconi2018multilayer](#reference) However, here, all the intra-nodes are
unique, and inter-node pairs are distinguished by suffixes, which makes the
supra graph format easier to be derived. This assumption reflects the reality
that buses tend to locate in different geographical points. The disadvantage is
that some algorithms designed for multilayer networks might be inapplicable.

## Distributed External Grids

There are multiple 150-60 kV transformers in some subcomponents, connecting to
external grids. Though their RPIs can be known from DC OPF, one or a set of
them must be chosen as slack bus(es) in AC power flow.

[AC power flow for with distributed
slack](https://pypsa.readthedocs.io/en/latest/power_flow.html#non-linear-power-flow-for-ac-networks-with-distributed-slack)
has been implemented in `PyPSA` only. To use `pandapower`, one and only one
150-60 kV transformer should be chosen as the slack bus. Participation factors
resulted from automatic generation control (AGC) can be used as weights for a
set of buses with generators.

## What if Divergence

For power flow calculation, it is hard to know the reason when the iteration
diverges. To debug, we can divide the grid into smaller parts and calculate
power flow individually. After detecting the part(s) which result(s) in the
divergence, it can be excluded in the original grid. Conversion elements can be
attached to the bus, which represents the excluded part. That way, the
calculation for the grid will converge, and the error is merely the loss along
cables and transformers in the excluded part.

## Voltage Drop

The direct impedance method can be easily used for radial distribution feeders
(RDF) to calculate voltage drops. Then, with the voltage at root known after
power flow for higher voltage levels, voltages can be calculated accordingly.

The nonlinear relationship between complex voltages {{<math "inline">}}
\overline{\boldsymbol{V}} {{</math>}} and PRIs {{<math "inline">}}
\overline{\boldsymbol{I}} {{< /math >}} can be expressed using bus impedance
matrix:
{{<math>}} \begin{aligned}
  \overline{\boldsymbol{V}}
  = \overline{\boldsymbol{Z}} \overline{\boldsymbol{I}}
  + \overline{\boldsymbol{V}}_\text{zero}
\end{aligned} {{</math>}}
where vector {{< math "inline" >}} \overline{\boldsymbol{V}}_\text{zero}
{{</math>}} is for zero-load snapshot.

It might be problematic to apply the direct impedance method for high-voltage
lines, because they should be modelled using one-line equivalent Pi models.
The current loss must be taken into account.

## Reference

- [bianconi2018multilayer] Bianconi, G. (2018). Multilayer networks: structure
  and function. Oxford university press.
- [EPRI2021penDSS] Electric Power Research Institute (2021). OpenDSS: The Open
  Distribution System Simulator. https://sourceforge.net/projects/electricdss/
