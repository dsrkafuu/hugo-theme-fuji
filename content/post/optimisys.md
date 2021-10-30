+++
title = "Automatic Differentiation to improve system of eq."
date = 2021-05-16
tags = ["auto-diff", "sys-of-eq", "non-linear"]
draft = true
+++

## System of Non-linear Equations

The solve this system to non-linear equations: `f(x) = 0`. Though it looks like
a set of equality constraints, but such equations must be solved at the same
time. There are four methods designed to do that task.

### Direct Method

### Iterative Method

## Constraint on Resulted Variable

`y = g(x)`

## AutoDiff for the Whole Procedure

```Python
def procedure(f, y_hat)
    sys_eq = f == 0
    x = solve(sys_eq)
    y = g(x)
    return abs(y - y_hat)
```

### Sensitivity Matrix

## Constraint Satisfaction

The overall procedure for constraint satisfaction is different from that of the
root finding, which is to satisfy all the equality constraints at the same
time.

### Autonomous Move

The procedure can come with some check.

It's better to put changes in an objective function.

## Example

### Best Guess of Unknown Injections

`vm_unknown` can be optimised, in order to make resulted `p` as close to
`p_known` as possible. The root finding of the following function can be
executed.

```Python
def cal_mismatch(vm_unknown, f, p_known, vm_known)
    sys_eq = f(vm_known, vm_unknown) == 0
    p = solve(sys_eq)
    return mismatch(p, p_known)
```
