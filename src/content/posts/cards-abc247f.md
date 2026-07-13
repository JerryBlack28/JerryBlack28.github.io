---
title: Cards (ABC 247 F)
published: 2022-04-29
description: 卢卡斯数列 + 并查集，处理环上覆盖计数问题。
tags: [算法, 卢卡斯数列, 并查集, 图论]
category: 算法
draft: false
---

[AtCoder - abc247_f](https://vjudge.net/problem/AtCoder-abc247_f/origin)

### 题目大意

> 你有$N$张卡片，每张卡有正反两面，正面有一个数字$P_i$，反面有一个数字$Q_i$，数列$P$和$Q$都是$(1,2,\dots,N)$的全排列，问有多少种选择方法使得$N$个数都至少一次出现在被选中的牌上，答案对$998244353$取模。$(1\le N\le2\times 10^5)$

### 思路

> 首先，我们建一张图，把每张牌正反的两个数连起来，而由于$P$和$Q$是全排列，每个数都只会出现两次，每个点的度都是$2$，所以我们建出来的图会由很多个环构成。然后我们先来考虑一个简单一点的问题：$1,2,\dots,m$这$m$个数中相邻的两个数至少得选一个的方案数是多少。就是分类讨论$m$是否选，这样的话，设答案为$f(m)$，则满足$f(1)=2,f(2)=3,\dots,f(m)=f(m-1)+f(m-2)$。然后现在我们要求的是$1,2,\dots,m$这$m$个数围成一个圈时连着一个点的两条边至少得选一条的方案数，设答案为$g(m)$，分类讨论一下$1$和$m$是否相连，就能得到$g(1)=1,g(2)=3,\dots,g(m)=f(m-1)+f(m-3)$，观察一下可以发现$g(m)=L_m$，$L$为卢卡斯数列。这样，我们只要把每个环的答案乘起来就结束了。

### 代码

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
