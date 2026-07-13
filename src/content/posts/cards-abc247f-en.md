---
title: Cards (ABC 247 F)
published: 2022-04-29
description: Lucas numbers + Union-Find, solving a cycle-cover counting problem.
tags: [Algorithms, Lucas Numbers, Union-Find, Graph Theory]
category: Algorithms
draft: false
lang: en
---

[AtCoder - abc247_f](https://vjudge.net/problem/AtCoder-abc247_f/origin)

### Problem Summary

> You have $N$ cards. Each card has two sides — the front shows a number $P_i$ and the back shows $Q_i$. Both sequences $P$ and $Q$ are permutations of $(1, 2, \dots, N)$. Count the number of subsets of cards such that every number from $1$ to $N$ appears on at least one chosen card. Output the answer modulo $998244353$. $(1 \le N \le 2 \times 10^5)$

### Approach

> Build a graph by connecting the two numbers on each card. Since $P$ and $Q$ are permutations, every value appears exactly twice, so every vertex has degree $2$ and the resulting graph is a disjoint union of cycles.
>
> Consider a simpler sub-problem first: on a *chain* of $m$ numbers $1, 2, \dots, m$, count the ways to pick a subset such that for every pair of adjacent numbers at least one is chosen. Splitting by whether $m$ is picked, let $f(m)$ denote the answer. We have $f(1) = 2$, $f(2) = 3$, and $f(m) = f(m-1) + f(m-2)$ — Fibonacci-like.
>
> Now the real sub-problem: on a *cycle* of $m$ numbers, count the subsets where for every vertex at least one of its two incident edges is chosen. Let $g(m)$ denote the answer. Casework on whether the edge $(1, m)$ is picked gives $g(1) = 1$, $g(2) = 3$, and $g(m) = f(m-1) + f(m-3)$. A quick check reveals $g(m) = L_m$, the $m$-th Lucas number.
>
> Multiply $g(\text{cycle length})$ across every cycle in the graph to get the final answer.

### Code

```cpp
#include<bits/stdc++.h>
using namespace std;
long long a[200005];
long long mod=998244353;
int p[200005];
int q[200005];
int fa[200005];
int siz[200005];
int vis[200005];
int findd(int x)
{
    return fa[x]==x?x:(fa[x]=findd(fa[x]));
}
int main()
{
    int n;
    scanf("%d",&n);
    for(int i=1;i<=n;i++)scanf("%d",&p[i]);
    for(int i=1;i<=n;i++)scanf("%d",&q[i]);
    for(int i=1;i<=n;i++){fa[i]=i;siz[i]=1;}
    for(int i=1;i<=n;i++)if(findd(p[i])!=findd(q[i]))
    {
        siz[findd(q[i])]+=siz[findd(p[i])];
        fa[findd(p[i])]=findd(q[i]);
    }
    a[0]=2;
    a[1]=1;
    for(int i=2;i<=n;i++)a[i]=(a[i-1]+a[i-2])%mod;
    long long ans=1;
    for(int i=1;i<=n;i++)if(!vis[findd(i)])
    {
        ans=ans*a[siz[findd(i)]]%mod;
        vis[findd(i)]=1;
    }
    printf("%lld\n",ans);
    return 0;
}
```
