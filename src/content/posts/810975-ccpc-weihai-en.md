---
title: 810975 (2021 CCPC Weihai M)
published: 2022-03-05
description: Inclusion-exclusion + binomial coefficients — counting match outcomes under a longest-win-streak constraint.
tags: [Algorithms, Combinatorics, Inclusion-Exclusion]
category: Algorithms
draft: false
lang: en
---

[Problem link](https://codeforces.com/gym/103428/problem/M)

### Problem Summary

> You played $n$ games and won exactly $m$ of them. Your longest winning streak has length exactly $k$. How many win/loss sequences match this? $(0 \le n, m, k \le 10^5)$

### Approach

> At first glance this looks like a plain combinatorics problem, but it turns out to be tricky to count directly. Following [Solemntee's editorial](https://blog.csdn.net/solemntee/article/details/121686258), the trick is inclusion-exclusion. Let $ans_k$ be the number of sequences whose longest winning streak is **at least** $k$. The answer we want is $ans_k - ans_{k+1}$.
>
> To compute $ans_k$: first "reserve" the $m$ wins. Placing $i$ disjoint runs each of length at least $k$ can be encoded as choosing $i$ of the $n - m + 1$ candidate slots between/around the losses — that's $\binom{n - m + 1}{i}$. After committing $ik$ wins to those runs, the remaining $n - ik$ positions can hold the leftover wins and losses freely, contributing $\binom{n - ik}{n - m}$. By inclusion-exclusion,
> $$ans_k = \sum_{i \ge 1,\; ik \le m} (-1)^{i+1} \binom{n - m + 1}{i} \binom{n - ik}{n - m}.$$
> Handle the corner case $k = 0$ separately (the answer is $1$ iff $m = 0$), and you're done.

### Code

```cpp
#include<bits/stdc++.h>
using namespace std;
long long mod=998244353;
int MAX=100005;
vector<long long>fac,inv,finv;
void binom_init()
{
    fac.resize(MAX);
    finv.resize(MAX);
    inv.resize(MAX);
    fac[0] = fac[1] = 1;
    inv[1] = 1;
    finv[0] = finv[1] = 1;
    for (int i = 2; i < MAX; i++)
    {
        fac[i] = fac[i - 1] * i % mod;
        inv[i] = mod - mod / i * inv[mod % i] % mod;
        finv[i] = finv[i - 1] * inv[i] % mod;
    }
}
long long binom(long long n, long long r)
{
    if (n < r || n < 0 || r < 0) return 0;
    return fac[n] * finv[r] % mod * finv[n - r] % mod;
}
int main()
{
    binom_init();
    int n,m,k;
    scanf("%d%d%d",&n,&m,&k);
    if(k==0)
    {
        printf("%d\n",m==0);
        return 0;
    }
    long long ans1=0,ans2=0;
    for(long long i=1;i*k<=m;i++)
    {
        if(i&1)ans1=(ans1+binom(n-m+1,i)%mod*binom(n-i*k,n-m)%mod+mod)%mod;
        else ans1=(ans1-binom(n-m+1,i)%mod*binom(n-i*k,n-m)%mod+mod)%mod;
    }
    for(long long i=1;i*(k+1)<=m;i++)
    {
        if(i&1)ans2=(ans2+binom(n-m+1,i)%mod*binom(n-i*(k+1),n-m)%mod+mod)%mod;
        else ans2=(ans2-binom(n-m+1,i)%mod*binom(n-i*(k+1),n-m)%mod+mod)%mod;
    }
    printf("%lld\n",(ans1-ans2+mod)%mod);
    return 0;
}
```
